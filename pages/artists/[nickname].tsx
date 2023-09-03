import React, { useState } from 'react';
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
import { links } from '../../data/links';

const data = [
  {
    id: 12435043,
    url: 'https://cafe.naver.com/steamindiegame/12435043',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTRfMjcg/MDAxNjkxOTk4NzI3NzA3.ubvsiQNjjG7cF6VHqpUkWxFqYIdCB88Tb37xwvUu1RIg.S6KXi0ojB7PELe8RbXdglPXylovRzBtGAe4RHh_UFLwg.PNG/%EB%AC%B4%EC%A0%9C1560.png',
    board: '🎨 이세돌┃팬아트',
    category: '2인 이상',
    title: '삘 받아서 만들었어요',
    date: '2023.08.14. 16:42',
    deleted: false,
  },
  {
    id: 12411007,
    url: 'https://cafe.naver.com/steamindiegame/12411007',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTJfMTk5/MDAxNjkxODM3Mzg4NDk4.nQF-iEYdlf7HQW8ALvDHVxE11j7cKk9zhCXngw2V4DIg.JxRmf6shp8pGYVB0_Y5rJ56k3beS3kPWJXKJpfKg0MIg.PNG/%EB%AC%B4%EC%A0%9C1543.png',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '챤님',
    date: '2023.08.12. 19:53',
    deleted: false,
  },
  {
    id: 12258199,
    url: 'https://cafe.naver.com/steamindiegame/12258199',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MzFfMTI1/MDAxNjkwNzY2MjY1NTcy.18JXB3EqyPFetryGW88rcD-5LYtuSVy2_0czIKpOsz0g.BaeCozrOw77vyz7SWLQ5i4cUlReUogZod6DFZznKyNUg.PNG/%EB%AC%B4%EC%A0%9C1385.png',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '점점 실력이 진화하는 글',
    date: '2023.07.31. 10:19',
    deleted: false,
  },
  {
    id: 12199696,
    url: 'https://cafe.naver.com/steamindiegame/12199696',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjZfNjUg/MDAxNjkwMzY2ODQxNzEw.NWc_oq4eEOuKh-TpnOeslPdYryuZIYTjK8Rq3JoBlsog.8L31EI8DWN_6izwJIM59MBAPFNQJ5fyvFt4tz0LtK_cg.PNG/%EB%AC%B4%EC%A0%9C1496.png',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '꽃 요정 챤님 +(체색 완료)',
    date: '2023.07.26. 18:47',
    deleted: false,
  },
  {
    id: 12248392,
    url: 'https://cafe.naver.com/steamindiegame/12248392',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MzBfNjgg/MDAxNjkwNjg5MDc0MTY4.ek1zqiwDSL2HCLqxWstnEN3fwSfZwN54WxSjRxHLFA4g.pz-TNE6G4nBLKAixjIvluKk3GEO84rn41y_VjMrYt4sg.PNG/%EB%AC%B4%EC%A0%9C1459_%281%29.png',
    board: '우왁굳 팬아트',
    category: '합성짤',
    title: '제가 본 팬치들',
    date: '2023.07.30. 12:53',
    deleted: false,
  },
  {
    id: 12076089,
    url: 'https://cafe.naver.com/steamindiegame/12076089',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MThfMjQ2/MDAxNjg5Njc5ODMwNzA3.9bEnHLivpkPhw0Lh5z7mwwwao--RNIDea86TCiPT7scg.wuMH-lqhRjXTe6rn2d4WzbpD9hoRnQpkrIabQs5T9Nwg.PNG/%EB%AC%B4%EC%A0%9C1436.png',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '비차장',
    date: '2023.07.18. 20:30',
    deleted: false,
  },
  {
    id: 12690454,
    url: 'https://cafe.naver.com/steamindiegame/12690454',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MzBfMjE3/MDAxNjkzMzg2OTYzOTE0.zJEMNxs-8s-xBQoGzjVzRGzY3xMbW3dZwW9tQFRR7kkg.9mAIVXCRP4leBIcGupMgs3jZcj2VTOHQDFCkGOOIQxgg.JPEG/20230830_181455.jpg',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '숙제하다 갑자기 키딩 낙서 (진짜 낙서임)',
    date: '2023.08.30. 18:16',
    deleted: false,
  },
  {
    id: 12687975,
    url: 'https://cafe.naver.com/steamindiegame/12687975',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MzBfODcg/MDAxNjkzMzY3NDkwMTYw.zx25IYs7uP65l3m8fCHOxFOadgjU3G95ibau3SF3QE4g.t7WE-idAN_iF1N9r78AxMGzdLwCH3KjLFXLXGqxVJJ8g.PNG/%EB%AC%B4%EC%A0%9C1597.png',
    board: '🎨 이세돌┃팬아트',
    category: '2인 이상',
    title: '즐거운 낙서',
    date: '2023.08.30. 12:53',
    deleted: false,
  },
  {
    id: 12666440,
    url: 'https://cafe.naver.com/steamindiegame/12666440',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjhfNTYg/MDAxNjkzMjEwNzA0OTg5.gSquV7knheYdJ3P9LEQL4nLCzdo8hxYMcFLOwppWMWQg.FksNK35n-XMyLa681szCF2XQSA_i0KkWvd4MWzvoIDkg.PNG/%EB%AC%B4%EC%A0%9C1592.png',
    board: '🎨 이세돌┃팬아트',
    category: '아이네',
    title: '낙서',
    date: '2023.08.28. 17:21',
    deleted: false,
  },
  {
    id: 12633610,
    url: 'https://cafe.naver.com/steamindiegame/12633610',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjZfMTIg/MDAxNjkzMDI5MTgyOTY1.dVmCJvrpk_ZzRz92VdE6vjDI-m5875BrR9M9MPpSAaEg.uTmU5Wu-mltTXkV77Jpx0qYgAuAhJWLG9kExerKd4sYg.PNG/%EB%AC%B4%EC%A0%9C1575.png',
    board: '🎨 이세돌┃팬아트',
    category: '비챤',
    title: '키딩',
    date: '2023.08.26. 14:53',
    deleted: false,
  },
  {
    id: 12633689,
    url: 'https://cafe.naver.com/steamindiegame/12633689',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjZfMjg2/MDAxNjkzMDI5MzQ3MDYw.bTJiMuqW-LHZAlaOFwt5PrFt1bkDO8rKkIerBFphGp8g.rut5oiFHervUSK7f-JJ6yWuGicjRykLFDgFrCZVY0fsg.PNG/%EB%AC%B4%EC%A0%9C1506.png',
    board: '🎨 이세돌┃팬아트',
    category: '2인 이상',
    title: '하찮은 이세돌 그림',
    date: '2023.08.26. 15:00',
    deleted: false,
  },
];

const Artist = ({ artist_name2info, artist_artworks }) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(artist_name2info);
  const [artworks, setArtworks] = useState(artist_artworks);
  const member_link = useResponsiveLink(
    profile?.author_url.split('/').pop(),
    links.mobile.member,
    links.pc.member,
    0
  );
  const article_link = useResponsiveLink(
    '',
    links.mobile.article,
    links.pc.article,
    0
  );

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
          name={profile?.author_name}
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
          justifyContent="center"
          alignItems="center"
          placeItems="center"
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
