import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import theme from "@/styles/theme";

export const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("#eeeeee", "#000000");
    const color = useColorModeValue("#222222", "#ced4da9a");

    return (
        <footer style={{ backgroundColor: bgColor, color: color }}>
            <p>ⓒ2023 RE: FIND ALL RIGHT RESERVED</p>
        </footer>
    );
};
