import { useRef } from "react";
import {FaTimes, FaBars} from "react-icons/fa"

function Navbar() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <nav ref={navRef}>
                
                <a href="/" target="_self">Home</a>
                <a href="/login" target="_self" id="login-page">Login</a>
                <a href="/profile" target="_self" id="user-profile">User Profile</a>
                <a href="/staff" target="_self">Our Teachers</a>
               
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