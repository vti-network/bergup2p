import React, { useState , useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import {Hash , Token  ,Otp} from './Hash.jsx'
import { urlEPI, EPI , Code , Auth , keyEPI } from "../conf/conf";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  //
  const h = Hash();
  const t = Token();
  const o = Otp();
  //const d = new Date();
  //
  const navigate = useNavigate();

  useEffect(() => {
      const cek_dulu = localStorage.getItem('refresh_token');
      if (cek_dulu){
          navigate("/"); 
      }
  }, [navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null); // Reset error state when email changes
    setId(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const Body = {
    secretID: id,
    email,
    password,
    alamat: h,
    secretkey: h,
    bergu : 0,
    token: t,
    otp: o,
  }
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
      if (!existingEmails.includes(email)) {
        alert("berhasil");
        const foundId = Object.keys(checkData).find(key => checkData[key].email === email);//1
        setId(foundId);//2
        await post();
        return;
      } else {
        alert("email terdaftar");
        return;
      }
    
    } catch (error) {
      alert(error)
      console.error("Error:", error.message);
      await post();
    }
  };

  const post = async () => {
    try {
      const response = await fetch(urlEPI+EPI+Code+Auth+keyEPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Body),
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengirim permintaan.");
      }
      navigate("/login");

    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Register page</h2>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          {id && <p>ID: {id}</p>}
          <button type="submit">Register</button>
        </form>
        <div className='links-left'>
            <Link to='/'>Home</Link>
        </div>
        <div className='links-right'>
            <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
}
