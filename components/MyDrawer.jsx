import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { InfoIcon, BellIcon } from "@chakra-ui/icons";
import { MdOutlineContactSupport } from "react-icons/md";
import { Button, Image } from "@chakra-ui/react";
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
                        width="32px"
                        mr="2"
                        p="0"
                        href="https://twitter.com/rerurureruru"
                        colorScheme="twitter"
                        as="a"
                        target="_blank"
                    >
                        <FaTwitter />
                    </Button>
                    <Button
                        width="32px"
                        p="0"
                        href="https://cafe.naver.com/steamindiegame"
                        // color="#03CF35"
                        colorScheme="green"
                        as="a"
                        target="_blank"
                    >
                        <Image
                            boxSize="30px"
                            objectFit="cover"
                            src="naver-cafe-logo.png"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyDrawer;
