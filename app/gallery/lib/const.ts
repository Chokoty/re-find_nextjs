import type { Gallery, Member } from '@/types';

// 한 페이지당 불러올 아이템 개수
export const ROWS_PER_PAGE = 30;

export const BUTTON_LIST = [
  '전체',
  '이세돌',
  '고멤',
  '우왁굳',
  '금손 작가들의 방',
];

const GALLERY_LIST: Gallery[] = [
  {
    id: 'halloween',
    type: 'keyword',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 🎃',
    description: 'Trick or Treat! 해피 할로윈',
    author: 'COCOball',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=할로윈',
  },
  {
    id: 'christmas',
    type: 'keyword',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 🎄',
    description: '이세돌과 함께 메리 크리스마스!',
    author: '여비날',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=크리스마스',
  },
  {
    id: 'rewind2year',
    type: 'special',
    title: '이세돌 2주년 팬아트',
    subTitle: ' ❤️‍🔥 이세돌 2주년 ❤️‍🔥',
    description: '이세계아이돌과 함께한 2년간의 추억들',
    author: '코델',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=리와인드&query=rewind&query=re:wind&query=데뷔%202주년',
  },
  {
    id: 'viichanBirthday',
    type: 'special',
    title: '비챤님 생일 팬아트',
    subTitle: '🎂 비챤님 생일 팬아트 🎂',
    description: '비챤님의 탄신일을 진심으로 축하드립니다!',
    author: '뉴단',
    query: 'gallery?member=viichan&since=20240116&until=20240116',
  },
  {
    id: 'lilpaBirthday',
    type: 'special',
    title: '릴파님 생일 팬아트',
    subTitle: '🎂 릴파님 생일 팬아트 🎂',
    description: '릴파님의 탄신일을 진심으로 축하드립니다!',
    author: 'sei9',
    query: 'gallery?member=lilpa&since=20240309&until=20240309',
  },
  {
    id: 'kissingYou',
    type: 'special',
    title: '이세돌 키싱유 팬아트',
    description: '오랜만에 돌아온 이세계아이돌 단체 커버곡 키싱유!',
    subTitle: '🍭 이세돌 키싱유 팬아트 🍭',
    author: 'WAMELL',
    query:
      'artworks?query=kissing&query=키싱&query=키씽&query=뚜뚜뚜&query=뚜두루&query=고마워 사랑해&query=사랑해 한마디&query=너만을 사랑해&case_sensitive=false&board=isd&board=best&title=',
    linkUrl: 'https://www.youtube.com/watch?v=OrFyzG5yTC4',
    linkTitle: 'Kissing You(키싱유) COVER',
  },
  {
    id: 'tiffanyWouldYouMia',
    type: 'special',
    title: 'RE:START',
    description: '오랜 기다림 끝에 돌아온 티파니님을 환영합니다!',
    subTitle: '티파니님의 팬아트',
    author: '참빼미',
    query:
      'artworks?query=티파니&query=우주미아&board=gomem&board=gomem_behind&title=',
    linkUrl: 'https://www.youtube.com/watch?v=cApabFGK8VA',
    linkTitle: '우주미아(Would You M.I.A) MV',
  },
  {
    id: 'newIne',
    type: 'special',
    title: '뉴 아이네',
    description:
      '오리지널 아바타가 공개됨과 동시에 5월 11일 단독 콘서트가 진행되었습니다!',
    subTitle: '뉴 아이네 팬아트',
    author: '핏짜라짜라',
    query:
      'artworks?board=isd&board=best&category=아이네&since=20240427&title=&query=뉴이네&query=아이네&query=콘서트&query=에버퍼플&query=EVER PURPLE&query=아단콘',
  },
  {
    id: 'jururuBirthday',
    type: 'special',
    title: '주르르님 생일 팬아트',
    subTitle: '🎂 주르르님 생일 팬아트 🎂',
    description: '주르르님의 탄신일을 진심으로 축하드립니다!',
    author: '피엘로',
    query:
      'artworks?board=isd&board=best&category=주르르&title=&content=&since=20240609&until=20240611&query=생일&query=생축&query=탄신&query=해피&query=DAY&query=축하&query=탄죠비&query=오메데&query=데이',
  },
  {
    id: 'newnewLilpa',
    type: 'special',
    title: '뉴뉴릴파',
    subTitle: 'NEW NEW 릴파 공개',
    description:
      'LILPACON : Going Out - SOOPER CONCERT | 7월 12일(금) 7월 13일(토) 오후 7시 ',
    author: '낑깡맛',
    query:
      'artworks?board=isd&board=best&category=릴파&since=20240629&title=&content=&query=뉴뉴&query=릴파콘&query=릴단콘&query=콘서트&query=going&query=Going',
  },
  {
    id: 'deadCat',
    type: 'special',
    title: '데드캣',
    subTitle: '고세구님 뉴의상 데드캣',
    description: '고세구님의 신의상 데드캣이 공개되었습니다. #Rollin',
    author: '니렝',
    query:
      'artworks?&board=isd&board=best&category=고세구&since=20240718&title=&content=&query=dead&query=cat&query=데드&query=캣&query=켓&query=강시&query=키랏&query=처음 보냐&query=뉴의상&query=빌런&query=신의상&query=qfr',
  },
  {
    id: 'chanDanCon',
    type: 'special',
    title: '역광',
    subTitle: '챤단콘',
    description:
      'VIICHAN SOLO CONCERT ✦ :: 8월 3일 진행된 비챤님의 첫 단독 온라인 콘서트',
    author: '니렝',
    query:
      'artworks?&board=isd&board=best&category=비챤&since=20240731&title=&content=&query=concert&query=챤단콘&query=역광&query=비챤콘&query=사스가&query=콘서트&query=빛&query=비챠니&query=단콘&query=사랑하긴했었나요&query=플라스틱&query=heart&query=태연&query=맑아라&query=I챤',
    linkUrl: 'https://www.youtube.com/live/Ip1WwW0gwf4',
    linkTitle: '역광 콘서트 보러가기',
  },
  {
    id: 'thousand',
    type: 'special',
    title: '1000일 기념 팬아트',
    subTitle: '이세계 아이돌 1000일!',
    description: '이세계아이돌의 1000일간의 여정, 축하드립니다!',
    author: 'GENTLECAT',
    query: 'artworks?board=thousand',
    linkUrl: 'https://cafe.naver.com/steamindiegame/17543957',
    linkTitle: '카페 공지사항',
  },

  {
    id: 'jingburgerBirthday',
    type: 'special',
    title: '징버거님 생일 팬아트',
    subTitle: '🎂 징버거님 생일 팬아트 🎂',
    description: '징버거님의 탄신일을 진심으로 축하드립니다!',
    author: '지라리',
    query:
      'artworks?board=isd&board=best&category=징버거&title=&content=&since=20241007&until=20241009&query=생일&query=생축&query=탄신&query=해피&query=DAY&query=축하&query=탄죠비&query=오메데&query=데이&query=부가&query=버거',
  },
  {
    id: 'isdPick',
    type: 'special',
    title: '이세돌픽 팬아트',
    subTitle: '이세돌이 고른 팬아트',
    description: '이세계아이돌이 고른 공지사항 팬아트',
    author: '후히이',
    query: 'artworks?board=isd_notice&author&case_sensitive=false&title',
  },
  {
    id: 'halloween',
    type: 'keyword',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 🎃',
    description: 'Trick or Treat! 해피 할로윈',
    author: 'COCOball',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=할로윈',
  },
  {
    id: 'iseLab',
    type: 'special',
    title: '이세랩 팬아트',
    subTitle: '이세랩 팬아트',
    description: '이세랩 달력 10월 일러스트',
    author: '피엘로',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&content=&query=이세랩&query=ISE-Lab&query=데드캣&query=징마담&query=행동대장',
  },
  {
    id: 'christmas',
    type: 'keyword',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 🎄',
    description: '이세돌과 함께 메리 크리스마스!',
    author: '여비날',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=크리스마스',
  },
  {
    id: 'isd3year',
    type: 'special',
    title: '이세돌 3주년 팬아트',
    subTitle: ' ❤️‍🔥 이세돌 3주년 ❤️‍🔥',
    description: '이세돌의 데뷔 3주년을 진심으로 축하합니다!',
    author: '코델',
    query:
      'artworks?board=isd&board=best&board=goldhand&case_sensitive=false&title&query=리와인드&query=rewind&query=re:wind&query=3주년&content=&since=20240826',
  },

  // {
  //   id: 8,
  //   id: 'Shuko',
  //   type: 'special',
  //   title: '기간한정 슛코☆팬아트',
  //   subTitle: '기간한정 슛코☆팬아트', // '😉 응 없어~ 😉',
  //   query: 'wakdu_list?',
  // },
  // {
  //   id: 9,
  //   id: 'AprilFool',
  //   type: 'special',
  //   title: '진짜 만우절 팬아트',
  //   subTitle: '😉 진짜 만우절 팬아트 😉',
  //   query: 'april_fools?',
  //   isHidden: true,
  // },
];

