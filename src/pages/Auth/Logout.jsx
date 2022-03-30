import React from 'react';
import "./Auth.css"
import { Link } from 'react-router-dom';

function Logout(){
    return(
        <>
          <div className="auth-container">
        <h2>Thank You For Using Pallet Play</h2>
        <p>Do you like to Login again?</p>
        <button type="submit" className="login-btn">
            <Link className="anchor-btn" to='/login'>
            Login
            </Link>
            </button>
    </div>
        </>
    )
}

export {Logout};
