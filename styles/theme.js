// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
    config,
    styles: {
        global: (props) => ({
            body: {
                bg: mode("#111111", "#eeeeee"),
            },
        }),
    },
    colors: {
        // Darkmode:
    },
});

export default theme;

const darkMode = {};
// const titleColor = useColorModeValue("#154532", "#fff");
// const titleBg = useColorModeValue("#c4f1ca", "none");
