import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';

import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { darkMode, lightMode } from '@/styles/theme';

import boardData from '../data/board.ts';
import { useResponsiveLink } from '../hook/useResponsiveLink';
import { useUploadTimeDiff } from '../hook/useUploadTimeDiff';

const UpdateCard = ({ update }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  const modifiedUrl100 = useModifiedImageUrl(update?.info.img_url, 100);
  const uploadTimeDiff = useUploadTimeDiff(update?.date);
  const article_link = useResponsiveLink(update?.id, 'article');
  const menu_link = useResponsiveLink(
    boardData.find((item) => item.board === update?.board)?.id,
    'menu'
  );

  return (
    <Card
      width="100%"
      maxW="540px"
      background={color2}
      style={{
        height: '120px',
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
          boardData.find((item) => item.board === update?.board)?.state ===
          '-관-'
            ? '/static/images/icons/close.jpeg'
            : modifiedUrl100 === ''
            ? '/static/images/icons/placeholder_80.png'
            : modifiedUrl100

          // 썸네일 100으로 변경
        }
        alt={update.info.title}
        // fallbackSrc="https://via.placeholder.com/80"
      />

      <CardBody>
        <Flex
          flexDirection={['column', 'row']}
          justifyContent={['center', 'space-between']}
          alignItems={['flex-start', 'center']}
        >
          <Heading as="h1" fontSize={['lg', 'xl']} textTransform="uppercase">
            <Link
              color={highlightColor}
              className="link_to_wakzoo"
              href={menu_link}
              isExternal
            >
              {update.board}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Heading>
          <Text fontSize={['md', 'lg']}>{uploadTimeDiff}</Text>
        </Flex>
        <Text fontSize={['md', 'lg']}>
          게시글 id:
          <Link
            color={highlightColor}
            className="link_to_wakzoo"
            href={article_link}
            isExternal
          >
            {update.id}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </CardBody>
    </Card>
  );
};

export default UpdateCard;
