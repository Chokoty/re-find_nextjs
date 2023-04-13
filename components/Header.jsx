import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { SlControlRewind } from "react-icons/sl";

export const Header = () => {
    return (
        <header>
            {/* <Link href="/" className="content">
                <SlControlRewind className="logo" />
                <span className="title">RE: FIND</span>
            </Link> */}
            <Link href="/support" className="content">
                Supports
            </Link>
            <HamburgerMenu />
        </header>
    );
};
