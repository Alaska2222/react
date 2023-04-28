import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Staff from "./pages/Staff"
import Register from "./pages/Register"
import {Route, Routes} from "react-router-dom"
import "./styles/main.css"

function App() {
  return (
  <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<h1>Admin page</h1>} />
        <Route path="*" element={<h1>There's nothing here: 404!</h1>} />
      </Routes>
   </>
  );
}

export default App;
