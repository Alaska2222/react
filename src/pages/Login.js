import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.Username, data.Status);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("role", data.Status);
      
    
      if (data.Status === "user") {
        navigate("/profile");
      } else {
        navigate("/admin");
      }
      window.location.reload();
    }
  };

  return (
    <>
     
      <div className="form-block">
        <div className="side-image"></div>
        <form method="#" className="log-in" onSubmit={handleSubmit}>
          <h1>
            <span className="highlight">Log in</span>
          </h1>
          <div className="floating-label">
            <input
              className="input"
              placeholder="Username"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="floating-label">
            <input
              className="input"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
          <h3>
            Don`t have an account yet?{" "}
            <Link to="/register" target="_self">
              Sign up!
            </Link>
          </h3>
          <Button Title="Log in" Id="login-btn" />
        </form>
      </div>
    </>
  );
}
