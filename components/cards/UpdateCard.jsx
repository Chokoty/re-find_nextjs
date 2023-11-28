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

const nicknameLength = 9;

const UpdateCard = ({ update }) => {
  const isMobile = useResponsive();

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
        padding: '0.5rem',
      }}
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
      <CardBody
        style={{
          padding: '0.5rem 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Flex
          w="100%"
          flexDirection={['column-reverse', 'row']}
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
              >
                {update.info.title.length + update.info.nickname.length >
                (isMobile ? nicknameLength + 16 : nicknameLength + 15)
                  ? `${update.info.title.slice(0, isMobile ? 16 : 15)}...`
                  : update.info.title}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Heading>
          </Box>
          <Box
            display="flex"
            flexDirection={['row-reverse', 'column']}
            alignItems={['center', 'flex-end']}
            gap={['0.5rem', '1rem']}
            justifyContent="space-between"
            h="100%"
          >
            <Badge variant="subtle" colorScheme="purple">
              <Text fontSize={['sm', 'md', 'lg']}>{uploadTimeDiff}</Text>
            </Badge>
            <Badge>
              <Text fontSize={['sm', 'md', 'lg']}>
                <NextLink
                  href={`/artists/${update.info.nickname}`}
                  style={{
                    color: highlightColor,
                  }}
                >
                  {update.info.nickname.length > 9
                    ? `${update.info.nickname.slice(0, 9)}...`
                    : update.info.nickname}
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
      </CardBody>
    </Card>
  );
};

export default UpdateCard;
