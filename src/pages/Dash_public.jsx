//Dash_public.jsx
import { Navbar } from '../com/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export function DashboardPublic (){
    const navigate = useNavigate();
        useEffect(() => {
        const checkToken = localStorage.getItem('refresh_token');
        if (!checkToken) {
            navigate("/blank");
            alert("Please log in first");
        }
    }, [navigate]);
    return (
    <>
        <div className='container'>
            <Navbar />
        </div>
        
        <div className='container'>
            <div className='content'>
                <h1>Dashboard</h1>
                <p>Public</p>                
            </div>

        </div>        
    </>
    )
}
