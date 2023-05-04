import React, { useEffect } from "react";
import Link from "next/link";
import MyDrawer from "./MyDrawer";
import DarkModeToggle from "./DarkModeToggle";
import { lightMode, darkMode } from "@/styles/theme";

import { useColorModeValue } from "@chakra-ui/react";
import { Sling as Hamburger } from "hamburger-react";
// import { Niconne } from "@next/font/google";
import { useStore } from "../store/store";

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    // const bgColor = useColorModeValue("lightMode.bg", "darkMode.bg");
    const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
    const color = useColorModeValue(lightMode.color, darkMode.color);

    // useStore
    // const count = useStore((state) => state.count);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <header style={{ backgroundColor: bgColor, color: color }}>
            {/* {count} */}
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
