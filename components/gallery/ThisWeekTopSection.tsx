'use client';

import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import GalleryCard1 from '@/components/card/GalleryCard1';
import ThisWeekBtnList from '@/components/gallery/ThisWeekBtnList';
// import members from '@/data/members';

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
    comments: 219,
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
    comments: 132,
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
    comments: 27,
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
    comments: 126,
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
    comments: 106,
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
    comments: 106,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447998,
    url: 'https://cafe.naver.com/steamindiegame/15447998',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNDEg/MDAxNzA5OTg0MDIzMzY4.IIgLLKi-hn20zQ8UMLxh_8TVUbIPkZhPwxno6FIUNWcg.ymmb_cJq7UFrn8zdAikNSS35FaJkaElfZdCIEMYiscUg.JPEG/lil3.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNDEg/MDAxNzA5OTg0MDIzMzY4.IIgLLKi-hn20zQ8UMLxh_8TVUbIPkZhPwxno6FIUNWcg.ymmb_cJq7UFrn8zdAikNSS35FaJkaElfZdCIEMYiscUg.JPEG/lil3.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgw/MDAxNzA5OTg0Mzk3NTk5.37pfDAFMBy4MY22WjMIsmAmgllrYe320-MUDqGeYxyMg.SJ942KmykrslffcCypKbgpgIfNRiAp70GHoSZN5JKBUg.JPEG/1.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfODEg/MDAxNzA5OTg0Mzk3NTk4.ARWq-jAnyPSwEgCaU844-NOHZeKzKdLE1RMsN0gUKT8g.eyTuJmidUbYjxS5eUCcA1ALOUPloghkHcczaLfjLNBwg.JPEG/2.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQz/MDAxNzA5OTg0Mzk3NTcx.xAeBySRQuz-R74LLOfBe-8Rs8Tyon0WGwRvRHLBIvJMg.t4rWpf8JDa1j24iMtAgbtV1GRs7x3POkfQJgiYy7-eEg.JPEG/3.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjU5/MDAxNzA5OTg0Mzk4MTAz.umUQnXWYTptqz-KiPX7cY4r37xxAUsmoHI5DfHILxn4g.lgIvlh_hcsip59X_N1bLNEw2ghqWCqz84cDEIg6Sf2Yg.JPEG/lil3.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 종합릴파선물세트',
    author: '리오레오',
    date: '2024.03.09. 20:41',
    view: 1060,
    like: 320,
    comments: 59,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15450550,
    url: 'https://cafe.naver.com/steamindiegame/15450550',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTAz/MDAxNzA5OTkwNDQ2MDcx.eSAe8QMfQq1nRcWAeWJM1g3COR83LS4eokAJUNmiVpwg.LMlUXGVDlFrDwVtkktq25yM2J6cnOkhQ8nXiVrWjxkcg.PNG/%EB%AC%B4%EC%A0%9C1021_20240309221647.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTAz/MDAxNzA5OTkwNDQ2MDcx.eSAe8QMfQq1nRcWAeWJM1g3COR83LS4eokAJUNmiVpwg.LMlUXGVDlFrDwVtkktq25yM2J6cnOkhQ8nXiVrWjxkcg.PNG/%EB%AC%B4%EC%A0%9C1021_20240309221647.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파 생축전...!',
    author: '나래님이에요',
    date: '2024.03.09. 22:21',
    view: 166,
    like: 15,
    comments: 8,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447010,
    url: 'https://cafe.naver.com/steamindiegame/15447010',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjYg/MDAxNzA5OTgzNDE0OTA2.soSTD1FchtIevilBnojySl9CCBz396yjxFDxEB_wFYAg.w51Jqg8gYcuMAzfiyzqrlE-e3Qh-bdm3fVfjnNo-0YQg.JPEG/%EC%83%9D%EC%9D%BC%EC%A1%B0%EA%B3%B55.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjYg/MDAxNzA5OTgzNDE0OTA2.soSTD1FchtIevilBnojySl9CCBz396yjxFDxEB_wFYAg.w51Jqg8gYcuMAzfiyzqrlE-e3Qh-bdm3fVfjnNo-0YQg.JPEG/%EC%83%9D%EC%9D%BC%EC%A1%B0%EA%B3%B55.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파의 생일을 축하합니다',
    author: '리치상',
    date: '2024.03.09. 20:23',
    view: 806,
    like: 275,
    comments: 56,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15448662,
    url: 'https://cafe.naver.com/steamindiegame/15448662',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEg/MDAxNzA5OTg1OTMyNTkw.2NScw0D-JHW6seoRin3Fz_8ZAzUOzPk87TdOdZjdMRYg.MbVJ16203kvkrA0R_z1Xl6W-lCFSCL2TzGUTvCldguIg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC%EC%99%84%EC%84%B11.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEg/MDAxNzA5OTg1OTMyNTkw.2NScw0D-JHW6seoRin3Fz_8ZAzUOzPk87TdOdZjdMRYg.MbVJ16203kvkrA0R_z1Xl6W-lCFSCL2TzGUTvCldguIg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC%EC%99%84%EC%84%B11.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMyAg/MDAxNzA5OTg2MTA2NTE1.GXC7bLD8R-kUZBiSwQGnGSo3OfAjwM6aBLrE8sitYqkg.0gKf_iVALeWTb8aFWcwUDwVXK1T6XycprFUAGsL8rBkg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC%EC%99%84%EC%84%B11.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTIx/MDAxNzA5OTg2MTA2NTEy.CIsqtu4cupTwxXbL7nm60eGbf7xjSp9Mc27GddLNP2wg.2PyCYXKxwVD_o6ARit-EXDgOfcSBZ7Sr3VVR1OqwE9Mg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC%EC%99%84%EC%84%B12.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파님의 생일을 축하드립니다!! 뿌뿌~!!!',
    author: '알감자',
    date: '2024.03.09. 21:09',
    view: 869,
    like: 277,
    comments: 52,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15446866,
    url: 'https://cafe.naver.com/steamindiegame/15446866',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTky/MDAxNzA5OTgyNDU4NzI0.2P_T8tDQkvUcKoOxXmK57Qui6K1nHg6QXQhhIvj7Oewg.JtTHpE2D8EdQDUYCqcAcKslAjtUIXxmfFyo2VFt9ipUg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTky/MDAxNzA5OTgyNDU4NzI0.2P_T8tDQkvUcKoOxXmK57Qui6K1nHg6QXQhhIvj7Oewg.JtTHpE2D8EdQDUYCqcAcKslAjtUIXxmfFyo2VFt9ipUg.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQx/MDAxNzA5OTgyNTc4Njcz.kP3S-8G8SZvVfl4mDlBwVI0EEB6KF-IYe2IDEVzOSKwg.-KaLo-yjBy7LnVKAyBtQjM93NhxXQvatBz4wxGKDOy0g.JPEG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '해피릴파데이!!',
    author: '피엘로',
    date: '2024.03.09. 20:08',
    view: 847,
    like: 272,
    comments: 47,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15434305,
    url: 'https://cafe.naver.com/steamindiegame/15434305',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTE4/MDAxNzA5OTE1NDMxODk3.piOdny8m7ZwEiwK9n5WvZld4koTiMa5ANWpxx94JW6Ag.HrNZm8LB3iuW4cthqOis4ExgY_A_2qMjctHecnRrfNkg.PNG/%EB%AC%B4%EC%A0%9C68_20240309012817.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTE4/MDAxNzA5OTE1NDMxODk3.piOdny8m7ZwEiwK9n5WvZld4koTiMa5ANWpxx94JW6Ag.HrNZm8LB3iuW4cthqOis4ExgY_A_2qMjctHecnRrfNkg.PNG/%EB%AC%B4%EC%A0%9C68_20240309012817.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파님 생일 축하드려요!!!!🎂',
    author: '지나가는 우주먼지',
    date: '2024.03.09. 01:30',
    view: 253,
    like: 69,
    comments: 23,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447945,
    url: 'https://cafe.naver.com/steamindiegame/15447945',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzkg/MDAxNzA5OTg0MzY4NjQ2.m7_C36LrixS7bZhTFLa0viJcmi90XFk08wKvc1pjvZAg.gmHsZNOg9942Ws0zhIhJxy5j80IRRx56hkwyynJEs-Yg.JPEG/%EB%AA%BD%EC%95%8C_A4_%EC%82%90%EB%9A%A4%EC%96%B4%EC%A7%84%EB%A6%B4%ED%8C%8C.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzkg/MDAxNzA5OTg0MzY4NjQ2.m7_C36LrixS7bZhTFLa0viJcmi90XFk08wKvc1pjvZAg.gmHsZNOg9942Ws0zhIhJxy5j80IRRx56hkwyynJEs-Yg.JPEG/%EB%AA%BD%EC%95%8C_A4_%EC%82%90%EB%9A%A4%EC%96%B4%EC%A7%84%EB%A6%B4%ED%8C%8C.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일 축하해요 릴파넴!!',
    author: '몽알',
    date: '2024.03.09. 20:40',
    view: 675,
    like: 245,
    comments: 41,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15448890,
    url: 'https://cafe.naver.com/steamindiegame/15448890',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjg2/MDAxNzA5OTg2NTM3NzE2.wCsX4LNMJ8IZimvON7iYNE_WzajrEjM-KY39keTZw-0g.p7PPCYZr-uJy1Oz5scQmX1J_19n43HXMy7N0vq4xymMg.PNG/%EB%A6%B4%ED%8C%8C%EB%8B%98_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%28%EB%AA%A8%EC%A7%9C%EB%9D%BC%EC%BF%A4%292.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjg2/MDAxNzA5OTg2NTM3NzE2.wCsX4LNMJ8IZimvON7iYNE_WzajrEjM-KY39keTZw-0g.p7PPCYZr-uJy1Oz5scQmX1J_19n43HXMy7N0vq4xymMg.PNG/%EB%A6%B4%ED%8C%8C%EB%8B%98_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8_%28%EB%AA%A8%EC%A7%9C%EB%9D%BC%EC%BF%A4%292.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfOTIg/MDAxNzA5OTg2NTQ1MTMx.mkhg_SabtTdf4JmAck7d7jhU59jRsLHdPpNO5jYe3sAg.AAtq5BIFdnxj3KM1TZdQkxmPJ3sMoCYNd06TqHxkg-gg.JPEG/%EB%A6%B4%ED%8C%8C%EB%8B%98.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTc5/MDAxNzA5OTg2OTAxNjc4.lXBZ7jqmXakBlTlJl0KORu6BlfJfPTkbb0CikryBhOog.D2QnaK7soh8xFKZ0ORq4fG_Lbkc6KSlOXRSfBBF7c3kg.JPEG/flflfa.JPG?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일축하해요! 릴파님!',
    author: '모짜라쿤',
    date: '2024.03.09. 21:17',
    view: 738,
    like: 217,
    comments: 41,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15443669,
    url: 'https://cafe.naver.com/steamindiegame/15443669',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEz/MDAxNzA5OTcyNjAxMzc2.C89XZBsY1-RK5zz-fIVmc5Yc8KsXNkaW2VzGRg4jRL4g.9lttKGSBf5UAHQEAFAm3FWpShsgEEMcchbOjJOcOl2Qg.PNG/%EB%A7%88%EC%84%B8%EB%8F%8C%EC%9D%BC%EC%83%81%ED%8C%8C.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEz/MDAxNzA5OTcyNjAxMzc2.C89XZBsY1-RK5zz-fIVmc5Yc8KsXNkaW2VzGRg4jRL4g.9lttKGSBf5UAHQEAFAm3FWpShsgEEMcchbOjJOcOl2Qg.PNG/%EB%A7%88%EC%84%B8%EB%8F%8C%EC%9D%BC%EC%83%81%ED%8C%8C.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTE4/MDAxNzA5OTcyNjAxMzc4.7y5YNRHfH6XJPkcDkG-Oi7OUW9n3Q7G4mhzmxiPv2bEg.XeXCBjcW9mXVSmeAyeGiY3EaZl8492IurRxl-WHooSwg.PNG/%EC%82%AC%EC%9D%B4%ED%81%B4%ED%8C%8C.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTI4/MDAxNzA5OTcyNjAxMzc4.qBz-92rzR2TpQfjP3uO7i6AXwd0nGBddGUpm2FX4QDwg.8Rx-Ho6hcWgEvw8MRuxQ_E4IOVKAD5w0lBbBQ8tvkv0g.PNG/%EC%9E%AC%EC%A6%88%ED%8C%8C.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTA3/MDAxNzA5OTcyNzc4Njg0.YUJGmKbOpdi1QJQ-XO5yqSRUCxRh3r-CdVU93ezZ08Ug.hD12Ik8tjefc83pidJZQjvQQHtnsCBmihsxjnkPbeKwg.PNG/%EA%B4%B4%EC%9D%B4%ED%8C%8C_%282%29.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfOTMg/MDAxNzA5OTcyNzc4Njgx.OTmlaWPUV1ntoVhkKUpdXgO0QvIueqXQPUszO-jwfFYg.OpgPViy7GeoucgyEy79CEmL-IUci_WY8sUPI0OoeSj4g.PNG/%EB%A6%B4%EC%A4%91%EC%82%AC.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[#릴생축] 릴파님 생일 축하드려요~!!!',
    author: '샅',
    date: '2024.03.09. 17:32',
    view: 719,
    like: 225,
    comments: 35,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15438740,
    url: 'https://cafe.naver.com/steamindiegame/15438740',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEg/MDAxNzA5OTUyNjIwNDY1.mSer0jnXRsiqomjnDMU_Zy5a0dZbFw7ihxEMT3uY9ugg.nZ-4EyXn6HxSUKfDU5gV6zm_34icYmx6eg_YSCEi7l8g.JPEG/20240226_3.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEg/MDAxNzA5OTUyNjIwNDY1.mSer0jnXRsiqomjnDMU_Zy5a0dZbFw7ihxEMT3uY9ugg.nZ-4EyXn6HxSUKfDU5gV6zm_34icYmx6eg_YSCEi7l8g.JPEG/20240226_3.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjc5/MDAxNzA5OTQ1NDk1MDQ5.J4NTJDj9NowEyp2qQsEzuKcXWl2PIcEHOS0HoCrrVd0g.LIo6GG4szvMPbxUpEkckB1hGp62E_0cPS7oyxk4NxLgg.JPEG/20240226_2.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTY3/MDAxNzA5OTQ1NjA2OTc5.doXMuV6FuN4WwB_ESJQjOq1seNVrbjEqNmr-Cx73Ol0g.rV1tP5k-xUIvdw3AD4f_uU3BtYu1SryPka3YMvyslhEg.JPEG/20240226_2.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjA1/MDAxNzA5OTUyMzg2MDMx.5jIczYB1wMH9OrsENSE5yqaPwsr9B_lpYiw9-M7BbrUg.Tj-YCLhCx2LYo1vJWCYX7jIb5g576YjXISlH8leZtz8g.JPEG/p_00_01_%ED%91%9C%EC%A7%80_%EC%99%84.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파님 생일 축하합니다.',
    author: '노이젤',
    date: '2024.03.09. 11:52',
    view: 687,
    like: 188,
    comments: 40,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447521,
    url: 'https://cafe.naver.com/steamindiegame/15447521',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjY3/MDAxNzA5OTgzNjUzMjg2.-ZHhbGLr9AbDdNUKeswre6ushcY6DtVEGIaoHtXqa_Qg.8LrzEIN32__8K4pzPc782wYA3KGD5C7b4XL9ny627Aog.JPEG/20240224_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjY3/MDAxNzA5OTgzNjUzMjg2.-ZHhbGLr9AbDdNUKeswre6ushcY6DtVEGIaoHtXqa_Qg.8LrzEIN32__8K4pzPc782wYA3KGD5C7b4XL9ny627Aog.JPEG/20240224_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTM5/MDAxNzA5OTgzODU3OTkz.K2fyNAoVKxdNNFTzkfTBcyPkoQ3EWXTbPu-9yqEIAQ4g.Byg4yDzIZR4il7QIDV9AjcG9dBA5CV5elvx6-5mThD0g.JPEG/202402_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC1.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfODMg/MDAxNzA5OTgzODU4MDM0.9dPeCpc-LVaCWZYkSabFtExjixgCscWRNdBkveQyTasg.tyovaEi0-QnFMcseg92G-OArLof_uerxhGIWbhYTPFgg.JPEG/202402_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNDUg/MDAxNzA5OTgzODU4MDc4.qGbkKVTZDaote1dnVLlQJ9zOBQb942mdoaW0zXVaFP8g.ATjQl-vPVUKF6zmbz5RmOssyOTb-Zg3T9HrySBdR_04g.JPEG/202402_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BCtjs.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjE2/MDAxNzA5OTgzOTMxNzIx.nVKCESy6sMmE2LTmGfenJQFWOZZ9BXkAbunHybBo83sg.ve3rFwlzakHdnkqdDvDybvqSLSpoydMftMVXDQyx6igg.JPEG/20240224_%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%9D%BC.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파님의 선물 언박싱!',
    author: '전산시스템오류',
    date: '2024.03.09. 20:32',
    view: 516,
    like: 204,
    comments: 38,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15437212,
    url: 'https://cafe.naver.com/steamindiegame/15437212',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTc2/MDAxNzA5OTM3MzM0ODgw.E-HVCm4ULYSkFldGhO554xy4AL3HMGJcPPEZlNAtyOAg.SonchVPk6CfwThq7cIRXsJ8gzQP8Z9mLFM81EeEh4Hsg.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTc2/MDAxNzA5OTM3MzM0ODgw.E-HVCm4ULYSkFldGhO554xy4AL3HMGJcPPEZlNAtyOAg.SonchVPk6CfwThq7cIRXsJ8gzQP8Z9mLFM81EeEh4Hsg.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파님 팬아트!',
    author: '이상한인간',
    date: '2024.03.09. 07:37',
    view: 910,
    like: 184,
    comments: 33,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15446935,
    url: 'https://cafe.naver.com/steamindiegame/15446935',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjcy/MDAxNzA5OTgyNzI0NzY3.goFR2BOUqZ97zx_oK1iZOQFJ19ZIBwy-4cAjoWmYawIg.eJrlATqGjf4dJBzjdCNDKCnjFkzU0lUl8eLr5hGyyFUg.JPEG/%EC%83%9D%EC%9D%BC%EC%A1%B0%EA%B3%B52.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjcy/MDAxNzA5OTgyNzI0NzY3.goFR2BOUqZ97zx_oK1iZOQFJ19ZIBwy-4cAjoWmYawIg.eJrlATqGjf4dJBzjdCNDKCnjFkzU0lUl8eLr5hGyyFUg.JPEG/%EC%83%9D%EC%9D%BC%EC%A1%B0%EA%B3%B52.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] Throne of Nyong-Pa',
    author: 'PoRain',
    date: '2024.03.09. 20:14',
    view: 645,
    like: 172,
    comments: 42,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447968,
    url: 'https://cafe.naver.com/steamindiegame/15447968',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQ2/MDAxNzA5OTg0MTAyMjg2.WaMrZTMJYtKC01n1RKkApzRqqCDC_HAYcm3pLdxvFK8g.jycvc8DGH-K80TQ4JuDMvAhiS91huZ-j4WxfSWy8tjUg.JPEG/%EC%BB%B5%ED%99%80%EB%8D%94_%28%EC%B5%9C%EC%A2%85_%EC%B0%90%29_%EC%B0%90%EC%B0%902.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQ2/MDAxNzA5OTg0MTAyMjg2.WaMrZTMJYtKC01n1RKkApzRqqCDC_HAYcm3pLdxvFK8g.jycvc8DGH-K80TQ4JuDMvAhiS91huZ-j4WxfSWy8tjUg.JPEG/%EC%BB%B5%ED%99%80%EB%8D%94_%28%EC%B5%9C%EC%A2%85_%EC%B0%90%29_%EC%B0%90%EC%B0%902.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTYg/MDAxNzA5OTg0MTI3ODY1.r3UTfudB-b_PlQ1x2M2fGKkjYmx-yzRxtcBbKywa9Tkg.kM7XJOHqaL_h10HPfK4bGZlCStyYfhA5s3yVdiKGoQIg.JPEG/%ED%94%8C%EB%82%98%EB%A7%9D%EA%B3%A0_169_dream.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjYw/MDAxNzA5OTg0NDE2MjQ5.MUkoBnkpY23u7-g39HhLdxcaW0HqXm-EHkOAdkx2fiIg.Txbw6r1G49ZgTsJ-6JDENLKrYetc050tinLc5vHNJlwg.JPEG/%EC%BB%B5%ED%99%80%EB%8D%94_%28%EC%B5%9C%EC%A2%85_%EC%B0%90%29_%EC%B0%90%EC%B0%902.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파님 생일 축하드립니다~',
    author: '뿔린망고',
    date: '2024.03.09. 20:40',
    view: 577,
    like: 185,
    comments: 37,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15431207,
    url: 'https://cafe.naver.com/steamindiegame/15431207',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTk4/MDAxNzA5OTEyMDA3Mzc2.K5pUpsc_ZW59VpRp3N5_yhxNTV8k0jGhORxF_6QF5WIg.wKh1dijPnke3N72Go1-WMUjItxDPBpti8LN42B5gWO4g.GIF/%EB%8C%80%EA%B8%B0%EB%AA%A8%EC%85%98.gif?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTk4/MDAxNzA5OTEyMDA3Mzc2.K5pUpsc_ZW59VpRp3N5_yhxNTV8k0jGhORxF_6QF5WIg.wKh1dijPnke3N72Go1-WMUjItxDPBpti8LN42B5gWO4g.GIF/%EB%8C%80%EA%B8%B0%EB%AA%A8%EC%85%98.gif?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjEx/MDAxNzA5OTExOTkyNjM4.VmtgxtqfmqGtyb9j3TsuOk2N57jq6H55wDj6GDpD_U0g._29S91niXOFL4E-ikaEDZZUuKp7nLubF6IxZqD9LQPsg.PNG/%EB%A6%B4%ED%8C%8C%EC%83%9D%EC%B6%952.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '🖤🖤해피릴파데이🖤🖤',
    author: '커피두유',
    date: '2024.03.09. 00:39',
    view: 575,
    like: 175,
    comments: 39,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15452193,
    url: 'https://cafe.naver.com/steamindiegame/15452193',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQ5/MDAxNzA5OTkzOTI0MDY1.vkiSkngZh0STFANCbCFui6zOXH7o0YYjrKKG46ojL2Ug.D7m1n8YOzP0STvOdoeU7mjuBgnlCRxcjPlo33L3nuBQg.PNG/912_20240309231423.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQ5/MDAxNzA5OTkzOTI0MDY1.vkiSkngZh0STFANCbCFui6zOXH7o0YYjrKKG46ojL2Ug.D7m1n8YOzP0STvOdoeU7mjuBgnlCRxcjPlo33L3nuBQg.PNG/912_20240309231423.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파데이',
    author: '징어서랍',
    date: '2024.03.09. 23:19',
    view: 681,
    like: 191,
    comments: 29,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15448228,
    url: 'https://cafe.naver.com/steamindiegame/15448228',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjYg/MDAxNzA5OTg0NzI3OTYx.HIjkPNXG2m0l9yufm5Hh02xc1ZMwvEc4a4vS0Xm9lzIg.QXXgX8btiD5kXWj-YrAGDZ81rWAGz_FA57nTD4-0mkog.PNG/%EB%A8%B9%EA%B0%95_169_HappyLilpaDay.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjYg/MDAxNzA5OTg0NzI3OTYx.HIjkPNXG2m0l9yufm5Hh02xc1ZMwvEc4a4vS0Xm9lzIg.QXXgX8btiD5kXWj-YrAGDZ81rWAGz_FA57nTD4-0mkog.PNG/%EB%A8%B9%EA%B0%95_169_HappyLilpaDay.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일 축하드립니다!!',
    author: '먹강',
    date: '2024.03.09. 20:49',
    view: 608,
    like: 189,
    comments: 31,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447949,
    url: 'https://cafe.naver.com/steamindiegame/15447949',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgz/MDAxNzA5OTg0MzY3OTY4.wZ-d9OF8OBGNyqqZ4VbfLxmfRq5xI899YrQgC8aP1l4g.ogmBMESJnHO59m45oWHbBuWy5Sf_36BPEkreYAdXXd0g.JPEG/%EB%8B%B7%EC%A7%80%EC%A5%90%EC%A5%90_A4_%EB%A6%B4%ED%8C%8C%EB%84%B4_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgz/MDAxNzA5OTg0MzY3OTY4.wZ-d9OF8OBGNyqqZ4VbfLxmfRq5xI899YrQgC8aP1l4g.ogmBMESJnHO59m45oWHbBuWy5Sf_36BPEkreYAdXXd0g.JPEG/%EB%8B%B7%EC%A7%80%EC%A5%90%EC%A5%90_A4_%EB%A6%B4%ED%8C%8C%EB%84%B4_%EC%83%9D%EC%9D%BC_%ED%8C%AC%EC%95%84%ED%8A%B8.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파넴 생일 축하드려요!!',
    author: '닷지쥐쥐',
    date: '2024.03.09. 20:40',
    view: 540,
    like: 188,
    comments: 32,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447942,
    url: 'https://cafe.naver.com/steamindiegame/15447942',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTk3/MDAxNzA5OTg0MzU2NTI4.LtIW1mVEYSVsCkPFPpYTxXMZX8kTHC6RAGCx28rdLysg.pyhF760JvKxy_VJzKZc-dBTldQJD97FJmzupKTkCnc8g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_3.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTk3/MDAxNzA5OTg0MzU2NTI4.LtIW1mVEYSVsCkPFPpYTxXMZX8kTHC6RAGCx28rdLysg.pyhF760JvKxy_VJzKZc-dBTldQJD97FJmzupKTkCnc8g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC_3.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTQx/MDAxNzA5OTg0MzU3NjE4.2hXBFrzjOSQf6JcxTUlT3wwVWou1HDq_L3JMjHHg41og.pHbBmOYi9CqcJ5mkUJaZb9-0b62dgRDkHBEbKpDCzjUg.PNG/%EB%A6%B4%ED%8C%8C_%EC%B0%A8%EC%84%B8%EB%8F%8C_%ED%95%99%EC%83%9D%EC%A6%9D.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일 축하드립니다🖤',
    author: 'NYEONG',
    date: '2024.03.09. 20:39',
    view: 484,
    like: 176,
    comments: 36,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15443960,
    url: 'https://cafe.naver.com/steamindiegame/15443960',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjQg/MDAxNzA5OTczNDY5NjU3.skGNT4_TrVm51cMdlBo8HkSt9v7jP9SAbE81C6noMRQg.AEMEs39IgWf3d69sw0VtE9sH8m6krygnQeBxBBJeqQwg.PNG/IMG_1269.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjQg/MDAxNzA5OTczNDY5NjU3.skGNT4_TrVm51cMdlBo8HkSt9v7jP9SAbE81C6noMRQg.AEMEs39IgWf3d69sw0VtE9sH8m6krygnQeBxBBJeqQwg.PNG/IMG_1269.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '릴파님 생일 축하합니다~!!',
    author: '데귤모찌',
    date: '2024.03.09. 17:39',
    view: 581,
    like: 178,
    comments: 32,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15448479,
    url: 'https://cafe.naver.com/steamindiegame/15448479',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfOTMg/MDAxNzA5OTg1MTcyMTE0.tXZCozN6kBbUy9179aI4WELNEF2QIaKOPlheFytGT0Ag.8-ZqO84ewa4PUuxQJlpFtzp33isxrLjOp4GorNIFkrcg.JPEG/%ED%82%A4%ED%82%A4%EB%B0%8D%EB%B0%8D%EF%BC%BFA4%EF%BC%BF%EC%83%9D%EC%9D%BC%EC%B6%95%EC%A0%84%EF%BC%88%EA%B8%B0%EB%B3%B8%EF%BC%89.jpg?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfOTMg/MDAxNzA5OTg1MTcyMTE0.tXZCozN6kBbUy9179aI4WELNEF2QIaKOPlheFytGT0Ag.8-ZqO84ewa4PUuxQJlpFtzp33isxrLjOp4GorNIFkrcg.JPEG/%ED%82%A4%ED%82%A4%EB%B0%8D%EB%B0%8D%EF%BC%BFA4%EF%BC%BF%EC%83%9D%EC%9D%BC%EC%B6%95%EC%A0%84%EF%BC%88%EA%B8%B0%EB%B3%B8%EF%BC%89.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjgz/MDAxNzA5OTg1MTcyMTQz.4LO1i3XAIYp2ENEKo51DRneluuD-PY52u884N8c9EiYg.BwsXr7U9iZUOt0FKEmud006Bkmd590AQwZ146b8uip8g.JPEG/%ED%82%A4%ED%82%A4%EB%B0%8D%EB%B0%8D%EF%BC%BFA4%EF%BC%BF%EB%B0%9C%ED%8C%90.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTk1/MDAxNzA5OTg1MTcyMTgw.jEHirqhmOOn0RBSsJLjZZnyXiyybiOEPbchEggr4Q4Ig.UkWOic0yj5GuURbJfcnPf1TrIkNQOGmOcaboLGVCyRwg.JPEG/%ED%82%A4%ED%82%A4%EB%B0%8D%EB%B0%8D%EF%BC%BFA4%EF%BC%BF%EB%B0%9C%ED%8C%90%EF%BC%BF%EB%B0%95%EC%A5%90.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNiAg/MDAxNzA5OTg1NzMwNjQz.ZdM9yNxKqeo9DGzSc3eyaWyKLiG0ldAQ5dzeWcBeqdQg.ufeNhOZrg_01oTJPO6wGWx5nu4DS30H0_LJUbNS-lrcg.JPEG/1709985697295.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일 축하드립니다!!',
    author: '키키밍밍',
    date: '2024.03.09. 21:02',
    view: 507,
    like: 160,
    comments: 38,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15453646,
    url: 'https://cafe.naver.com/steamindiegame/15453646',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjIy/MDAxNzA5OTk1NDA1Njk3.UgAS3-8_MscUr8x37oX1j2KiLBokHAe09kiAs1ydAdAg._uj4TH45a7in8ylGn2-oc_g0wH1haWAFfvJIfYAEXtcg.PNG/Happy_LilpaDay_%28%EA%B8%80%EC%9E%90%EC%82%AD%EC%A0%9C%29.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjIy/MDAxNzA5OTk1NDA1Njk3.UgAS3-8_MscUr8x37oX1j2KiLBokHAe09kiAs1ydAdAg._uj4TH45a7in8ylGn2-oc_g0wH1haWAFfvJIfYAEXtcg.PNG/Happy_LilpaDay_%28%EA%B8%80%EC%9E%90%EC%82%AD%EC%A0%9C%29.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjQ1/MDAxNzA5OTk1NDA1Njk4.scZjOuSgzsV7mNckLNH9LIqckuP9U6dTN0V1TFHcUcgg.Dce7NqNFAosjf2CKotkXT2cqW0Pq6gGy8Cx8xFVglTsg.PNG/Happy_LilpaDay.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjkg/MDAxNzA5OTk1NDA1NzQz.TBdp5azLKelANQ64AIjkIfxIW_HwAjlY5wOxkanMxGUg.kCAq_k1vo_RJ6QM_6X3RVbInpD87FxdUQZ23P2hAtdwg.PNG/%EB%B0%9C%ED%8C%90.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTU3/MDAxNzA5OTk1NjI1OTQ2.i6GdB0JETYgX60uELmYjGyhh_FDVj1DV8-nSmD3wNNYg.QSsCZLpBOV55QMgcLz01MBDgBh8xt52mgYley554jC8g.JPEG/VideoCapture_20240309-234606.jpg?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMTBfMjQx/MDAxNzA5OTk4MTQ0OTg5.dgxg9jI8QNQ-xv1o7Y8qVoCOXBmpl8QILnUneODutRQg.QccMyeQbT1uA3UsiNUQAu9FGgIioTubW4NFI1VQ4Z3Qg.JPEG/%EB%AC%B4%EC%A0%9C-1.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 생일축하합니다!',
    author: '산 비',
    date: '2024.03.09. 23:52',
    view: 583,
    like: 156,
    comments: 34,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15447346,
    url: 'https://cafe.naver.com/steamindiegame/15447346',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjUy/MDAxNzA5OTgzNjMwOTMx.8S-ncVqn4ke6jlNqreUQzjM6YmGZStSPBmgyzP1jMI0g.UWGaziJzkpsH32n04d7uiBXIdsym6slZQRObw6a6RqEg.PNG/%EC%9D%B4%EC%84%B8%ED%8E%98%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%B4%ED%8C%8C%EB%8B%98%EC%83%9D%EC%9D%BC.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjUy/MDAxNzA5OTgzNjMwOTMx.8S-ncVqn4ke6jlNqreUQzjM6YmGZStSPBmgyzP1jMI0g.UWGaziJzkpsH32n04d7uiBXIdsym6slZQRObw6a6RqEg.PNG/%EC%9D%B4%EC%84%B8%ED%8E%98%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%B4%ED%8C%8C%EB%8B%98%EC%83%9D%EC%9D%BC.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfNjEg/MDAxNzA5OTgzNzMyNjcz.13PqUI6W7UiwpOZ_qtV9qYLZKUeDLoO22MSW33te5ecg.GZJWfwVdZr_sOl-0x4yJuwJGHTQ0l0jWAzL6sC7M2Fwg.PNG/%EC%9D%B4%EC%84%B8%ED%8E%98%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%B4%ED%8C%8C%EB%8B%98%EC%83%9D%EC%9D%BCs.png?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '[ONLIL UP!] 릴파데이🖤🖤',
    author: '커피두유',
    date: '2024.03.09. 20:31',
    view: 499,
    like: 163,
    comments: 31,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
  {
    id: 15443259,
    url: 'https://cafe.naver.com/steamindiegame/15443259',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTEy/MDAxNzA5OTcwOTgwOTgw.Qcmf1VkonO7Cj2ZJqaNyjmQyV5huo_NBS2dTo3gA8b4g.E7iJ3iJHpVuHmjlzJAVbEywoeOO9w-vE1FB_2rVQ1vEg.PNG/%EB%AC%B4%EC%A0%9C3191%EF%BC%BF20240309165522.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMTEy/MDAxNzA5OTcwOTgwOTgw.Qcmf1VkonO7Cj2ZJqaNyjmQyV5huo_NBS2dTo3gA8b4g.E7iJ3iJHpVuHmjlzJAVbEywoeOO9w-vE1FB_2rVQ1vEg.PNG/%EB%AC%B4%EC%A0%9C3191%EF%BC%BF20240309165522.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMjUg/MDAxNzA5OTcwOTgwOTM2.ZiCDpr0P2vRlRGDeIUU0ayaryn5VtOjXLxANVNkJxL8g.ivyMcB-jnQ-_Fb9NRyFkp4EqPKh7RA4Jbw6xC7-91DAg.PNG/%EB%AC%B4%EC%A0%9C3191%EF%BC%BF20240309165507.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfOTEg/MDAxNzA5OTcwOTgwNTQ4.t3emitCYkbZbEQEsZsC27DCF2UFALI8AJw_zkBlMRt0g.Bd5LMzIFjBxXYTu-uvIydKmnjJ7zKlD4GRhQu27uOSwg.JPEG/1709970978237.jpg?type=w800',
    ],
    board: '&#127912; 이세돌┃팬아트',
    category: '릴파',
    title: '풍선달고 날아가시는 릴파님',
    author: '키키밍밍',
    date: '2024.03.09. 16:56',
    view: 423,
    like: 144,
    comments: 35,
    is_shukkou: false,
    deleted: false,
    is_hyum: false,
  },
];
export default function ThisWeekTopSection() {
  const [selectedItem, setSelectedItem] = useState('전체');
  const [focusedArtworkId, setFocusedArtworkId] = useState<number | null>(null);

  const handleToggleFocus = (id: number | null) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };

  return (
    <Box mb="2rem">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        // h="80px"
        mb="1rem"
        p="0 0.5rem"
      >
        <Text textAlign="left" fontWeight="bold" fontSize={['xl', 'xl', '2xl']}>
          이 주의 왁물원 인기 팬아트!
        </Text>
      </Box>
      <ThisWeekBtnList
        type="link"
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />

      <Box
        w="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        overflowX="scroll"
      >
        {data.map((artwork, index) => (
          <GalleryCard1
            key={index}
            artwork={artwork}
            isFocused={artwork.id === focusedArtworkId}
            onToggleFocus={handleToggleFocus}
            num={index < 3 ? index + 1 : -1}
          />
        ))}
      </Box>
    </Box>
  );
}
