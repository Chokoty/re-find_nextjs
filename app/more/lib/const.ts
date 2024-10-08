import type { StaticImageData } from 'next/image';

import { NotFoundProfileURL } from '@/lib/const';
import {
  그적미적,
  녹두레기,
  람쥐썬더펀치,
  레루루,
  바게트빵옴뇸뇸,
  아르키메트리스,
  에이요,
  초코넛밀크티,
  카닌,
  카미루,
  팔구,
} from '@/lib/images';

interface UpdateLog {
  id: number;
  date: string;
  type?: string; // [안내] or ''
  content: string;
  directLink?: string;
}

interface Developer {
  group: string;
  nickname: string;
  writerURL: string;
  profURL: string | StaticImageData;
  contribute: string[];
}

export const SOURCE_URL = 'https://cafe.naver.com/steamindiegame/9524252';

export const SUPPORT_INFOS = [
  {
    title: '기타 문의',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf0WGZnnlZahRLoinXe1n0GmPCdryKXEFlPznqyLrsjBKpnZw/viewform',
  },
  {
    title: '버그 제보',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScK_i8O9QnhfZswreRX7VYROWzG3Kte6bVxjf28VSK0Fcu23g/viewform',
  },
];

export const DEVELOPERS: Developer[] = [
  {
    group: 'member',
    nickname: '레루루',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/N8dX1e0GCf7CmHWtLoksOA',
    profURL: 레루루,
    contribute: ['팀장', '검색엔진', '백엔드 개발'],
  },
  {
    group: 'member',
    nickname: '초코넛밀크티',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/fZ8VSlTngMBcoxspZWPPDw',
    profURL: 초코넛밀크티,
    contribute: ['기획', 'UX 디자인', '프론트엔드 개발'],
  },
  {
    group: 'member',
    nickname: '람쥐썬더펀치',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/N27vMPTAxmQvTsmC9DDBvw',
    profURL: 람쥐썬더펀치,
    contribute: ['UX 디자인'],
  },
  {
    group: 'credit',
    nickname: '아이김',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/h_34S-J91nEd_7rculSuyQ',
    profURL: NotFoundProfileURL,
    contribute: ['키워드검색 연구'],
  },
  {
    group: 'member',
    nickname: '카닌',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/ecdtW4j1s3HMWY-28CkPbA',
    profURL: 카닌,
    contribute: ['QA'],
  },
  {
    group: 'member',
    nickname: 'cosmos1122',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/-NxoStVDRfi-5l0gDrwz0Q',
    profURL: NotFoundProfileURL,
    contribute: ['보안'],
  },
  {
    group: 'credit',
    nickname: '89',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/1MItD9uVwQKvZgopAxV4Og',
    profURL: 팔구,
    contribute: ['배너 디자인', '카드 디자인'],
  },
  {
    group: 'credit',
    nickname: '바게트빵 옴뇸뇸',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/NyPZKCn8JER0USsj8xCz5w',
    profURL: 바게트빵옴뇸뇸,
    contribute: ['웰컴키트 굿즈 디자인'],
  },
  {
    group: 'member',
    nickname: '에이요',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/zUv2yd9ckk1pVYViXRZ-tg',
    profURL: 에이요,
    contribute: ['UX 디자인'],
  },
  {
    group: 'member',
    nickname: '그적미적',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/pOPKPO_oxEcNS6b1i73B2g',
    profURL: 그적미적,
    contribute: ['프론트엔드 개발'],
  },
  {
    group: 'member',
    nickname: '카미루',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/QT_1TSjBK6C4WyE4n2k1zA',
    profURL: 카미루,
    contribute: ['UX 디자인', '프론트엔드 개발'],
  },
  {
    group: 'member',
    nickname: '아르키메트리스',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/0toml42cSQFNZFvU0Ex4Kw',
    profURL: 아르키메트리스,
    contribute: ['QA'],
  },
  {
    group: 'member',
    nickname: '청춘은지금이다',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/T8zKwDjv8_CiE3Pvo-FHVw',
    profURL: NotFoundProfileURL,
    contribute: ['백엔드, AI연구'],
  },
  {
    group: 'member',
    nickname: '춘향의 사랑',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/Bb5h-v6AoCGacBz76C7gJg',
    profURL: NotFoundProfileURL,
    contribute: ['AI연구'],
  },
  {
    group: 'credit',
    nickname: '녹두레기',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/2ZB1kx_FI9Qhs-jaAORemw',
    profURL: 녹두레기,
    contribute: ['백엔드'],
  },
  {
    group: 'member',
    nickname: '담다',
    writerURL:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/ILudmLEjWir3qKfErZ5xNg',
    profURL: NotFoundProfileURL,
    contribute: ['백엔드'],
  },
];

