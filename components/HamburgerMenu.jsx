import Link from "next/link";
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";

const HamburgerMenu = ({ navbarOpen }) => {
    return (
        <ul className={`menu-items${navbarOpen ? " show-menu" : ""}`}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </ul>
        // <Menu right isOpen={isOpen}>
        //     <Link className="menu-item" href="/">
        //         Home
        //     </Link>
        //     <Link className="menu-item" href="/about">
        //         About
        //     </Link>
        //     <Link className="menu-item" href="/contact">
        //         Contact
        //     </Link>
        // </Menu>
    );
};

export default HamburgerMenu;
