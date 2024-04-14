import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { MdArrowForwardIos, MdPerson } from 'react-icons/md';

import BOARD_LIST from '@/app/(home)/lib/const';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsive } from '@/hooks/useResponsive';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';
import { darkMode, lightMode } from '@/lib/theme';

type Prop = {
  update: RecentBoardData;
};

export default function UpdateCard({ update }: Prop) {
  const isMobile = useResponsive();

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const color2 = useColorModeValue(lightMode.color2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const modifiedUrl100 = useModifiedImageUrl({
    url: update.info.img_url,
    size: 100,
  });
  const uploadTimeDiff = useUploadTimeDiff(update.date);
  const article_link = useResponsiveLink(update.id, 'article');
  const menu_link = useResponsiveLink(
    BOARD_LIST.find(
      (item) => item.board === update.board.replace(/&#\d+;/g, '').trim()
    )?.id ?? '',
    'menu'
  );

  function getImageSrc() {
    const boardItem = BOARD_LIST.find((item) => item.board === update.board);
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
      p="0"
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
      <Link
        className="link-to-wakzoo"
        href={article_link}
        isExternal
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h={isMobile ? '5rem' : '6rem'}
          w={isMobile ? '5rem' : '8rem'}
          borderRadius="0.5rem"
          mr="1rem"
        >
          <NextImage
            quality={90}
            width={100}
            height={100}
            style={{
              borderRadius: '0.5rem',
              objectFit: 'cover',
              width: isMobile ? '5rem' : '6rem',
              height: isMobile ? '5rem' : '6rem',
            }}
            src={getImageSrc()}
            alt={update.info.title}
            unoptimized
          />
        </Box>
      </Link>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        h="100%"
        w="100%"
        p="1rem 0"
      >
        <Flex
          w="100%"
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
          justifyContent="space-between"
          gap={['0.5rem', '1rem', '1rem']}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={['0.2rem', '1rem']}
          >
            <Text fontSize={['sm', 'md', 'lg']}>
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
                {update.board.replace(/&#\d+;/g, '').trim()}
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
              fontSize={['md', 'lg', 'xl']}
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
              // w="7rem"
              maxW="12rem"
              p="0 0.5rem"
              borderRadius="6px"
              colorScheme="red"
              h={['1.5rem', '2rem']}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={['xs', 'md', 'lg']}>
                <NextLink
                  href={`/artists/${update.info.nickname}`}
                  style={{
                    // color: highlightColor,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <MdPerson
                    style={{
                      // color: getButtonColor('artists'),
                      width: '1rem',
                      height: '1rem',
                    }}
                  />
                  <Text
                    ml="0.2rem"
                    noOfLines={1}
                    maxW="8rem"
                    textTransform="none"
                  >
                    {update.info.nickname}
                  </Text>
                  <ExternalLinkIcon
                    style={{
                      marginLeft: '0.2rem',
                      fontSize: '0.8rem',
                    }}
                  />
                </NextLink>
              </Text>
            </Badge>
            <Badge
              // w="6rem"
              // maxW="6rem"
              variant="subtle"
              colorScheme="green"
              borderRadius="6px"
              p="0 0.5rem"
              h={['1.5rem', '2rem']}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize={['xs', 'md', 'lg']}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box w="1rem" h="1rem">
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
                <Text
                  color={color}
                  // fontSize={['xs', 'md', 'lg']}
                  ml="0.2rem"
                  noOfLines={1}
                  maxW="8rem"
                >
                  {uploadTimeDiff}
                </Text>
              </Text>
            </Badge>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
