import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  Text,
  Box,
  Avatar,
  Button,
  Flex,
  Center,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { ImLink } from 'react-icons/im';
import {
  MdOutlineDashboard,
  MdOutlineViewDay,
  MdOutlineGridView,
} from 'react-icons/md';

import { useResponsiveLink } from '../../hook/useResponsiveLink';
import MansonryView from '../../components/MansonryView';
import SimpleView from '../../components/SimpleView';
import ListView from '../../components/ListView';

const Artist = ({ artist_name2info, artist_artworks }) => {
  const router = useRouter();
  const toast = useToast();

  const { nickname } = router.query;
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정

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

  const handleCopyLink = () => {
    const linkToCopy = `https://re-find.xyz/${profile?.author_nickname}`;
    // 복사하려는 링크를 여기에 입력하세요.

    navigator.clipboard.writeText(linkToCopy).then(() => {
      toast({
        title: '프로필 링크 복사됨',
        description: '링크가 클립보드에 복사되었습니다.',
        // status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

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
        console.log(response.data);
        setArtworks([...artworks, ...response.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
      setHasMoreData(false); // No more data to load
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
        <Text fontSize="4xl" fontWeight="bold" m="8px 0" pl="2rem">
          {nickname}
          <Tooltip label="프로필 공유">
            <Button
              w="3rem"
              h="3rem"
              variant="ghost"
              borderRadius="full"
              p="0"
              onClick={handleCopyLink}
            >
              <ImLink />
            </Button>
          </Tooltip>
        </Text>

        <Flex flexDirection="row" alignItems="center" m="8px 0">
          <Box as="button">
            <Text fontWeight="600">작품 수 {profile?.num_artworks}개</Text>
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
            m="0 0.5rem"
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
            m="0 0.5rem"
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
        mt="2rem"
        mb="1rem"
        gap="0.5rem"
      >
        <Button
          variant={activeView === 'masonryView' ? 'solid' : 'ghost'}
          onClick={() => handleViewChange('masonryView')}
        >
          <MdOutlineDashboard size="24px" />
        </Button>
        <Button
          variant={activeView === 'gridView' ? 'solid' : 'ghost'}
          onClick={() => handleViewChange('gridView')}
        >
          <MdOutlineGridView size="24px" />
        </Button>
        <Button
          variant={activeView === 'listView' ? 'solid' : 'ghost'}
          onClick={() => handleViewChange('listView')}
        >
          <MdOutlineViewDay size="24px" />
        </Button>
      </Flex>

      {artworks?.length === 0 && (
        <Center>
          <Text>아직 업로드한 작품이 없네요!</Text>
        </Center>
      )}

      {artworks?.length !== 0 && (
        <Box w="100%">
          {activeView === 'masonryView' && <MansonryView artworks={artworks} />}
          {activeView === 'gridView' && <SimpleView artworks={artworks} />}
          {activeView === 'listView' && <ListView artworks={artworks} />}
        </Box>
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
