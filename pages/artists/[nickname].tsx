import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Text,
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  Flex,
  Link,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useResponsiveLink } from '../../hook/useResponsiveLink';

const Artist = ({ artist_name2info, artist_artworks }) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(artist_name2info);
  const [artworks, setArtworks] = useState(artist_artworks);
  const [page, setPage] = useState(1); // Current page number
  const [hasMoreData, setHasMoreData] = useState(true); // Whether there is more data to load

  const member_link = useResponsiveLink(
    profile?.author_url.split('/').pop(),
    'member'
  );
  const article_link = useResponsiveLink('', 'article');
  // console.log(profile?.author_prof_url);

  // Function to load more data when scrolling to the bottom
  const loadMoreData = async () => {
    if (!hasMoreData) return; // No more data to load

    try {
      const nextPage = page + 1;
      const response = await axios.get(
        `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=${nextPage}`
      );

      if (response.data.length === 0) {
        setHasMoreData(false); // No more data to load
      } else {
        setArtworks([...artworks, ...response.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  useEffect(() => {
    // Add an event listener to detect scrolling to the bottom of the page
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        loadMoreData();
      }
    });

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('scroll', loadMoreData);
    };
  }, [page, hasMoreData]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      margin="0 auto"
      w="100%"
      mb="2rem"
    >
      <Flex flexDirection="column" alignItems="center" width="656px" pt="10px">
        <Avatar
          w="120px"
          h="120px"
          name={profile?.author_nickname}
          src={profile?.author_prof_url}
          m="0.5rem 0"
        />
        <Text fontSize="4xl" fontWeight="bold" m="8px 0">
          {nickname}
        </Text>
        <Flex flexDirection="row" alignItems="center" m="8px 0">
          <Box as="button">
            <Text fontWeight="600">작품 수 {artworks?.length}개</Text>
          </Box>
          {/* <Text fontSize="14px" fontWeight="400" p="0 4px">
            ·
          </Text>
          <Box as="button">
            <Text fontWeight="600">팔로워 120명</Text>
          </Box>
          <Text fontSize="14px" fontWeight="400" p="0 4px">
            ·
          </Text>
          <Box as="button">
            <Text fontWeight="600">팔로잉 13명</Text>
          </Box> */}
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          w="100%"
          ml="2rem"
          m="8px 0"
        >
          <Button
            colorScheme="gray"
            borderRadius="full"
            m="0 20px"
            h="48px"
            onClick={() => {
              window.open(member_link, '_blank');
            }}
          >
            왁물원
          </Button>
          <Button
            colorScheme="green"
            borderRadius="full"
            m="0 20px"
            h="48px"
            onClick={() => {
              alert('아직 기능 구현중입니다.');
            }}
          >
            팔로우
          </Button>
        </Flex>
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        h="60px"
        mb="16px"
      >
        <Text>정렬</Text>
      </Flex>
      {artworks?.length === 0 && (
        <Center>
          <Text>아직 업로드한 작품이 없네요!</Text>
        </Center>
      )}

      {artworks?.length !== 0 && (
        <SimpleGrid
          w="96%"
          minChildWidth="252px"
          m="0 2rem"
          spacing="0.5rem"
          justifyContent="center"
          alignItems="center"
          placeItems="center"
          p="1rem"
        >
          {artworks?.map((artwork) => (
            <Box
              key={artwork.id}
              m="8px"
              w="252px"
              h="234px"
              alignItems="center"
              borderRadius="1rem"
              overflow="hidden"
              flexWrap="wrap"
            >
              <Link
                href={
                  artwork.url === ''
                    ? '#'
                    : article_link + artwork.url.split('/').pop()
                }
                isExternal
              >
                <Image
                  alt={artwork.title}
                  width={300}
                  height={300}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    // objectPosition: 'center -50px',
                    width: '100%',
                    height: '100%',
                  }}
                  src={artwork.img_url}
                  unoptimized
                />
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
export default Artist;

export async function getServerSideProps(context) {
  const { nickname } = context.query;

  try {
    const artist_name2info = await axios
      .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
      .then((res) => res.data);
    const artist_artworks = await axios
      .get(
        `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=1`
      )
      .then((res) => res.data);

    console.log(artist_name2info);
    console.log(artist_artworks);
    const ret = await Promise.all([artist_name2info, artist_artworks]);

    return {
      props: {
        artist_name2info: ret[0],
        artist_artworks: ret[1],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
