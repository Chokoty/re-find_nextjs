import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import NextImage from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEye, FaImage, FaSearch } from 'react-icons/fa';
import { FaComment, FaThumbsUp } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

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

const sortTypes = [
  { name: '총 작품', value: 'total_cnt' },
  { name: '총 조회', value: 'total_views' },
  { name: '총 댓글', value: 'total_comments' },
  { name: '총 좋아요', value: 'total_likes' },
];

const viewTypes = [
  { name: '금손 작가', value: 'goldhand_cnt' },
  { name: '베스트', value: 'best_cnt' },
  { name: '우왁굳', value: 'wak_cnt' },
  { name: '고멤/교멤', value: 'gomem_cnt' },
  { name: '이세돌', value: 'isd_cnt' }, // 추천
];

// const data = {
//   살쾡: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 0,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url: '',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   잎나무: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 2,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDhfNjkg/MDAxNjk0MTgwNDEwNjUw.SdpRRp2WxKz-hK73YfH76v6p8eJgDW4xwKbYT1yJdowg.pJQbiT_05xp5AREUB-Rd7SgEQc_9zcg6APlXIFjixygg.GIF/1692454420653.gif',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   꿀맛방어: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 3,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png',
//     total_views: 4521,
//     total_likes: 404,
//     total_comments: 71,
//   },
//   고라니10: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 0,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url: '',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   이름뭘로할지모르겠다: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 17,
//     gomem_cnt: 0,
//     wak_cnt: 1,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MjhfNzMg/MDAxNjk1ODMzMzU4MzQy.vLgX56YNPcDE3o9WSnTSRIgSgyZsnsB-XRyTiWREFp8g.UTORMJaDURbPBISkzRIKHtrMUpC16vKF10DrSC2Hzw8g.JPEG/externalFile.jpg',
//     total_views: 1907,
//     total_likes: 197,
//     total_comments: 81,
//   },
//   넒적부리황새: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 1,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   하리오리: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 14,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMjA1MjBfOTcg/MDAxNjUzMDE1NzI4Njk4.k-B1pWtSDxR4CffKRX07AQ4SrFgSWNV1zUAB_zQ3NSgg.i-N5AnJmIZdJZrqNDNojombF2setZMOL8UNpHMUjf-wg.PNG/%25EC%2596%25B8%25EB%258D%25B0%25EB%2593%259C.png',
//     total_views: 5091,
//     total_likes: 92,
//     total_comments: 110,
//   },
//   까모: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 8,
//     gomem_cnt: 0,
//     wak_cnt: 11,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMzExMDhfMjM2/MDAxNjk5MzcyNTcwMDE3.tgOlNmkcUqqmJZhbV0Xc2ogQQyzl5mB6l9Pih59-_oAg.BoMZRXQ4RNfrjXJ5iniZFCBoH3ckQnN9CSzZQcYW09Qg.JPEG/externalFile.jpg',
//     total_views: 17013,
//     total_likes: 874,
//     total_comments: 448,
//   },
//   의정학: {
//     total_cnt: 0,
//     best_cnt: 1,
//     goldhand_cnt: 0,
//     isd_cnt: 61,
//     gomem_cnt: 7,
//     wak_cnt: 7,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MTlfMjQz/MDAxNjgxODUyOTUxMjE1.ydkiqQkdDk0p15QDOdEMM6k1SbNUu-kp_Q2cm8pM5yAg.SED_kA-0k7VjfQPwzX1ERwm1JOQkpM5XEwxn8-lMWocg.JPEG/Screenshot_20230419_062220_Chrome.jpg',
//     total_views: 216669,
//     total_likes: 24083,
//     total_comments: 5376,
//   },
//   박하향: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 31,
//     gomem_cnt: 3,
//     wak_cnt: 5,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEwMjVfMTY1/MDAxNjM1MTYyOTQ0MzYy.rw2bQ0FRnlCr9hhstCqzuxhpG1JzbObKrld4ke89lNQg.Y7BjOaTTPA3Vl0FdrZBlRZ5Sgq3ZeaI_DccV4JCb3MAg.PNG/%25EB%25AC%25B4%25EC%25A0%259C262_20210801125851.png',
//     total_views: 10725,
//     total_likes: 574,
//     total_comments: 404,
//   },
//   짜요짜요집착녀: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 10,
//     gomem_cnt: 0,
//     wak_cnt: 7,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMjA0MDJfMjYy/MDAxNjQ4ODYxMTg4Mjkz.CM9ZzKvPjmj5Gj_ZvEPlzQqQz1y8-WJtDcxzplMA0OEg.J-Oi0ZpFT_5sdnuqz2GQ1rLDQz59_tN846cKhuUpxR4g.JPEG/externalFile.jpg',
//     total_views: 5624,
//     total_likes: 84,
//     total_comments: 90,
//   },
//   진돌쓰: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 3,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMjA0MjJfMjQ0/MDAxNjUwNjIzMjI4NjUw.QHlSay89IPQRiIOJFep8MGz4Jc4nHsU2x8OtVFkpoHAg.lBZ6xrLbc9Ciw937Bx6zrIfLmu3K2KHUxPd7xeDpchQg.PNG/externalFile.png',
//     total_views: 822,
//     total_likes: 18,
//     total_comments: 19,
//   },
//   테레비: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 2,
//     gomem_cnt: 0,
//     wak_cnt: 1,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMjAzMDVfNDIg/MDAxNjQ2NDQ1ODI1NTM4.R3GN0TpSZtmYYNA_9Z9ZTKNFzwOZVZgECjFM92AbYaUg.gyUAeoLxyD3vK5-5tyKJbG_YE3K4UHduBlfBa3-gheAg.JPEG/externalFile.jpg',
//     total_views: 519,
//     total_likes: 10,
//     total_comments: 17,
//   },
//   더듬이국수: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 199,
//     gomem_cnt: 51,
//     wak_cnt: 45,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEyMDlfMTEy/MDAxNjM5MDQwMjIyNTQz.kmgL1MwUuccactDHWpxeFa_DlRFg-9dKT26u2DXFUkQg.w9O_ppfd9g3mWTqJPOIHOmYw0mb_HSLfpt61nkVfhJog.JPEG/externalFile.jpg',
//     total_views: 315491,
//     total_likes: 27244,
//     total_comments: 9742,
//   },
//   카카오봇: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 0,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://blogpfthumb-phinf.pstatic.net/data28/2007/12/16/89/dsc_5653-rio500.jpg',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   편의점빨대도둑팬치: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 13,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMDA3MzBfNjQg/MDAxNTk2MTAyNzAzMDA2.cyU1Dg000tJer-zSXjyg9ZSwtOBQASS1xQSvLeFfHEwg.4mN7Grj6gnpptQ5wAHOThLvjKQeJYPvthlvDdLEVswsg.JPEG/externalFile.jpg',
//     total_views: 5681,
//     total_likes: 100,
//     total_comments: 76,
//   },
//   짜요짜요집착걸: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 37,
//     gomem_cnt: 3,
//     wak_cnt: 4,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMjA0MDJfMjYy/MDAxNjQ4ODYxMTg4Mjkz.CM9ZzKvPjmj5Gj_ZvEPlzQqQz1y8-WJtDcxzplMA0OEg.J-Oi0ZpFT_5sdnuqz2GQ1rLDQz59_tN846cKhuUpxR4g.JPEG/externalFile.jpg',
//     total_views: 22336,
//     total_likes: 843,
//     total_comments: 471,
//   },
//   픽소드: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 44,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png',
//     total_views: 16463,
//     total_likes: 625,
//     total_comments: 363,
//   },
//   릴악: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 75,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEwMDVfMjIx/MDAxNjMzMzc2ODUyNTg3.4x0VaTNHTnGXW8ssdUqFhCDaL1T6z9qrPDfJtqp5-ngg.3QkY7k0tY6I9sseXT5mfsu2nO92-h5dHp5tjT0W9uJQg.JPEG/externalFile.jpg',
//     total_views: 64912,
//     total_likes: 4057,
//     total_comments: 1681,
//   },
//   뽀록은순간수준은영원: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 0,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url: '',
//     total_views: 0,
//     total_likes: 0,
//     total_comments: 0,
//   },
//   노앵아: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 8,
//     gomem_cnt: 1,
//     wak_cnt: 1,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEwMTFfNzEg/MDAxNjMzOTUzMjAxOTA1.5HO3g58Vr1LsrtY8Eg8z4UysZFto8EGscPI0rZbH1n4g.5yHDVkIl9IImAKVBTJilQEuOenxaVoXcrdM_yzY7UtMg.JPEG/%25ED%2596%2584%25EC%259D%25B4%25EB%2584%25A4%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584%25EC%259A%25A9.jpg',
//     total_views: 7247,
//     total_likes: 389,
//     total_comments: 186,
//   },
//   써녜: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 5,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTExMDRfMjY4/MDAxNjM1OTY0NDMxNzM5.ZLpYMIMFGy4OuOvgJQsUO26zfisURAsdfTPfCUa4kJUg.gz4Q9KfL8psvvVQLZFR0jGMlWRw_0UZleDFJKhoNZMMg.JPEG/ED_3cBNVAAENrsB.jpg',
//     total_views: 2661,
//     total_likes: 91,
//     total_comments: 45,
//   },
//   니쿠큥: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 4,
//     gomem_cnt: 7,
//     wak_cnt: 1,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEwMTlfMTQ3/MDAxNjM0NjA4MDEyODQ4.KDNEXGziuR97xjtO0hXSsJEVwbNShZpB2XVXwdjdr68g.BSy_oRGLxYjSX6I_V2FLTgWNyxoW-JGxGmDGnqAZyMMg.JPEG/060B8EAF-7BC4-4E0C-AC06-065886D2EF5D.jpeg',
//     total_views: 22432,
//     total_likes: 863,
//     total_comments: 341,
//   },
//   고3트수: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 1,
//     gomem_cnt: 1,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MDlfMTUw/MDAxNjgzNjAxNjg3MjE2.G3Ay_uuXFhLl-qcdN3GQB30CGrPGxT76HaCAfLgfqrAg.UuaJYGD7aSAQuEWijajkxC9aqX2hMoFYgPjF9vnV83Ug.JPEG/externalFile.jpg',
//     total_views: 1187,
//     total_likes: 19,
//     total_comments: 24,
//   },
//   뉴뉴냐냐: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 13,
//     gomem_cnt: 1,
//     wak_cnt: 0,
//     prof_url:
//       'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png',
//     total_views: 60909,
//     total_likes: 3109,
//     total_comments: 772,
//   },
//   Ssab: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 20,
//     gomem_cnt: 6,
//     wak_cnt: 1,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMDA0MTNfMjkw/MDAxNTg2NzYwODM2NTky.t6PvPSexzK3OHYxdTAiNiie-FzpnISaxKJFLsJ0NnzAg.Ep27yW5GyHZuJ3tWo4q7pFGyikt-_FlusIKq6pHz4aMg.JPEG/20200411_223126.jpg',
//     total_views: 13996,
//     total_likes: 456,
//     total_comments: 364,
//   },
//   덴DEN: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 52,
//     gomem_cnt: 0,
//     wak_cnt: 0,
//     prof_url:
//       'https://cafeptthumb-phinf.pstatic.net/MjAyMTEwMjhfMTI2/MDAxNjM1NDMyNzIxNjU0.BDnmgmaGrRaMyeNDdkokrpXzA4-2lcxaQhOWzLZTbOsg.4B1AHWnwZ8rXdeGjD09WYFNOcYXSPDvwFhPuf_i6HPAg.JPEG/externalFile.jpg',
//     total_views: 16728,
//     total_likes: 1865,
//     total_comments: 860,
//   },
//   삼큐: {
//     total_cnt: 0,
//     best_cnt: 0,
//     goldhand_cnt: 0,
//     isd_cnt: 1,
//     gomem_cnt: 4,
//     wak_cnt: 0,
//     prof_url:
//       'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png',
//     total_views: 4457,
//     total_likes: 223,
//     total_comments: 98,
//   },
// };

