import React, { useState , useEffect } from "react";
import { Link ,useNavigate} from 'react-router-dom';
import {urlEPI, keyEPI, EPI, Auth, Code } from "../conf/conf";
import '../css/form.css';

export function Login (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  //
  const navigate = useNavigate();
  useEffect(() => {
      const cek_dulu = localStorage.getItem('refresh_token');
      if (cek_dulu){
          navigate("/"); 
      }
  }, [navigate]);
  //
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null); // Reset error state when email changes
    setId(null);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(urlEPI+EPI+Code+Auth+keyEPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const checkData = await response.json();
      
      // Periksa apakah email sudah ada dalam respons
      const existingEmails = Object.values(checkData).map(entry => entry.email);
      const existingPasswords = Object.values(checkData).map(entry => entry.password);
      if (existingEmails.includes(email)) {
        if (existingPasswords.includes(password)) {
          setError("berhasil");
          alert("berhasil");
          const foundId = Object.keys(checkData).find(key => checkData[key].email === email);
          setId(foundId)
          setToken(foundId);
          return; 
        } else{
          setError("password salah");
          alert("password salah");
          return;
        }
      }
      else {
        setError("email salah");
        alert("email salah");
      }
       
    } catch (error) {
      console.error("Error:", error.message);
    }
    //set token
    async function setToken (foundId) {
      let psh = await foundId;
      localStorage.setItem('refresh_token', psh);
      navigate("/"); 
    }
  };

  return (
    <div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Login Page</h2>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          {error && <p className="error-message">{error}</p>}
          {id && <p>ID: {id}</p>}
          <button type="submit">Login</button>
        </form>
        <div className='links-left'>
            <Link to='/'>Home</Link>
        </div>
        <div className='links-right'>
            <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  );
}