export const UPDATE_LOGS: UpdateLog[] = [
  {
    id: 1,
    date: '2023.03.16',
    type: '[안내]',
    content:
      '이제 금손 일러레의 방에 업로드 된 이미지도 검색할 수 있습니다. 비정기적으로 업데이트 됩니다.',
  },
  {
    id: 2,
    date: '2023.03.20',
    type: '[안내]',
    content:
      'AI로 그린 팬아트 검색에 대한 수요가 있는 것 같아서 왁타버스 불법 AI 팬아트도 추가했습니다. 비정기적으로 업데이트 됩니다.',
  },
  {
    id: 3,
    date: '2023.03.24',
    content: '최적화 작업을 진행해서 속도가 약간 더 빨라졌습니다.',
  },
  {
    id: 4,
    date: '2023.04.02',
    content:
      '잘못된 검색 결과가 나오는 경우를 줄였습니다. (3월 24일 이전의 속도로 다시 약간 느려짐)',
  },
  {
    id: 5,
    date: '2023.04.21',
    content:
      '지난번 업데이트 이후로 누락되고 있던 ai 팬아트를 다시 포함시켰습니다.',
  },
  {
    id: 6,
    date: '2023.05.04',
    content:
      '조만간 RE:FIND 리뉴얼 공지 하겠습니다. 많은 이용 부탁드립니다! 킹아!',
  },
  {
    id: 7,
    date: '2023.05.12',
    content: '작가님들 프로필 사진을 추가하였습니다.',
  },
  {
    id: 8,
    date: '2023.05.13',
    content: 'RE:FIND를 리뉴얼 했습니다!!',
    directLink: 'https://cafe.naver.com/steamindiegame/11182337',
  },
  {
    id: 9,
    date: '2023.05.19',
    content:
      '메뉴기능 버그를 수정하였습니다. 이제 다른 페이지로 이동하거나 다른 곳을 누르면 자동으로 닫힙니다.',
  },
  {
    id: 9,
    date: '2023.05.21',
    content:
      '우왁굳 팬아트 게시판이 추가 되었습니다! 왁두 검색이 가능합니다. 아직 작가프로필 오류가 있어 수정중입니다.',
  },
  {
    id: 10,
    date: '2023.05.30',
    content:
      '작가 프로필 오류를 수정하였습니다. 이제 삭제된 게시글의 경우에도 작가님 프로필 정보를 확인할 수 있습니다.',
  },
  {
    id: 11,
    date: '2023.05.30',
    content:
      '서버에 일시적인 문제가 생겨서 일부 이미지가 검색이 되지 않습니다. 최대한 빠르게 복구하겠습니다.',
  },
  {
    id: 12,
    date: '2023.05.30',
    content: '일부 게시판 이미지 검색이 안되는 오류를 해결하였습니다!',
  },
  {
    id: 13,
    date: '2023.06.10',
    content:
      '고멤 팬아트 게시판이 추가 되었습니다! 고멤팬아트도 검색이 가능합니다. 킹아!',
  },
  {
    id: 14,
    date: '2023.06.26',
    content: '멜론 주간 인기상 많이 많이 투표해 주세요!!!',
    directLink: 'https://cafe.naver.com/steamindiegame/11801772',
  },
  {
    id: 15,
    date: '2023.07.03',
    content: '멜론 주간 인기상 투표 최종 2위!!! 킹아!!!',
  },
  {
    id: 16,
    date: '2023.07.03',
    content: '멜론 주간 인기상 음원점수 합산 최종 5위!!!',
  },
  {
    id: 17,
    date: '2023.07.17',
    content:
      '(이세돌 -> 왁타버스) 팬아트 출처찾기로 확장되었습니다(왁굳형, 이세돌, 고멤, 고멤아카데미 팬아트 검색이 가능합니다!!!)',
  },
  {
    id: 18,
    date: '2023.07.21',
    content:
      '서버 오류로 인해 사이트가 일시적으로 접속이 안되는 현상이 있었습니다. 현재는 복구되었습니다.',
  },
  {
    id: 19,
    date: '2023.08.03',
    content:
      '카페 공지사항, 이세돌 작업후기, 고멤 작업후기 게시판에 있는 이미지도 검색이 가능합니다.',
  },
  {
    id: 20,
    date: '2023.08.05',
    content: '팬아트 랜덤 뽑기 기능이 추가되었습니다. 킹애!',
  },
  {
    id: 21,
    date: '2023.08.18',
    content: '팬아트 랜덤 뽑기 게시판 포함/제외 기능을 추가했습니다.',
  },
  {
    id: 22,
    date: '2023.08.18',
    content:
      '최고다 이세돌!!! 이세돌 3집 명전 3관왕 두개재ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ',
  },
  {
    id: 23,
    date: '2023.08.19',
    content: '명전3관왕 킹애ㅐㅐㅐ!!! 스밍 계속 두개재ㅐㅐㅐㅐㅐㅐ',
    directLink: 'https://isegye.live/',
  },
  {
    id: 24,
    date: '2023.09.06',
    content: '왁타버스 컨텐츠를 한 곳에서, 왁스플로러 정식 런칭',
    directLink: 'https://cafe.naver.com/steamindiegame/12764344',
  },
  // {
  //   id: 25,
  //   date: '2023.09.22',
  //   content:
  //     '리파인드 작은 업데이트 - 상단 검색기능 & 작가프로필 페이지가 추가. 이제 작가님들의 팬아트를 한 번에 모아서 볼 수 있습니다. 킹아!',
  // },
  {
    id: 25,
    date: '2023.10.01',
    content:
      '리파인드 작은 업데이트 - 이미지 검색속도를 대폭 개선했습니다. 이제 더 빠른 검색이 가능합니다.킹아.',
  },
  {
    id: 26,
    date: '2023.10.03',
    content:
      '리파인드 속도가 3배 넘게 빨라졌습니다! (점검 및 업데이트 완료 안내)',
    directLink: 'https://cafe.naver.com/steamindiegame/13179793',
  },
  {
    id: 27,
    date: '2023.10.13',
    content:
      '작가프로필 페이지 베타 오픈(검색창에 작가명을 입력하면 작가프로필 페이지로 이동합니다.)',
    directLink: '',
  },
  {
    id: 28,
    date: '2023.10.22',
    type: '[안내]',
    content:
      '작가프로필 페이지가 정식 오픈되었습니다!!! 많은 이용 부탁드립니다. (형은신이야)',
    directLink: 'https://cafe.naver.com/steamindiegame/13410477',
  },
  {
    id: 29,
    date: '2023.11.23',
    content: '공지멜론 MMA 2023 밀리언스 TOP10 에 키딩이 들어갔어요.',
    directLink: 'https://cafe.naver.com/steamindiegame/13776472',
  },
  {
    id: 30,
    date: '2023.12.17',
    content: '이세돌 데뷔 2주년 축하드립니다!!! 이세돌 영원히 뱅온해!!!',
  },
  {
    id: 31,
    date: '2023.12.18',
    type: '[안내]',
    content:
      '사이트 UI가 전체적으로 리뉴얼 되었습니다. 이제 작가 검색페이지가 사용 가능합니다. 키워드 검색 기능, 작품 페이지 기능도 곧 오픈될 예정입니다.',
  },
  {
    id: 32,
    date: '2023.12.28',
    content:
      '2023연말공모전 왁물원 웰컴키트가 왁굳님과 이세돌 분들에게 전달되었습니다. 킹아!',
    directLink: 'https://cafe.naver.com/steamindiegame/14239108',
  },
  {
    id: 33,
    date: '2024.01.07',
    type: '[안내]',
    content: '갤러리 페이지 기능이 추가되었습니다. 특집 팬아트도 확인해보세요!',
  },
  {
    id: 34,
    date: '2024.01.14',
    type: '[점검완료]',
    content:
      '(17:00~20:00)서버 점검중입니다. 일부 기능이 작동하지 않을 수 있습니다.',
  },
  {
    id: 35,
    date: '2024.03.09',
    content: '💜💜💜릴파님 생일 축하드립니다!💜💜💜',
  },
  {
    id: 36,
    date: '2024.03.15',
    type: '[안내]',
    content:
      '검색 기능이 추가되었습니다. 상단바를 이용하여 원하는 팬아트를 찾아보세요.',
    directLink: 'https://cafe.naver.com/steamindiegame/15527371',
  },
  {
    id: 37,
    date: '2024.03.24',
    type: '[안내]',
    content:
      '게시판 업데이트 현황 서비스는 점검 중입니다. 이용에 불편을 드려 죄송합니다.',
  },
  {
    id: 38,
    date: '2024.03.31',
    type: '[점검완료]',
    content: '게시판 업데이트 현황 서비스를 이용하실 수 있습니다.',
  },
  {
    id: 39,
    date: '2024.04.01',
    type: '[안내]',
    content: '만우절 기념 왁티홀의 문을 체험해보고 슛코 팬아트를 공개합니다!',
    directLink: 'https://cafe.naver.com/steamindiegame/15785022',
  },
  {
    id: 40,
    date: '2024.04.01',
    type: '[안내]',
    content:
      '비정상적인 지속적 외부 접근으로 인한 서버 지연 현상이 발생하고 있습니다. 일부 서비스가 응답하지 않을 수도 있습니다.',
  },
  {
    id: 41,
    date: '2024.04.02',
    type: '[안내]',
    content:
      '만우절 이벤트를 마무리하며, 왁티홀의 문이 닫히고 슛코 팬아트가 사라집니다.',
  },
  {
    id: 42,
    date: '2024.04.10',
    type: '[안내]',
    content:
      '갤러리 페이지가 리뉴얼 되었습니다. 더불어 추가된 팬아트 세부 페이지에서 추천 시스템(beta)을 이용할 수 있습니다.',
    directLink: 'https://cafe.naver.com/steamindiegame/15913134',
  },
  {
    id: 43,
    date: '2024.05.11',
    content:
      '뉴이네 갤러리가 추가되었습니다. 갤러리 페이지에서 확인하실 수 있습니다.',
    directLink: 'https://cafe.naver.com/steamindiegame/16370339',
  },
  {
    id: 44,
    date: '2024.06.10',
    content: '💗💗💗주르르님 생일 축하드립니다!💗💗💗',
    directLink: 'https://cafe.naver.com/steamindiegame/16782114',
  },
  {
    id: 45,
    date: '2024.07.01',
    content:
      '뉴뉴릴파 갤러리가 추가되었습니다. 갤러리 페이지에서 확인하실 수 있습니다.',
    directLink: 'https://cafe.naver.com/steamindiegame/17019811',
  },
  {
    id: 46,
    date: '2024.07.21',
    content:
      '데드캣 갤러리가 추가되었습니다. 갤러리 페이지에서 확인하실 수 있습니다.',
    directLink: 'https://cafe.naver.com/steamindiegame/17250034',
  },
  {
    id: 47,
    date: '2024.08.01',
    content: '고세구님 팬아트 태그 월드컵에서 최고의 태그 팬아트를 골라보세요!',
    directLink: 'https://cafe.naver.com/steamindiegame/17401762',
  },
  {
    id: 48,
    date: '2024.08.04',
    content:
      '챤단콘 갤러리가 추가되었습니다. 갤러리 페이지에서 확인하실 수 있습니다.',
    directLink: 'https://cafe.naver.com/steamindiegame/17478408',
  },
  {
    id: 49,
    date: '2024.08.18',
    content:
      '이세돌 1000일 기념 갤러리가 추가되었습니다. 갤러리 페이지에서 확인하실 수 있습니다.',
    // directLink: 'https://cafe.naver.com/steamindiegame/17601975',
  },
  {
    id: 50,
    date: '2024.08.26',
    content: '이세계아이돌 1,000일 기념 🎉 역조공 프로젝트! (With Melon)',
    directLink: 'https://kko.to/yV8hApkIGX',
  },
  {
    id: 51,
    date: '2024.10.08',
    content: '💛💛💛 버거님의 생일을 축하합니다! 💛💛💛',
    directLink:
      'https://re-find.xyz/gallery/jingburgerBirthday?viewType=masonry&sortType=alzaltak',
  },
];
