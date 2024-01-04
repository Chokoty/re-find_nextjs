import { Box, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { filter } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import SearchLayout from '@/components/layout/search-layout';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import gallary from '@/data/gallary';
import members from '@/data/members';

export default function Album() {
  const itemsPerPage = 30;
  const toast = useToast();
  const router = useRouter();

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const [total, setTotal] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [visibleArtworks, setVisibleArtworks] = useState([]);
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState('isd');
  const [album, setAlbum] = useState(gallary[0]);
  const [member, setMember] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const resetArtworks = useCallback(() => {
    setVisibleArtworks([]);
    setPage(1);
    setIsLastPage(false);
  }, []);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
      resetArtworks();
    },
    [sortType, resetArtworks] // useCallback 문제였음...
  );

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
    console.log(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 이미지 로딩
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const updateVisibleArtworks = useCallback(() => {
    console.log('updateVisibleArtworks');
    // console.log(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleArtworks(filteredArtworks.slice(startIndex, endIndex));
  }, [page, filteredArtworks]);

  const getFanartAlbum = useCallback(async () => {
    if (loadingData) return;

    setLoadingData(true);

    try {
      const url = `https://re-find.reruru.com/isd_notice`;
      const response = await axios.get(url).then((res) => res.data);
      console.log(response);
      setTotal(response?.total);
      setArtworks([...response.list]);
    } catch (error) {
      // 500에러 예외처리
      console.log(error.response);
      if (error.response?.status === 500) {
        toast({
          title:
            '현재 작가 프로필 쪽 서버가 점검중 입니다. 잠시 후 다시 시도해주세요.',
          description: '500 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, []);

  useEffect(() => {
    resetArtworks();
    // sort type에 따라 artworks 정렬
  }, [sortType]);

  useEffect(() => {
    console.log(visibleArtworks);
  }, [visibleArtworks]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log('page: ', page);
    // getFanartAlbum();
    updateVisibleArtworks();
  }, [page]);

  useEffect(() => {
    if (isLastPage) return;
    console.log('filtered');
    console.log(filteredArtworks);

    updateVisibleArtworks();
    if (filteredArtworks.length <= itemsPerPage * page) {
      setIsLastPage(true);
    }
  }, [filteredArtworks]);

  // filtered
  useEffect(() => {
    resetArtworks();

    if (selected === 'isd') {
      setFilteredArtworks(artworks);
    } else {
      const m = members.find((item) => item.value === selected);
      if (!m) {
        console.error('Selected member not found');
        return;
      }
      const { author } = m;
      // const { author } = members.find((item) => item.value === selected);
      console.log(author);

      // artworks에서 author가 name인 것만 필터링
      const filtered = artworks.filter((item) => item.author === author);
      // console.log(filtered.length);
      // console.log(filtered);
      setFilteredArtworks(filtered);
    }
  }, [selected, artworks]);

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage && !loadingData) {
      // !loadingData: 작가페이지 카운트 버그 수정
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  useEffect(() => {
    console.log('album: ');
    getFanartAlbum();
  }, []);

  return (
    <SearchLayout title="팬아트 갤러리">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m=" 3rem"
      >
        <PageTitle topTitle={album} />
        <MemberButtonList
          members={members}
          type="sort"
          range={{ start: 1, end: 7 }}
          selected={selected}
          setSelected={setSelected}
          isdPick={true}
        />
        {/* <Text>총 {total}</Text> */}
        <Text>총 {filteredArtworks.length}</Text>
      </Box>
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        topOffset={48}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        mb="2rem"
      >
        {(!artworks || loadingData) && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        )}
        {visibleArtworks && (
          <>
            {visibleArtworks?.length !== 0 && (
              <Box
                w="100%"
                overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
              >
                {activeView === 'masonryView' && (
                  <MasonryView
                    nickname={''}
                    artworks={visibleArtworks}
                    isDeletedVisible={isDeletedVisible}
                    // loadingImage={loadingImage}
                    handleLoading={handleLoading}
                    isGallary={true}
                  />
                )}
                {activeView === 'gridView' && (
                  <SimpleView
                    artworks={visibleArtworks}
                    isDeletedVisible={isDeletedVisible}
                    // handleLoading={handleLoading}
                  />
                )}
                {/* Observer를 위한 div */}
                {<Box ref={ref} w="100%" h="2rem"></Box>}
              </Box>
            )}
          </>
        )}
      </Box>
    </SearchLayout>
  );
}
