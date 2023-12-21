import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import ArtistsList from '@/components/artist/ArtistsList';
import ArtistsSearchInput from '@/components/artist/ArtistsSearchInput';
import SortTypeButtonGroup from '@/components/artist/SortTypeButtonGroup';
import ViewTypeButtonGroup from '@/components/artist/ViewTypeButtonGroup';
import { sortTypes, viewTypes } from '@/data/artists';
import { useDebounce } from '@/hook/useDebounce';
import { darkMode, lightMode } from '@/styles/theme';

interface User {
  total_cnt: number;
  best_cnt: number;
  goldhand_cnt: number;
  isd_cnt: number;
  gomem_cnt: number;
  wak_cnt: number;
  prof_url: string;
  total_views: number;
  total_likes: number;
  total_comments: number;
  textValue?: string;
}

const Artists = () =>
  // { artists_list }
  {
    const itemsPerPage = 50;

    const [isRendering, setIsRendering] = useState(true);
    const [artistsList, setArtistsList] = useState([]);
    // const [artistsList, setArtistsList] = useState(sampleData);
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState(artists);
    const [visibleArtists, setVisibleArtists] = useState([]);

    const [nickname, setNickname] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const [selectedView, setSelectedView] = useState(null);
    const [sortCriteria, setSortCriteria] = useState({
      field: 'total_likes',
      order: 'descending', // 'ascending' 또는 'descending'
    });
    const [prevSortCriteria, setPrevSortCriteria] = useState({
      field: '',
      order: '',
    });

    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500); // 500ms 지연
    const { ref, inView } = useInView({
      // infinite scroll을 위한 옵저버
      threshold: 0,
      rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
    });

    const bg = useColorModeValue(lightMode.bg, darkMode.bg);
    const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
    const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlight = useColorModeValue(lightMode.highlight, darkMode.badge);

    const highlightText = (text, highlight2) => {
      const parts = text.split(new RegExp(`(${highlight2})`, 'gi'));
      return parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      );
    };

    // 정렬 로직
    const sortArtists = (_artists, { field, order }) => {
      return _artists.sort((a, b) => {
        if (order === 'ascending') {
          return a[field] - b[field];
        }
        return b[field] - a[field];
      });
    };

    const handleViewSelect = (value) => {
      if (selectedView === value) {
        // 뷰 선택 해제
        setSelectedView(null);
        // 전체 아티스트 목록에서 sortCriteria 기준으로 정렬
        setSortCriteria({
          field: 'total_likes',
          order: 'descending',
        });
        const sortedArtists = sortArtists(artists, sortCriteria);
        setFilteredArtists(sortedArtists);
        setVisibleArtists(sortedArtists.slice(0, itemsPerPage));
        setPage(1);
        setIsLastPage(false);
      } else {
        setSelectedView((prevValue) => (prevValue === value ? null : value));
        setSortCriteria((prevState) => {
          return { ...prevState, field: value, order: 'descending' };
        });
      }
    };

    const handleChangeSortCriteria = (field) => {
      setPrevSortCriteria(sortCriteria); // 이전 정렬 기준 저장
      setSortCriteria((prevState) => {
        if (prevState.field === field) {
          return {
            ...prevState,
            order: prevState.order === 'ascending' ? 'descending' : 'ascending',
          };
        }
        return { ...prevState, field, order: 'descending' };
      });
      // console.log(sortCriteria);
    };

    const handleSearch = (e) => {
      console.log(e.target.value);
      setNickname(e.target.value);
      setSearchTerm(e.target.value);
    };

    useEffect(() => {
      console.log('isRendering: ', isRendering);
      // 3초 후에 렌더링 완료
      setTimeout(() => {
        setIsRendering(false);
      }, 6000);
      console.log('isRendering: ', isRendering);
    }, []);
    useEffect(() => {
      const fetchArtistsList = async () => {
        try {
          const response = await axios.get(
            'https://re-find.reruru.com/author_list'
          );
          setArtistsList(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          // 여기에 에러 처리 로직 추가
        }
      };

      fetchArtistsList();
    }, []);

    // 1 artists 데이터 로드
    useEffect(() => {
      // const updatedArtists = Object.entries(artists_list).map(
      //   ([key, value]) => {
      const updatedArtists = Object.entries(artistsList).map(([key, value]) => {
        return { name: key, ...(value as User) };
      });
      // console.log(updatedArtists);
      setArtists(updatedArtists);
    }, [artistsList]);
    // }, [artists_list]);

    // 2 검색, 정렬, 뷰 선택에 따른 filteredArtists 업데이트
    useEffect(() => {
      let updatedArtists = artists;

      if (debouncedSearchTerm) {
        // 검색어 필터링 적용
        updatedArtists = updatedArtists.filter((artist) =>
          artist.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }

      if (selectedView) {
        // 선택된 뷰 기준 필터링 적용
        updatedArtists = updatedArtists.filter(
          (artist) => artist[selectedView] > 0
        );
      }
      // 정렬 로직 적용
      updatedArtists = sortArtists(updatedArtists, sortCriteria);

      setFilteredArtists(updatedArtists);
      setVisibleArtists(updatedArtists.slice(0, itemsPerPage)); // 초기화
      setPage(1); // 페이지 초기화
      setIsLastPage(false); // 마지막 페이지 초기화
    }, [artists, debouncedSearchTerm, selectedView, sortCriteria]);

    // 3 페이지 변경에 따른 visibleArtists 업데이트
    useEffect(() => {
      if (isLastPage) return;
      // 현재 보여지는 아티스트의 수가 전체 필터링된 아티스트 수보다 많거나 같으면 마지막 페이지로 간주
      if (visibleArtists.length >= filteredArtists.length) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
      setVisibleArtists((prev) => [
        ...prev,
        ...filteredArtists.slice(prev.length, page * itemsPerPage),
      ]);
    }, [page, filteredArtists]);

    // 무한 스크롤 이벤트 처리 - inView가 true이고 마지막 페이지가 아닐 때 page를 증가
    useEffect(() => {
      // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
      if (inView) console.log('inView: ', inView);
      if (inView && !isLastPage) {
        setPage((prev) => prev + 1);
      }
    }, [inView, isLastPage]);

    // useEffect(() => {
    //   // API 호출 또는 필터링 로직
    //   console.log(debouncedSearchTerm);
    // }, [debouncedSearchTerm]);

    useEffect(() => {
      const filteredArtists2 = searchTerm
        ? artists.filter((artist) =>
            artist.name.toLowerCase().includes(searchTerm)
          )
        : artists;

      setFilteredArtists(filteredArtists2);
    }, [searchTerm, artists]);

    return (
      <Box
        mt="10px"
        mb="10px"
        p="1rem"
        textAlign="center"
        w="100%"
        backgroundColor={bg}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="h2" fontSize="3xl" fontWeight="bold">
          왁타버스 작가
        </Text>
        <Text fontSize="md">
          왁물원에서 활동중인 작가님의 작품을 모아서 볼 수 있어요.
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="3rem"
          w="100%"
          maxW="1024px"
        >
          <ArtistsSearchInput nickname={nickname} handleSearch={handleSearch} />
          <ViewTypeButtonGroup
            filteredArtists={filteredArtists}
            viewTypes={viewTypes}
            selectedView={selectedView}
            handleViewSelect={handleViewSelect}
          />
          <SortTypeButtonGroup
            sortCriteria={sortCriteria}
            sortTypes={sortTypes}
            handleChangeSortCriteria={handleChangeSortCriteria}
          />
          <Box mb="1rem"></Box>
          <ArtistsList
            visibleArtists={visibleArtists}
            sortCriteria={sortCriteria}
            sortTypes={sortTypes}
            viewTypes={viewTypes}
            ref={ref}
          />
          {(!isLastPage || isRendering) && (
            <Box
              m="2rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <HashLoader color="#01BFA2" />
            </Box>
          )}
        </Box>
      </Box>
    );
  };

export default Artists;

// export async function getServerSideProps(context) {
//   try {
//     const artists_list = await axios
//       .get(`http://re-find.reruru.com/author_list`)
//       .then((res) => res.data);

//     return {
//       props: {
//         artists_list,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);

//     return {
//       notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
//     };
//   }
// }
