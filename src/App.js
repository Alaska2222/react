import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Staff from "./pages/Staff"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import ErrorPage from "./pages/ErrorPage"
import {Route, Routes, Navigate, useLocation} from "react-router-dom"

import { AnimatePresence } from "framer-motion"
import "./styles/main.css"
function App() {

  const ProtectedRoute = ({ allowedRoles, children }) => {
    const userRole = localStorage.getItem('role');
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const location = useLocation()
  return (
  <>
      <Navbar />
    
      <Routes key={location.pathname} location={location}>
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
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/staff" element={<Staff />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
   </>
  );
}

export default App;
