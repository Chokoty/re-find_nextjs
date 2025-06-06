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
  album: {
    main: {
      title: '리파인드 | 팬아트 갤러리',
      description: '왁물원에 올라온 팬아트를 모아놓은 갤러리입니다.',
      url: '/album',
    },
    Shuko: {
      title: '리파인드 | 기간한정 슛코☆ 갤러리',
      description: '4월1일 한정 슛코☆팬아트를 모아놓은 갤러리입니다.',
      url: '/album/Shuko',
    },
    detailed(name: string) {
      const mappedName = GalleryMap[name as keyof typeof GalleryMap] || name;
      return {
        title: `리파인드 | ${mappedName} 갤러리`,
        description: `왁물원에 올라온 ${mappedName} 팬아트를 모아놓은 갤러리입니다.`,
        url: `/album/${name}`,
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
      if (keyword === 'fanartWorldCup') {
        return {
          ...result,
          description:
            '고세구님 팬아트 태그 월드컵에서 최고의 태그 팬아트를 골라보세요!',
        };
      }

      return result;
    },
    WaktyHallDoor: {
      title: '리파인드 | 왁티홀의 문',
      description: '3종류의 팬아트 기회는 단 2번 여러분의 선택은!',
      url: '/events/WaktyHallDoor',
    },
    goGongJeon: {
      title: '리파인드 | 고공전 팬아트 태그 월드컵',
      description: '세구님 팬아트 중에서 태그 월드컵',
      url: '/events/FanartWorldCup',
      credit: {
        title: '리파인드 | 고공전 팬아트 태그 월드컵 - 크레딧',
        description: '세구님 방송 3주년 진심으로 축하드립니다!',
        url: '/events/FanartWorldCup/credit',
      },
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
    install: {
      title: '리파인드 | 설치 가이드',
      description:
        '홈 화면에서 리파인드 아이콘을 클릭하여 한 번의 탭으로 접속할 수 있는 설치가이드를 확인해보세요.',
      url: '/more/install-info',
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
  recap2024: {
    main: {
      title: '리파인드 | RECAP 2024',
      description: '2024년 한 해 동안 리파인드에서의 팬아트 활동을 돌아보세요!',
      url: '/recap2024',
    },
    detailed(nickname: string) {
      const decodedNickname = decodeURIComponent(nickname);
      return {
        title: `리파인드 | ${decodedNickname}님의 RECAP 2024`,
        description: `${decodedNickname}님의 2024년 리파인드 팬아트 활동 기록을 확인해보세요.`,
        url: `/artists/${decodedNickname}/recap2024`,
      };
    },
  },
  artwork(item: ArtworkDetail) {
    const { title, board, img_url, author, id } = item;
    return {
      title,
      description: board,
      imageUrl: img_url ?? `https://placehold.co/375x375`,
      type: 'article' as OpenGraphType,
      authors: !author?.length ? '알 수 없음' : author,
      path: `${this.mainDomain}/artwork/${id}`,
      // publishedTime: item.createdAt,
      // modifiedTime: item.updatedAt,
      // section: item.tags[0] ?? '기타',
    };
  },
};
