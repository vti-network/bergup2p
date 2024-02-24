import React, { useState , useEffect} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Menu , Home2 } from './Icon';

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menambahkan state untuk menentukan apakah pengguna sudah login
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    const cek_dulu = localStorage.getItem('refresh_token');
    setIsLoggedIn(cek_dulu ? true : false); // Menentukan status login berdasarkan keberadaan token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('refresh_token'); // Hapus token saat logout
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <div className=''>
      <div className='header'>
        <div className='left'>
          <Link to="/" className="navbar-link"><Home2 className='btn'/></Link>
        </div>
        <div className='right' onClick={toggleNavbar}>
          <Menu className='btn'/>
        </div>
      
        <div className={showNavbar ? 'navbar-mod' : 'navbar-mod hidden'}>
          <Link to="/user" className="navbar-link">User</Link>
          {isLoggedIn ? (
            <Link to="/logout" className="navbar-link" onClick={handleLogout}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              {/* <Link to="/register" className="navbar-link">Register</Link> */}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
