import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Image from 'next/image';
import SocialStats from './SocialStats';
import Link from 'next/link';
import styles from '@/styles/SearchCard.module.scss';

type Props = {
  item: {
    id: number;
    url: string;
    img_url: string;
    img_url_list: string[];
    board: string;
    category: string;
    title: string;
    author: string;
    content: string;
    date: string;
    view: number;
    like: number;
    comment: number;
    deleted: boolean;
    source: null;
    is_shukkou: boolean;
    is_hyum: boolean;
  };
};

export default function SearchCard({ item }: Props) {
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
  return (
    <Card
      className={styles.card}
      w="100%"
      p="1rem 0"
      alignItems={{ base: 'center' }}
      overflow="hidden"
      variant="unstyled"
      gap="2rem"
    >
      <Stack w="100%">
        <CardBody display="flex" flexDir="column" alignItems="flex-start">
          <Link href={url} prefetch={false}>
            <Heading size="md" _hover={{ color: 'gray.500' }}>
              {title}
            </Heading>
          </Link>
          <HStack mt="1" gap="0.3rem">
            <Link href={`/artists/${author}`} prefetch={false}>
              <Text
                color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                fontSize="s"
                _hover={{
                  color: colorMode === 'light' ? 'gray.500' : 'gray.300',
                }}
              >
                {author}
              </Text>
            </Link>
            <Text color="gray.500" fontSize="s">
              ·
            </Text>
            <Text
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
              fontSize="s"
            >
              {board.includes('이세돌┃팬아트') ? '이세돌┃팬아트' : board}
            </Text>
            <Text color="gray.500" fontSize="s">
              ·
            </Text>
            <Text color="gray.500" fontSize="s">
              {date.split(' ')[0]}
            </Text>
          </HStack>
          <Text py="1" textAlign="start" className={styles.content}>
            {content.length > 100 ? content.slice(0, 250) + '...' : content}
          </Text>
        </CardBody>

        <CardFooter justifyContent="flex-start">
          <SocialStats view={view} like={like} comment={comment} />
        </CardFooter>
      </Stack>
      <Link href={url} prefetch={false}>
        <Box
          className={styles.imageWrapper}
        >
          <Image
            width="400"
            height="190"
            src={img_url}
            alt={title}
            className={styles.image}
          />
        </Box>
      </Link>
    </Card>
  );
}
