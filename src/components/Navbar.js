import { useRef, useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
    navigate('/')
  };

  return (
    <header>
      <nav ref={navRef}>
        <Link to="/" target="_self">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link onClick={handleLogout}>Logout</Link>
            <Link to="/profile" target="_self" id="user-profile">
              User Profile
            </Link>
          </>
        ) : (
          <Link to="/login" target="_self" id="login-page">
            Login
          </Link>
        )}
        <Link to="/staff" target="_self">
          Our Staff
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
