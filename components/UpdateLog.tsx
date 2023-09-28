import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { lightMode, darkMode } from '@/styles/theme';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import updateLog from '../data/updateLog';
import TMI from '../data/tmi';

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
      width="100%"
      margin="0 auto"
      maxW="540px"
    >
      <Heading size="md" mb="20px">
        {' '}
        업데이트 내용
      </Heading>
      {updateLog
        .slice(count === 0 ? undefined : -count) // 배열의 마지막 count 개의 항목만 가져옵니다.
        .reverse()
        .map((item, index) => (
          <Card
            key={index}
            width="100%"
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
                    className="link_to_wakzoo"
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
                  className="link_to_wakzoo"
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
