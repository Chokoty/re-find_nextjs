import React, { useState } from "react";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="hamburger-menu">
            <button className="hamburger-icon" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {isOpen && (
                <div className="menu-items">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
