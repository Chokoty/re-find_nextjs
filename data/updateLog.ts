interface UpdateLog {
  id: number;
  date: string;
  type?: string; // [안내] or ''
  content: string;
  directLink?: string;
}

const updateLog: UpdateLog[] = [
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
    date: '2024.1.7',
    type: '[안내]',
    content: '갤러리 페이지 기능이 추가되었습니다. 특집 팬아트도 확인해보세요!',
  },
  {
    id: 34,
    date: '2024.1.14',
    type: '[점검완료]',
    content:
      '(17:00~20:00)서버 점검중입니다. 일부 기능이 작동하지 않을 수 있습니다.',
  },
  {
    id: 35,
    date: '2024.3.9',
    content: '💜💜💜릴파님 생일 축하드립니다!💜💜💜',
  },
  {
    id: 36,
    date: '2024.3.15',
    type: '[안내]',
    content:
      '검색 기능이 추가되었습니다. 상단바를 이용하여 원하는 팬아트를 찾아보세요.',
    directLink: 'https://cafe.naver.com/steamindiegame/15527371',
  },
  {
    id: 37,
    date: '2024.3.24',
    type: '[안내]',
    content:
      '게시판 업데이트 현황 서비스는 점검 중입니다. 이용에 불편을 드려 죄송합니다.',
  },
];

export default updateLog;
