import { useRef } from "react";
import {FaTimes, FaBars} from "react-icons/fa"
import {Link} from "react-router-dom"

function Navbar() {
    const navRef = useRef();
    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <nav ref={navRef}>
                <Link to="/" target="_self">Home</Link>
                <Link to="/login" target="_self" id="login-page">Login</Link>
                <Link to="/profile" target="_self" id="user-profile">User Profile</Link>
                <Link to="/staff" target="_self">Our Staff</Link>
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

export default Navbar