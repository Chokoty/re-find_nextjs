import React, { useEffect } from 'react';

import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

import OtherLayout from '../layout/other-layout';

import { lightMode, darkMode } from '@/styles/theme';
import updateLog from '../../data/updateLog';
import TMI from '../../data/tmi';
import { useStore } from '../../store/store';

const NoticePage = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="Notice">
      <div className="notice-content">
        <Heading size="lg" mb="20px">
          {' '}
          업데이트 내용
        </Heading>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          margin="0 auto"
          maxW="540px"
        >
          {updateLog
            .slice()
            .reverse()
            .map((item, index) => (
              <Card key={index} width="100%" size="sm" m="2" boxShadow="xl">
                <CardHeader p="0px">
                  <Heading size="xs" textAlign="left" p="10px">
                    {item.date}
                  </Heading>
                </CardHeader>
                <CardBody p="10px" textAlign="left">
                  <Text>{item.content}</Text>
                </CardBody>
                <CardFooter textAlign="left" fontSize="sm">
                  {item.directLink && (
                    <Link
                      className="link_to_wakzoo"
                      href={item.directLink}
                      isExternal
                      color={highlightColor}
                    >
                      추가 링크
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
        </Box>
      </div>
    </OtherLayout>
  );
};

export default NoticePage;
