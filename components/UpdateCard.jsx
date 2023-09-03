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

const links = {
  article_mobileLink:
    'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/',
  article_pcLink: 'https://cafe.naver.com/steamindiegame/',
  menu_mobileLink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/',
  menu_pcLink:
    'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=',
};
const UpdateCard = ({ update }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const uploadTimeDiff = useUploadTimeDiff(update.date);
  const articke_link =
    useResponsiveLink(links.article_mobileLink, links.article_pcLink, 0) +
    update.id;
  const menu_link =
    useResponsiveLink(links.menu_mobileLink, links.menu_pcLink, 1) +
    boardData.find((item) => item.board === update.board)?.id;

  console.log(articke_link);
  console.log(menu_link);

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
            href={articke_link}
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
