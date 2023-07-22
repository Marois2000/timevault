import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();


    return (
        <div>
            <div className="title">
                <h1>TimeVault</h1>
                <button className="menubutton" onClick={() => setOpenMenu((prev) => !prev)}>
                    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
                        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"/>
                    </svg>
                </button>
            </div>


            {
                openMenu && 
                <div className= "dropdown">
                    <ul>
                        <li onClick={() => {navigate("/home"); setOpenMenu(false)}}>Home</li>
                        <li onClick={() => {navigate("/edit"); setOpenMenu(false)}}>Edit Log</li>
                        <li onClick={() => {navigate("/weekview"); setOpenMenu(false)}}>View Weeks</li>
                    </ul>
                </div>
            }
            
        </div>
        
    )
    
}