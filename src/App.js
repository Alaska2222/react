import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Staff from "./pages/Staff"
import Register from "./pages/Register"
import {Route, Routes, Navigate} from "react-router-dom"
import "./styles/main.css"

function App() {

  const ProtectedRoute = ({ allowedRoles, children }) => {
    const userRole = localStorage.getItem('role');
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
  <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/staff" element={<Staff />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>There's nothing here: 404!</h1>} />
      </Routes>
   </>
  );
}

export default App;
