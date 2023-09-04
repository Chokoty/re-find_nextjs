import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';

import {
  Card,
  CardBody,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { lightMode, darkMode } from '@/styles/theme';
import boardData from '../data/board.ts';
import { useUploadTimeDiff } from '../hook/useUploadTimeDiff';
import { useResponsiveLink } from '../hook/useResponsiveLink';

const UpdateCard = ({ update }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const uploadTimeDiff = useUploadTimeDiff(update?.date);
  const article_link = useResponsiveLink(update?.id, 'article');
  const menu_link = useResponsiveLink(
    boardData.find((item) => item.board === update.board)?.id,
    'menu'
  );

  return (
    <Card
      width="100%"
      style={{
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        placeItems: 'center',
        paddingLeft: '10px',
      }}
    >
      <NextImage
        unoptimized
        width={100}
        height={100}
        style={{
          borderRadius: '0.5rem',
          objectFit: 'cover',
          width: '80px',
          height: '80px',
        }}
        src={
          boardData.find((item) => item.board === update.board)?.state ===
          '-관-'
            ? 'static/images/icons/close.jpeg'
            : update.info.img_url
        }
        alt={update.info.title}
        fallbackSrc="https://via.placeholder.com/80"
      />

      <CardBody>
        <Heading as="h1" size="md" textTransform="uppercase" mb="8px">
          <Link
            color={highlightColor}
            className="link"
            href={menu_link}
            isExternal
          >
            {update.board}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Heading>
        <Text fontSize="1em">
          게시글 id:
          <Link
            color={highlightColor}
            className="link"
            href={article_link}
            isExternal
          >
            {update.id}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text fontSize="1em">{uploadTimeDiff}</Text>
      </CardBody>
    </Card>
  );
};

export default UpdateCard;
