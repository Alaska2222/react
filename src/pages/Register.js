import React, { useEffect } from 'react';
import Button from '../components/Button';
import FloatLabel from '../components/FloatLabel';

export default function Register(){
    useEffect(() => {
        document.title = "Register"
     }, []);
    return(
        <div className="form-block">
                <div className="side-image"></div>
                <form method="#" className="log-in"> 
                    <h1><span className="highlight">Register</span></h1>
                        <FloatLabel Data="username" Title="Username" Type="text"/>
                        <FloatLabel Data="password" Title="Password" Type="password"/>
                        <FloatLabel Data="cpassword" Title="Confirm Password" Type="password" />
                        <FloatLabel Data="name" Title="Name" Type="text" />
                        <FloatLabel Data="surname" Title="Surname" Type="text" />
                        <FloatLabel Data="age" Title="Age" Type="num" />
                        <FloatLabel Data="email" Title="Email" Type="email" />
                        <FloatLabel Data="phone" Title="Phone" Type="tel" />
                        <div className="radio-buttons">
                            <input type="radio" className="role" id="student" name="role" value="user" defaultChecked />
                            <label htmlFor="user">Student</label>
                            <input type="radio" className="role" id="teacher" name="role" value="admin" />
                            <label htmlFor="admin">Teacher</label>
                        </div>
                        <Button Title="Sign up" Id="registrate-btn"/>
                </form>
            </div>
    )  
}