const Artists = () =>
  // { artists_list }
  {
    const itemsPerPage = 50;

    const [isRendering, setIsRendering] = useState(true);
    const [artistsList, setArtistsList] = useState([]);
    // const [artistsList, setArtistsList] = useState(data);
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

    const formatArtistValue = (value) => {
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}만`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}천`;
      }
      return value;
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
      }, 3000);
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
          <InputGroup
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxW="400px"
            mb="2.5rem"
          >
            <Input
              placeholder="왁물원 닉네임"
              focusBorderColor="#01BFA2"
              size="md"
              value={nickname}
              onChange={handleSearch}
              // onKeyDown={handleKeyPress}
              backgroundColor={bg3}
              borderRadius="2rem"
              _hover={{
                backgroundColor: bg,
                borderColor: '#01BFA2',
              }}
              _focus={{ backgroundColor: bg }}
            />
            <InputRightElement pointerEvents="none" mr="1rem">
              <FaSearch
                style={{
                  color: '#5C5F6B',
                  position: 'relative',
                  top: '0.1rem',
                  width: '1.2rem',
                  height: '1.2rem',
                }}
              />
            </InputRightElement>
          </InputGroup>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            m="1rem"
            p="1rem"
            w="100%"
            maxW="1024px"
            // h="126px"
            backgroundColor={bg2}
            borderRadius="1rem"
          >
            <Text mb="1rem">
              {filteredArtists.length}명의 작가님들이 있어요.
            </Text>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {viewTypes.map((viewType, index) => (
                <li key={index}>
                  <Button
                    size="md"
                    onClick={() => handleViewSelect(viewType.value)}
                    colorScheme={
                      selectedView === viewType.value ? 'blue' : 'gray'
                    }
                  >
                    {viewType.name}
                  </Button>
                </li>
              ))}
            </ul>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            // m="1rem"
            // p="1rem"
            w="100%"
            maxW="1024px"
            // h="126px"
            backgroundColor={bg2}
            borderRadius="1rem"
          >
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                margin: '1rem 0',
              }}
            >
              {sortTypes.map((sortType, index) => (
                <li key={index}>
                  <Button
                    size="md"
                    onClick={() => handleChangeSortCriteria(sortType.value)}
                    backgroundColor={
                      sortCriteria.field === sortType.value ? highlight : bg3
                    }
                    _hover={{
                      backgroundColor:
                        sortCriteria.field === sortType.value ? highlight : bg3,
                    }}
                  >
                    {sortType.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 -960 960 960"
                      style={{
                        transform:
                          sortCriteria.field === sortType.value &&
                          sortCriteria.order === 'descending'
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                        transition: 'transform 0.1s ease-in-out',
                      }}
                    >
                      <path
                        d="M480-360 280-560h400L480-360Z"
                        fill={color}
                      ></path>
                    </svg>
                  </Button>
                </li>
              ))}
            </ul>
          </Box>

          <Box mb="1rem"></Box>
          <Box
            mt="1rem"
            w="100%"
            maxW="1024px"
            m="0 auto"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            backgroundColor={bg2}
            borderRadius="1rem"
          >
            {/* {filteredArtists.map((artist, index) => (
            <div key={index}>{highlightText(artist.name, searchTerm)}</div>
          ))} */}
            {visibleArtists.map(
              (artist, index) =>
                artist !== '' &&
                !artist.name.includes('탈퇴회원') && (
                  <Link
                    key={index}
                    href={`/artists/${artist.name}`}
                    passHref
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      backgroundColor={bg2}
                      _hover={{
                        backgroundColor: bg3,
                      }}
                      key={index}
                      w="100%"
                      m="0 1rem"
                      p="1rem"
                      mt="1rem"
                      h={['250px', '250px', '126px']}
                      display="flex"
                      flexDirection={['column', 'column', 'row']}
                      alignItems="center"
                      justifyContent="space-between"
                      borderRadius="1rem"
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="2rem"
                      >
                        <Text fontSize="lg" fontWeight="bold">
                          {index <= 100 ? index + 1 : '-'}
                        </Text>
                        <NextImage
                          unoptimized
                          width={100}
                          height={100}
                          style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            width: '6rem',
                            height: '6rem',
                            marginRight: '1rem',
                          }}
                          src={artist.prof_url}
                          alt={artist.name}
                        />
                        <Text fontSize="lg" fontWeight="bold">
                          {artist.name}
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="0.5rem"
                        w="100%"
                      >
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent={['center', 'center', 'flex-end']}
                          w="100%"
                        >
                          {viewTypes.map(
                            (viewType, index3) =>
                              artist[viewType.value] !== 0 && (
                                <Button
                                  key={index3}
                                  colorScheme="blue"
                                  variant={
                                    sortCriteria.field === viewType.value
                                      ? 'solid'
                                      : 'outline'
                                  }
                                  size="sm"
                                  mr="0.5rem"
                                  display="flex"
                                  flexDirection="column"
                                  h="3rem"
                                >
                                  <Text fontSize="sm">{viewType.name}</Text>
                                  <Text fontSize="md">
                                    {' '}
                                    {artist[viewType.value]}
                                  </Text>
                                </Button>
                              )
                          )}
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent={['center', 'center', 'flex-end']}
                          w="100%"
                        >
                          {sortTypes.map(
                            (sortType, index2) =>
                              artist[sortType.value] !== 0 && (
                                <Button
                                  key={index2}
                                  colorScheme="pink"
                                  variant={
                                    sortCriteria.field === sortType.value
                                      ? 'solid'
                                      : 'outline'
                                  }
                                  size="sm"
                                  mr="0.5rem"
                                  display="flex"
                                  flexDirection="row"
                                  // h="3rem"
                                  gap="0.3rem"
                                >
                                  {/* <Text fontSize="sm">{sortType.name}</Text> */}
                                  {sortType.name === '총 작품' && (
                                    <FaSearch
                                      style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                      }}
                                    />
                                  )}
                                  {sortType.name === '총 조회' && (
                                    <FaEye
                                      style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                      }}
                                    />
                                  )}
                                  {sortType.name === '총 댓글' && (
                                    <FaComment
                                      style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                      }}
                                    />
                                  )}
                                  {sortType.name === '총 좋아요' && (
                                    <FaThumbsUp
                                      style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                      }}
                                    />
                                  )}
                                  <Text fontSize="md">
                                    {formatArtistValue(artist[sortType.value])}
                                  </Text>
                                </Button>
                              )
                          )}
                        </Box>
                      </Box>
                    </Button>
                  </Link>
                )
            )}
            {/* Observer를 위한 div */}
            {<Box ref={ref} w="100%" h="2rem"></Box>}
          </Box>
          {!isLastPage && (
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
        {isRendering && (
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
