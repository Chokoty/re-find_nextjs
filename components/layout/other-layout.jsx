import React from "react";
import Title from "@/components/Title";
import { lightMode, darkMode } from "@/styles/theme";
import { Button, Heading, Divider, useColorModeValue } from "@chakra-ui/react";

const OtherLayout = ({ children, title }) => {
    const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
    const color = useColorModeValue(lightMode.color, darkMode.color);

    return (
        <div className="body">
            <Button
                variant="outline"
                height="80px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="48px"
                boxShadow="md"
            >
                <Title />
            </Button>
            <Heading
                className="page-title"
                as="h1"
                size="lg"
                noOfLines={1}
                color={color}
            >
                {title}
            </Heading>
            <Divider
                mt="5"
                className="divider"
                style={{
                    margin: "48px auto",
                    maxWidth: "10rem",
                    backgroundColor: bgColor,
                    height: "5px",
                }}
            />
            <div className="layout">{children}</div>
        </div>
    );
};

export default OtherLayout;
