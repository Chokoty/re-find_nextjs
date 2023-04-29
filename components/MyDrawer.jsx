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
                        <div className="list-item">
                            <BellIcon className="icon" />
                            <Link href="/notices">Notice</Link>
                        </div>
                    </li>
                    <li>
                        <div className="list-item">
                            <InfoIcon className="icon" />
                            <Link href="/about">About</Link>
                        </div>
                    </li>
                    <li>
                        <div className="list-item">
                            <MdOutlineContactSupport className="icon" />
                            <Link href="/support">Support</Link>
                        </div>
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
