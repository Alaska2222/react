import React from "react"
import Navbar from "./components/Navbar"
import "./styles/main.css"
import Home from "./components/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Staff from "./components/Staff"
import {Route, Routes} from "react-router-dom"

function App() {

  
  return (
  <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
   </>
  );
}

export default App;
