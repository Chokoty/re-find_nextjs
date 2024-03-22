'use client';

import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

import ThisWeekBtnList from '@/components/gallery/ThisWeekBtnList';

import GallerySlider from './GallerySlider';

const data = [
  {
    id: 15438532,
    url: 'https://cafe.naver.com/steamindiegame/15438532',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjIy/MDAxNzA5OTUxMjQ5NzQy.PZcTgqOD3ShHgkDpsD2LSWAabfQHf6KVb1iILUuiOKwg.3E8C7FlT1D6_5bCFu2YSz4j_nKdghtxZ8sWIomb0wPUg.PNG/llllliaa.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjIy/MDAxNzA5OTUxMjQ5NzQy.PZcTgqOD3ShHgkDpsD2LSWAabfQHf6KVb1iILUuiOKwg.3E8C7FlT1D6_5bCFu2YSz4j_nKdghtxZ8sWIomb0wPUg.PNG/llllliaa.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '해피 릴파데이 ~!!',
    author: 'sei9',
    date: '2024.03.09. 11:29',
    view: 7470,
    like: 1156,
    comment: 219,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15449023,
    url: 'https://cafe.naver.com/steamindiegame/15449023',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNzEg/MDAxNzA5OTg2NzgwODk2.7ikmZeKB-Fk_vej5_4dsoQjbZ4NawijXP5HIjBgB7uYg.eXWY9FmceIJwvLp_09QXMcvBKSrp_IeRBxz4STy9XH4g.JPEG/0225_%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%EC%A0%84%EC%8B%9C%EA%B4%802.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNzEg/MDAxNzA5OTg2NzgwODk2.7ikmZeKB-Fk_vej5_4dsoQjbZ4NawijXP5HIjBgB7uYg.eXWY9FmceIJwvLp_09QXMcvBKSrp_IeRBxz4STy9XH4g.JPEG/0225_%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%EC%A0%84%EC%8B%9C%EA%B4%802.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTc3/MDAxNzA5OTg2Nzk5MDM5.EcszZgGgDp_Ew8RnrWjMbTgJHRYP72Rc06Ew64q2z8wg.8JIghL0VShzD2oDl-xt33WEPyOcVpR2C2Tak3U3IR5cg.JPEG/0214_%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%EC%A0%84%EC%8B%9C%EA%B4%80_%EB%B0%9C%ED%8C%901.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjUg/MDAxNzA5OTg2Nzk5MDM0.PLF8tEheNooffuCNCs83yuyLfV9pwGDqkMHbT3g0Fpog.TgtB5kUWakgZJ3nTsACMhTchywlc3SRVCHOuDgcGJ28g.JPEG/0214_%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%EC%A0%84%EC%8B%9C%EA%B4%80_%EB%B0%9C%ED%8C%902.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '추억이 만들어지는 순간',
    author: '유꾜꾜',
    date: '2024.03.09. 21:21',
    view: 6050,
    like: 780,
    comment: 132,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447701,
    url: 'https://cafe.naver.com/steamindiegame/15447701',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjUg/MDAxNzA5OTg0MDcwOTA0.nlyZw7pP0-7JbXy2Wks1TYoRkM7U-JcfpXePHB34Xecg.2OO4oAUTDLuWSij60dSmkeDvZRqcI4yhI4dGJwYITjUg.PNG/2024%EC%83%9D%EC%9D%BC.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjUg/MDAxNzA5OTg0MDcwOTA0.nlyZw7pP0-7JbXy2Wks1TYoRkM7U-JcfpXePHB34Xecg.2OO4oAUTDLuWSij60dSmkeDvZRqcI4yhI4dGJwYITjUg.PNG/2024%EC%83%9D%EC%9D%BC.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjc4/MDAxNzA5OTg0MDgyODM3.uvxvr8Y4-FkqoRR1Oq5pxFKawUmzVZql_meRj5g6VCIg.C6BNaZPB8BeIPu4YYwmGB2pZ20wXM0nsEWK9KJrkmkkg.JPEG/%EC%96%91%EB%91%90%EB%82%98_A4_%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%A7%88%EC%84%B8%EB%8F%8C_%EB%A6%B4%ED%8C%8C.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파님 생일 축하해요!',
    author: '양두나',
    date: '2024.03.09. 20:36',
    view: 368,
    like: 132,
    comment: 27,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15429946,
    url: 'https://cafe.naver.com/steamindiegame/15429946',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjQg/MDAxNzA5OTEwMTM2ODA0.T1HjTwCdE5EKPVQaA_8Q3wY3fKJSXOCZRE7wB2_POnUg.X6FWHiLEb-NzsTtK21aqdsCiLgIGH7s5DqMZmu0PM0Ag.JPEG/IMG_1961.jpeg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjQg/MDAxNzA5OTEwMTM2ODA0.T1HjTwCdE5EKPVQaA_8Q3wY3fKJSXOCZRE7wB2_POnUg.X6FWHiLEb-NzsTtK21aqdsCiLgIGH7s5DqMZmu0PM0Ag.JPEG/IMG_1961.jpeg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgx/MDAxNzA5OTEwMTM2ODEw.rAml5ydObeiYkDW90xZ9sXzp6yzDdOI2AYSYdosVng8g.oLenlX-PqgEmCFfVzHsEyrhKEL_IbgNa8f1bHZlDvwAg.JPEG/IMG_1959.jpeg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNDMg/MDAxNzA5OTEwMTM2ODQ4.eY5cSnO1fWTTZeJmaUFVPisZ_bKJhuOZh27TSpRnbxIg.Z56GX7vtNTUvZzRCtbs_scvbOVmFdp6BIB76UDWSKi8g.JPEG/IMG_1960.jpeg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파넴 생일 팬아트🎉🎉',
    author: '펭찌부',
    date: '2024.03.09. 00:08',
    view: 2408,
    like: 661,
    comment: 126,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15443459,
    url: 'https://cafe.naver.com/steamindiegame/15443459',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgz/MDAxNzA5OTcwODQ5OTQ2.rEyMzK4aYyZmAMdg8U02BR1YnPqs8ogDII68K3xPxTsg.2maFeXyOcio67DQ94jsG-L9HD4AMXvyl9-nP9DQyrWMg.PNG/%EC%83%9D%EC%9D%BC.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgz/MDAxNzA5OTcwODQ5OTQ2.rEyMzK4aYyZmAMdg8U02BR1YnPqs8ogDII68K3xPxTsg.2maFeXyOcio67DQ94jsG-L9HD4AMXvyl9-nP9DQyrWMg.PNG/%EC%83%9D%EC%9D%BC.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTg4/MDAxNzA5OTcxOTI0NTg5.xx29cBFtZ_uyWJ19xug8gqAGODTForRNOpmequEvx1cg.9gfIilHp5AZq-5IWcxyictNf0jc--rOkoe9URutrI2gg.PNG/39.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[#릴생축] 생일 축하드립니다!!',
    author: '뉴단',
    date: '2024.03.09. 17:11',
    view: 2517,
    like: 644,
    comment: 106,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15429713,
    url: 'https://cafe.naver.com/steamindiegame/15429713',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '(경)해피 릴파데이(축)',
    author: '만치치',
    date: '2024.03.09. 00:04',
    view: 2128,
    like: 620,
    comment: 106,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
];
export default function ThisWeekTopSection() {
  const [selectedItem, setSelectedItem] = useState('전체');

  return (
    <Box w="100%" mb="2rem" display="flex" flexDir="column">
      <Box
        padding="0 2rem"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        // h="80px"
        mb="1rem"
      >
        <Text textAlign="left" fontWeight="bold" fontSize={['xl', 'xl', '2xl']}>
          이 주의 왁물원 인기 팬아트!
        </Text>
      </Box>
      <ThisWeekBtnList
        // type="link"
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />
      <GallerySlider dataList={data} />
    </Box>
  );
}
