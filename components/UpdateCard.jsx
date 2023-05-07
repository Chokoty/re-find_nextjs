import React from "react";
import {
    Card,
    CardBody,
    Heading,
    Text,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";
import { lightMode, darkMode } from "@/styles/theme";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const UpdateCard = ({ update }) => {
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    return (
        <Card width="90%">
            <CardBody>
                <Heading as="h1" size="md" textTransform="uppercase">
                    {update.board}
                </Heading>
                <Text fontSize="1em">{update.date}</Text>
                <Text fontSize="1em">
                    <Link
                        color={highlightColor}
                        className="link"
                        href={
                            "https://cafe.naver.com/steamindiegame/" + update.id
                        }
                        isExternal
                    >
                        https://cafe.naver.com/steamindiegame/
                        {update.id} <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
            </CardBody>
        </Card>
    );
};

export default UpdateCard;
