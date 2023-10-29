import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

// import TMI from '@/data/tmi';
import updateLog from '@/data/updateLog';
import { darkMode, lightMode } from '@/styles/theme';

const UpdateLog = ({ count }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="90%"
      // width={['90%', '100%']}
      margin="0 auto"
    >
      {updateLog
        .slice(count === 0 ? undefined : -count) // 배열의 마지막 count 개의 항목만 가져옵니다.
        .reverse()
        .map((item, index) => (
          <Card
            key={index}
            width="100%"
            maxW="540px"
            size="sm"
            m="2"
            boxShadow="xl"
            background={color2}
            p="0.5rem"
          >
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="xs" textAlign="left">
                  {item.date}
                </Heading>
                {item.directLink && (
                  <Link
                    className="link-to-wakzoo"
                    href={item.directLink}
                    isExternal
                    color={highlightColor}
                  >
                    관련 링크
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                )}
              </Flex>
            </CardHeader>
            <CardBody textAlign="left">
              <Text p="0">{item.content}</Text>
            </CardBody>
            {/* <CardFooter textAlign="left" fontSize="sm">
              {item.directLink && (
                <Link
                  className="link-to-wakzoo"
                  href={item.directLink}
                  isExternal
                  color={highlightColor}
                >
                  관련 링크
                  <ExternalLinkIcon mx="2px" />
                </Link>
              )}
            </CardFooter> */}
          </Card>
        ))}
    </Box>
  );
};

export default UpdateLog;
