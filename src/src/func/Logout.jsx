//logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout(){
    const navigate = useNavigate();

    useEffect(() => {
        const cek_dulu = localStorage.getItem('refresh_token');
        if (!cek_dulu){
            navigate("/login");
            alert('Anda telah logout');
        } else {
            localStorage.removeItem('refresh_token');
            alert('fungsi tidak berkerja');
            navigate("/login");
        }
    }, [navigate]);

    return(
        <div>
            <p>msg</p>
        </div>
    )
}