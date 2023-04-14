import Link from "next/link";
import Image from "next/image";
// import HamburgerMenu from "./HamburgerMenu";
import { SlControlRewind } from "react-icons/sl";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";

export const Header = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <header>
            {/* <Link href="/support" className="content">
                Supports
            </Link> */}
            <Hamburger
                label="펼치기" // An ARIA label to improve accessibility.
                size={20}
                toggled={isOpen}
                toggle={setOpen}
            />
            {/* <HamburgerMenu /> */}
        </header>
    );
};
