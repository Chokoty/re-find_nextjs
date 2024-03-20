import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';

import { GalleryMap } from './const';

export const siteConfig = {
  mainDomain: 'https://re-find.xyz',
  image:
    'https://raw.githubusercontent.com/Chokoty/re-find_nextjs/main/public/android-chrome-192x192.png',
  siteName: '@refind',
  creator: '@waktaverse',
  themeColor: '#000000',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
  },
  type: 'website' as OpenGraphType,
  home: {
    title: '리파인드 | RE:FIND',
    description: '왁타버스의 모든 팬아트를 한 곳에서 확인해보세요!',
    url: '/',
  },
  gallery: {
    main: {
      title: '리파인드 | 팬아트 갤러리',
      description: '왁물원에 올라온 팬아트를 모아놓은 갤러리입니다.',
      url: '/gallery',
    },
    isd: {
      title: '리파인드 | 이세돌 갤러리',
      description: '왁물원에 올라온 이세돌 팬아트를 모아놓은 갤러리입니다.',
      url: '/gallery/isdPick',
    },
    detailed(name: string) {
      const mappedName = GalleryMap[name as keyof typeof GalleryMap] || name;
      return {
        title: `리파인드 | ${mappedName} 갤러리`,
        description: `왁물원에 올라온 ${mappedName} 팬아트를 모아놓은 갤러리입니다.`,
        url: `/gallery/${name}`,
      };
    },
  },
  artists: {
    main: {
      title: '리파인드 | 역대 작가님들',
      description: '왁물원에 올라온 모든 작가님들을 확인해보세요!',
      url: '/artists',
    },
    detailed(nickname: string) {
      const decodedNickname = decodeURIComponent(nickname);
      return {
        title: `리파인드 | ${decodedNickname} 작가님 갤러리`,
        description: `왁물원에 올라온 ${decodedNickname} 작가님의 팬아트를 모아놓은 갤러리입니다.`,
        url: `/artists/${decodedNickname}`,
      };
    },
  },
  events: {
    main: {
      title: '리파인드 | 이벤트',
      description:
        '오직 리파인드에서 진행하는 팬아트 랜덤 가챠를 진행해보세요!',
      url: '/events',
    },
    detailed(name: string) {
      const decodedNickname = decodeURIComponent(name);
      return {
        title: `리파인드 | ${decodedNickname} 이벤트`,
        description: `${decodedNickname}에 관한 갤러리를 확인할 수 있습니다.`,
        url: `/events/${decodedNickname}`,
      };
    },
  },
  more: {
    main: {
      title: '리파인드 | 더보기',
      description: '리파인드의 더 많은 정보를 확인해보세요!',
      url: '/more',
    },
    support: {
      title: '리파인드 | 문의',
      description:
        '리파인드에 대한 문의가 있거나 버그를 발견했다면 제보해주세요.',
      url: '/more/support',
    },
    about: {
      title: '리파인드 | 소개',
      description: '리파인드에 대한 소개를 확인해보세요!',
      url: '/more/about',
    },
    notice: {
      title: '리파인드 | 공지사항',
      description: '리파인드의 공지사항을 확인해보세요!',
      url: '/more/notice',
    },
  },
  search: {
    main: {
      title: '리파인드 | 검색',
      description: '리파인드의 모든 팬아트를 검색해보세요!',
      url: '/search',
    },
    // 추후 업데이트
  },
};
