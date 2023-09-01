import React from 'react';
import { useRouter } from 'next/router';
import {
  Text,
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

const Artist = ({ artistData }) => {
  const router = useRouter();
  const { nickname } = router.query;
  console.log(artistData);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      margin="5rem auto"
      w="90%"
      maxW="750px"
      backgroundColor="gray.100"
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        width="100%"
        p="10px"
        // justifyContent="space-between"
      >
        <Avatar
          size="xl"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          mb="4rem"
        />

        <Flex flexDirection="column" alignItems="flex-start" w="100%" ml="2rem">
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            mb="0.5rem"
          >
            <Text fontSize="xl" fontWeight="bold">
              {nickname}
            </Text>
            <Button colorScheme="teal">팔로우하기</Button>
          </Flex>
          <Text>123 게시글</Text>
        </Flex>
      </Flex>
      <Box>
        <Text>123</Text>
      </Box>
    </Box>
  );
};
export default Artist;

export async function getServerSideProps(context) {
  const { nickname } = context.query;

  try {
    // Axios를 사용하여 데이터 가져오기
    const response = await axios.get(
      `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=1`
    );

    const artistData = response.data;
    console.log(artistData);
    return {
      props: {
        artistData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        artistData: null, // 오류 처리를 위한 기본값 설정
      },
    };
  }
}
