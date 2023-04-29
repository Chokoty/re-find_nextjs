import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { InfoIcon, BellIcon } from "@chakra-ui/icons";
import { MdOutlineContactSupport } from "react-icons/md";
import { Button } from "@chakra-ui/react";
const MyDrawer = ({ isOpen, toggleDrawer }) => {
    return (
        <div className={`my-drawer ${isOpen ? "open" : ""}`}>
            <div className="drawer-content">
                <ul>
                    <li>
                        <Link href="/notice" legacyBehavior>
                            <a className="list-item">
                                <BellIcon className="icon" />
                                Notice
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" legacyBehavior>
                            <a className="list-item">
                                <InfoIcon className="icon" />
                                About
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/support" legacyBehavior>
                            <a className="list-item">
                                <MdOutlineContactSupport className="icon" />
                                Support
                            </a>
                        </Link>
                    </li>
                </ul>
                <div className="menu-footer">
                    <Button
                        href="https://twitter.com/rerurureruru"
                        colorScheme="twitter"
                        leftIcon={<FaTwitter />}
                        as="a"
                        target="_blank"
                    >
                        Twitter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyDrawer;
