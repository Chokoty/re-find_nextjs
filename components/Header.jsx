import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MyDrawer from "./MyDrawer";
import DarkModeToggle from "./DarkModeToggle";
import { lightMode, darkMode } from "@/styles/theme";

import { useColorModeValue } from "@chakra-ui/react";
import { Niconne } from "@next/font/google";
import { Sling as Hamburger } from "hamburger-react";
import { BellIcon } from "@chakra-ui/icons";

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    // const bgColor = useColorModeValue("lightMode.bg", "darkMode.bg");
    const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
    const color = useColorModeValue(lightMode.color, darkMode.color);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const btnRef = React.useRef();

    return (
        <header style={{ backgroundColor: bgColor, color: color }}>
            {/* <Link href="/notice" className="box">
                <BellIcon />
            </Link> */}
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
