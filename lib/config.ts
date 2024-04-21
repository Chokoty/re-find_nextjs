import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';

import { GalleryMap } from '@/lib/const';

export const siteConfig = {
  mainDomain: 'https://re-find.xyz',
  verification: {
    google: 'LN-wcIeRNThLBp0YH95yNxBu3WF1vS1oBWma9e4DLxM',
  },
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
    Shuko: {
      title: '리파인드 | 기간한정 슛코☆ 갤러리',
      description: '4월1일 한정 슛코☆팬아트를 모아놓은 갤러리입니다.',
      url: '/gallery/Shuko',
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
    detailed(keyword: string) {
      const decodedNickname = decodeURIComponent(keyword);
      const result = {
        title: `리파인드 | ${decodedNickname} 이벤트`,
        description: `${decodedNickname}에 관한 갤러리를 확인할 수 있습니다.`,
        url: `/events/${decodedNickname}`,
      };
      if (keyword === 'randomGacha') {
        return {
          ...result,
          description:
            '오직 리파인드에서 진행하는 팬아트 랜덤 가챠를 진행해보세요!',
        };
      }
      if (keyword === 'waktyhall') {
        return {
          ...result,
          description:
            '문 뒤에는 고퀄팬아트와 혐잘딱팬아트, 왁두팬아트가 있습니다, 당신의 선택은?',
        };
      }

      return result;
    },
    WaktyHallDoor: {
      title: '리파인드 | 왁티홀의 문',
      description: '3종류의 팬아트 기회는 단 2번 여러분의 선택은!',
      url: '/events/WaktyHallDoor',
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
  artwork(item: ArtworkDetail) {
    const { title, board, img_url, author, id } = item;
    return {
      title,
      description: board,
      imageUrl: img_url ?? `http://via.placeholder.com/236x236`,
      type: 'article' as OpenGraphType,
      authors: !author?.length ? '알 수 없음' : author,
      path: `${this.mainDomain}/artwork/${id}`,
      // publishedTime: item.createdAt,
      // modifiedTime: item.updatedAt,
      // section: item.tags[0] ?? '기타',
    };
  },
};
