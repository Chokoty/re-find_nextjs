import { useColorMode, Button } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { FiMoon } from "react-icons/fi";

const DarkModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";

    return (
        <Button bg="none" _hover={{ bg: "#none" }} onClick={toggleColorMode}>
            {isDark ? <FiMoon /> : <SunIcon />}
        </Button>
    );
};

export default DarkModeToggle;
