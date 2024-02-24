//Dash_public.jsx
import { Navbar } from '../com/Navbar.jsx';

export function DashboardPublic (){
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