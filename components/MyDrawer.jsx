import Link from "next/link";
import { FaTwitter } from "react-icons/fa";

const MyDrawer = ({ isOpen, toggleDrawer }) => {
    return (
        <div className={`my-drawer ${isOpen ? "open" : ""}`}>
            <div className="drawer-content">
                <ul>
                    <li>Menu Item 1</li>
                    <li>Menu Item 2</li>
                    <li>
                        <Link href="/support">Support</Link>
                    </li>
                    <li>
                        <FaTwitter />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MyDrawer;
