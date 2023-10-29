import React from 'react';
import NextLink from 'next/link';

import {  Badge, Box, useColorModeValue } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';
import updateLog from '../data/updateLog';

const NoticeBanner = () => {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const lastUpdateLog = updateLog[updateLog.length - 1];

  return (
    <Box
      className="notice_banner"
      display="grid"
      placeItems="center"
      alignItems="center"
      height="50px"
      gridAutoFlow="column"
      gridGap="10px"
      background={highlightColor}
      color={color}
      width="100%"
      borderColor={highlightColor}
      position="absolute"
      top="0"
    >
      <Box
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        width="80%"
        textAlign="center"
        maxW="600px"
        display="flex"
      >
        <Badge variant="outline" colorScheme="pink" fontSize="1em" mr="5px">
          업데이트
        </Badge>
        {/* <div> */}
        {lastUpdateLog?.directLink == '' ? (
          <NextLink href="/notice" className="notice_banner_link">
            {lastUpdateLog.date + ' - ' + lastUpdateLog.content.slice(0, 40)}
          </NextLink>
        ) : (
          <NextLink href="/notice" className="notice_banner_link">
            {lastUpdateLog.date + ' - ' + lastUpdateLog.content.slice(0, 40)}
          </NextLink>
          //      <Link
          //      isExternal
          //      href={lastUpdateLog.directLink}
          //      className="notice_banner_link"
          //  >
          //      {lastUpdateLog.date +
          //          " - " +
          //          lastUpdateLog.content.slice(0, 50)}
          //  </Link>
        )}
        {/* </div> */}
      </Box>
    </Box>
  );
};

export default NoticeBanner;
