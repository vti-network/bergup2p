import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Mengimpor Switch dari react-router-dom
import { Login } from './func/Login.jsx';
import { Register } from './func/Register.jsx';
import { DashboardPublic } from './pages/Dash_public.jsx';
import { DashboardUser } from './pages/Dash_user.jsx';
import { Logout } from './func/Logout.jsx';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path="/" element={<DashboardPublic />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
