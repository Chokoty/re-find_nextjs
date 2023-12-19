import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

import boardData from '@/data/board.ts';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsive } from '@/hook/useResponsive';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { useUploadTimeDiff } from '@/hook/useUploadTimeDiff';
import { darkMode, lightMode } from '@/styles/theme';

const UpdateCard = ({ update }) => {
  const isMobile = useResponsive();

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const color2 = useColorModeValue(lightMode.color2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const modifiedUrl100 = useModifiedImageUrl(update?.info.img_url, 100);
  const uploadTimeDiff = useUploadTimeDiff(update?.date);
  const article_link = useResponsiveLink(update?.id, 'article');
  const menu_link = useResponsiveLink(
    boardData.find((item) => item.board === update?.board)?.id,
    'menu'
  );

  function getImageSrc() {
    const boardItem = boardData.find((item) => item.board === update?.board);
    if (boardItem?.state === '-관-') {
      return '/static/images/icons/close.jpeg';
    }
    if (modifiedUrl100 === '') {
      return '/static/images/icons/placeholder_80.png';
    }
    return modifiedUrl100;
  }

  return (
    <Box
      width="90%"
      p="0.5rem 0"
      borderRadius="0"
      borderBottom="1px solid"
      borderColor={bg}
      background={color2}
      display="flex"
      flexDirection="row"
      h={isMobile ? 'auto' : '144px'}
      justifyContent="space-between"
      alignItems="center"
      placeItems="center"
    >
      <NextImage
        unoptimized
        width={100}
        height={100}
        style={{
          borderRadius: '0.5rem',
          objectFit: 'cover',
          width: '6rem',
          height: '6rem',
          marginRight: '1rem',
        }}
        src={getImageSrc()}
        alt={update.info.title}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        h="100%"
        w="100%"
        p="0.5rem 0"
      >
        <Flex
          w="100%"
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
          justifyContent="space-between"
          gap="1rem"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={['0.2rem', '1rem']}
          >
            <Text fontSize={['md', 'lg']}>
              <Link
                color={highlightColor}
                className="link-to-wakzoo"
                href={menu_link}
                isExternal
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {update.board}
                <MdArrowForwardIos
                  style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.8rem',
                  }}
                />
              </Link>
            </Text>
            <Heading
              as="h1"
              fontSize={['lg', 'xl']}
              textTransform="uppercase"
              m="0"
            >
              <Link
                color={highlightColor}
                className="link-to-wakzoo"
                href={article_link}
                isExternal
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Text noOfLines={1}>{update.info.title}</Text>
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Heading>
          </Box>
          <Box
            display="flex"
            flexDirection={['row', 'column']}
            alignItems={['center', 'flex-end']}
            gap={['0.5rem', '1rem']}
            justifyContent="space-between"
            h="100%"
          >
            <Badge
              variant="subtle"
              colorScheme="green"
              // w="6rem"
              borderRadius="6px"
              h="2rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="1rem" h="1rem" mr="0.3rem">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Box>
              <Text color={color} fontSize={['sm', 'md', 'lg']}>
                {uploadTimeDiff}
              </Text>
            </Badge>
            <Badge
              variant="subtle"
              // w="7rem"
              maxW="7rem"
              p="0.5rem 1rem"
              borderRadius="6px"
              h="2rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={['sm', 'md', 'lg']}>
                <NextLink
                  href={`/artists/${update.info.nickname}`}
                  style={{
                    color: highlightColor,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text noOfLines={1}>{update.info.nickname}</Text>
                  <ExternalLinkIcon
                    style={{
                      marginLeft: '0.2rem',
                      fontSize: '0.8rem',
                    }}
                  />
                </NextLink>
              </Text>
            </Badge>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default UpdateCard;