export const UPDATED_GALLERY_LIST: Gallery[] = [
  {
    id: 'bestBoard',
    type: 'board',
    title: '통합 BEST 팬아트 게시판',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=best&case_sensitive=false',
  },
  {
    id: 'goldhandBoard',
    type: 'board',
    title: '금손 작가들의 방',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=goldhand&case_sensitive=false',
  },
  {
    id: 'isdBoard',
    type: 'board',
    title: '이세돌┃팬아트',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=isd&case_sensitive=false',
  },
  {
    id: 'gomemBoard',
    type: 'board',
    title: '고멤┃팬아트',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=gomem&case_sensitive=false',
  },
  {
    id: 'wakgoodBoard',
    type: 'board',
    title: '우왁굳 팬아트',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=wak&case_sensitive=false',
  },
  {
    id: 'unofficialBoard',
    type: 'board',
    title: '왁타버스 불법 배경',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=wallpaper&case_sensitive=false',
  },
  {
    id: 'isdPhoto',
    type: 'board',
    title: '이세돌 사진관',
    subTitle: '',
    description: '',
    author: '',
    query: 'artworks?board=photo&case_sensitive=false',
  },
];

export const MEMBERS: Member[] = [
  {
    id: 1,
    value: 'woowakgood',
    name: '우왁굳',
    author: '우왁굳',
    query: 'gallery?member=woowakgood',
    personalColor: 'green',
    personalColor2: '#93bf85',
    greetings: '스시,샐러드,미소국',
  },
  {
    id: 2,
    value: 'ine',
    name: '아이네',
    author: '아이네',
    query: 'gallery?member=ine',
    personalColor: '#8a2be2',
    personalColor2: '#cc9af2',
    greetings: '음~하이네',
  },
  {
    id: 3,
    value: 'jingburger',
    name: '징버거',
    author: '징버거',
    query: 'gallery?member=jingburger',
    personalColor: '#F7B321',
    personalColor2: '#ffd897',
    greetings: '하이부가',
  },
  {
    id: 4,
    value: 'lilpa',
    name: '릴파',
    author: '릴파 LILPA',
    query: 'gallery?member=lilpa',
    personalColor: '#5E4BD1',
    personalColor2: '#b6a2ea',
    greetings: '리라리라',
  },
  {
    id: 5,
    value: 'jururu',
    name: '주르르',
    author: '주르르',
    query: 'gallery?member=jururu',
    personalColor: '#F44099',
    personalColor2: '#ffa9cb',
    greetings: '콘르르',
  },
  {
    id: 6,
    value: 'gosegu',
    name: '고세구',
    author: '고세구',
    query: 'gallery?member=gosegu',
    personalColor: '#418DF4',
    personalColor2: '#b0c4fb',
    greetings: '하이빵까루',
  },
  {
    id: 7,
    value: 'viichan',
    name: '비챤',
    author: '비챤',
    query: 'gallery?member=viichan',
    personalColor: '#59BE43',
    personalColor2: '#b2dfa1',
    greetings: '하이하이',
  },
  {
    id: 8,
    value: 'gomem',
    name: '고멤/교멤',
    author: '고멤',
    query: 'gallery?member=gomem',
    personalColor: 'green',
    greetings: '왁굳님!!',
  },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

// export const BOARD_MAP: Record<string, string> = {
//   '통합 BEST 팬아트 게시판': 'best',
//   '금손 작가들의 방': 'goldhand',
//   '고멤┃팬아트': 'gomem',
//   '우왁굳 팬아트': 'wak',
//   '이세돌┃작업후기': 'isd_behind',
//   '고멤┃작업 후기': 'gomem_behind',
//   '이세돌 사진관': 'isd',
// };

export const BOARD_MAP: Record<string, string> = UPDATED_GALLERY_LIST.reduce(
  (acc, gallery) => {
    const cleanTitle = gallery.title
      // .replace(' 게시판', '')
      .replace(/&#\d+;/g, '')
      .trim();
    // console.log(cleanTitle, gallery.title);

    // 매핑 객체에 추가
    return {
      ...acc,
      [cleanTitle]: gallery.id,
    };
  },
  {}
);

export const LATEST_GALLERY_LIST = GALLERY_LIST.reverse();

export default GALLERY_LIST;
