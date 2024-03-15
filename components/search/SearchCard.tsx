import {
  Box,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/SearchCard.module.scss';

import SocialStats from './SocialStats';

type Props = {
  item: SearchItem;
  searchText: string;
  isTitleSearch: boolean;
  isContentSearch: boolean;
  isAuthorSearch: boolean;
};

// danerouslySetInnerHTML을 사용하여 검색어를 하이라이팅할 때, dompurify를 고려하여 sanitized HTML 사용할 것
export default function SearchCard({
  item,
  searchText,
  isTitleSearch,
  isAuthorSearch,
  isContentSearch,
}: Props) {
  const {
    title,
    content,
    img_url,
    like,
    view,
    comment,
    date,
    author,
    board,
    url,
  } = item;
  const { colorMode } = useColorMode();
  const isAllHightlight =
    (isTitleSearch && isAuthorSearch && isContentSearch) ||
    (!isTitleSearch && !isAuthorSearch && !isContentSearch);

  const highlightText = (text: string, ableHightlight: boolean) => {
    const regex = new RegExp(searchText, 'gi');

    if (!searchText) return text;
    if (isAllHightlight || ableHightlight) {
      return text.replace(
        regex,
        (match) => `<span style="color: #01BFA2">${match}</span>`
      );
    }
    // 모든 경우가 아니면 그냥 반환
    return text;
  };
  return (
    <Card
      className={styles.card}
      w="100%"
      p="1rem 0"
      alignItems={{ base: 'center' }}
      overflow="hidden"
      variant="unstyled"
      gap="2rem"
      background="none"
    >
      <Stack w="100%">
        <CardBody display="flex" flexDir="column" alignItems="flex-start">
          <Link href={url} prefetch={false} target="_blank">
            <Text
              size="md"
              _hover={{ color: 'gray.500' }}
              textAlign="start"
              className={styles.mainTitle}
              dangerouslySetInnerHTML={{
                __html: highlightText(title, isTitleSearch),
              }}
            />
          </Link>
          <HStack mt="1" gap="0.3rem">
            <Link href={`/artists/${author}`} prefetch={false} target="_blank">
              <Text
                color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                fontSize="s"
                _hover={{
                  color: colorMode === 'light' ? 'gray.500' : 'gray.300',
                }}
                className={styles.subTitle}
                dangerouslySetInnerHTML={{
                  __html: highlightText(author, isAuthorSearch),
                }}
              />
            </Link>
            <Text color="gray.500" fontSize="s">
              ·
            </Text>
            <Text
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
              fontSize="s"
              className={styles.subTitle}
            >
              {board.includes('이세돌┃팬아트') ? '이세돌┃팬아트' : board}
            </Text>
            <Text color="gray.500" fontSize="s">
              ·
            </Text>
            <Text color="gray.500" fontSize="s" className={styles.subTitle}>
              {date.split(' ')[0]}
            </Text>
          </HStack>
          <Text
            py="1"
            textAlign="start"
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: highlightText(
                content.length > 100 ? `${content.slice(0, 250)}...` : content,
                isContentSearch
              ),
            }}
          />
        </CardBody>

        <CardFooter justifyContent="flex-start">
          <SocialStats view={view} like={like} comment={comment} />
        </CardFooter>
      </Stack>
      <Link href={url} prefetch={false} target="_blank">
        <Box className={styles.imageWrapper}>
          <Image
            width="400"
            height="190"
            src={img_url}
            alt={title}
            className={`${styles.image} ${colorMode === 'dark' && styles.dark}`}
            unoptimized
          />
        </Box>
      </Link>
    </Card>
  );
}
