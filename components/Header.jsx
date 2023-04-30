import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Niconne } from "@next/font/google";
import { Sling as Hamburger } from "hamburger-react";
import "react-modern-drawer/dist/index.css";
import MyDrawer from "./MyDrawer";
import DarkModeToggle from "./DarkModeToggle";
import { BellIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("#eeeeee", "#000000");

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const btnRef = React.useRef();

    return (
        <header style={{ backgroundColor: bgColor }}>
            <Link href="/notice" className="box">
                <BellIcon />
            </Link>
            <DarkModeToggle className="dark-mode-toggle" />
            <MyDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            <Hamburger
                className="hamburger"
                label="펼치기" // An ARIA label to improve accessibility.
                size={20}
                toggled={isOpen}
                toggle={setIsOpen}
            />
        </header>
    );
};
