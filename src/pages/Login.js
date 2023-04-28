import React, { useEffect,useState} from 'react';
import Button from '../components/Button';
import "../styles/login.css"
import { Link, json } from 'react-router-dom';

const LOGIN_URL = "/login"

export default function Login(){
    useEffect(() => {
        document.title = "Login"
     }, []);

    return(
        <>
            <div className="form-block">
            
                <div className="side-image"></div>
                <form method="#" className="log-in"> 
                    <h1><span className="highlight">Log in</span></h1>
                    <div className="floating-label">
                        <input className="input"
                         placeholder="Username"
                         type="text"
                         name="username"
                         id="username"
                         required/>
                        <label htmlFor="username">Username:</label>
                    </div>
                    <div className="floating-label">
                        <input className="input"
                         placeholder="Password"
                         type="password"
                         name="password"
                         id="password"
                         required/>
                        <label htmlFor="password">Password:</label>
                    </div>
                        <h3>Don`t have an account yet?  <Link to="/register" target="_self">Sign up!</Link></h3>
                        <Button Title="Log in" Id="login-btn"/>
                </form>
            </div>
            </>
    )  
}