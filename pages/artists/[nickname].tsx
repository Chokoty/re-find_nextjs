import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { useRouter } from 'next/router';
import { Box, useColorModeValue, useToast } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';
import AuthorProfileHead from '@/components/AuthorProfileHead';
import ViewSelectBar from '@/components/ViewSelectBar';
import MasonryView from '../../components/MasonryView';
import SimpleView from '../../components/SimpleView';
// import ListView from '../../components/ListView';
//
import HashLoader from 'react-spinners/HashLoader';
import { useInView } from 'react-intersection-observer';

const data = {
  lastPage: false,
  list: [
    {
      id: 11929191,
      url: 'https://cafe.naver.com/steamindiegame/11929191',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfMiAg/MDAxNjg4NzE3ODE5Njc3.htK9ul9oq3LSnV9HEfVvgOOB328X1tlVrKuKdL_xzHYg.ahPIwfsb_fRiRZ8_zEMSQfxWsZc3X9NwGQzfXGwJwqQg.JPEG/%EB%88%84%EA%B5%AC%EC%84%B8%EC%9A%94.jpeg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfMiAg/MDAxNjg4NzE3ODE5Njc3.htK9ul9oq3LSnV9HEfVvgOOB328X1tlVrKuKdL_xzHYg.ahPIwfsb_fRiRZ8_zEMSQfxWsZc3X9NwGQzfXGwJwqQg.JPEG/%EB%88%84%EA%B5%AC%EC%84%B8%EC%9A%94.jpeg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfMTc3/MDAxNjg4NzE3ODE4NDAw.-T2UDoVtk3nxMLh6ltZMCoZ0ZvnNw_DnhkmezyGgdlgg.mLrJ0MAtJhwNVs99HXBerFUQ7yT2tEfBk1fdKE2aVNsg.JPEG/%EC%84%B8%EA%B5%AC%EB%95%85.._%EB%8F%94_%EA%B3%B5%EC%97%B0_%EC%B6%95%ED%95%98%ED%95%B4....jpeg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfMTI4/MDAxNjg4NzE3ODIwMDgx.MEMc1R__Ker3s4I45ZGGwo-IFPPdC15jcBJt0EqRQwMg.zJ3DKCRa-TkISYeKLmnre86cmnOmYFZpo1-3guBZHREg.JPEG/%ED%97%89%EF%BC%81.jpeg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfMTcw/MDAxNjg4NzE3ODE4OTYz.urUkWUiOYfc-OzUjYMSjt9BG5DMIndPuXlZ95rrraDMg.ueSUmHCkiMdyImuuxjDZQnTqSLZe02iQ59bInmAgKzkg.JPEG/%EC%89%BF_%EB%B9%84%EB%B0%80%EC%9D%B4%EC%95%BC.jpeg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDdfODMg/MDAxNjg4NzE3ODE5NjEy.TfXVy8Jukv_WqeeXSj_1uqZV2NVtBAOoveNRhFvWer4g.30PJzHUjL5WBA1qcze23Har8HbqYFqNahG2PLAb6RNgg.JPEG/%EB%8F%94..%EA%B3%B5%EC%97%B0....jpeg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '똑똑.. 세구땅...',
      date: '2023.07.07. 17:17',
      deleted: false,
      view: 14007,
      like: 2011,
      comment: 310,
    },
    {
      id: 12001542,
      url: 'https://cafe.naver.com/steamindiegame/12001542',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMTk2/MDAxNjg5Mjg3NDEzNDM1.RnZCzWZq6Ic9gKn1xYLBnpLdiF1Ad2L1vBUuZrL9uqkg.CoxzEvY5Dah9DxbNtU3BYacBe05KIdidA4blc1M9f5Eg.PNG/%EB%A6%AC%EB%A7%8C_%EA%B0%80%EC%84%A4.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMTk2/MDAxNjg5Mjg3NDEzNDM1.RnZCzWZq6Ic9gKn1xYLBnpLdiF1Ad2L1vBUuZrL9uqkg.CoxzEvY5Dah9DxbNtU3BYacBe05KIdidA4blc1M9f5Eg.PNG/%EB%A6%AC%EB%A7%8C_%EA%B0%80%EC%84%A4.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMTA0/MDAxNjg5Mjg3NDEyMjM4.3K7EpFRkuMF8bpq3AgvSvn-jqGQ3_jXosLTB55wLEAcg.4KUPZNOfA9mJf6xGqkAGMGYY7stEkYB_fZ7cZ0M24HAg.PNG/%EA%B3%A0%EA%B3%BC%EC%9E%A5.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMzUg/MDAxNjg5Mjg3NDE1NjI5.364jpn8Qg7ThkV6P2WFto8D_-Fp5dJQxhAlvDbPKY88g.si1V1oGF_RKaAwqElVPJhaCO645OhDW3bmJ5_F0EVQAg.PNG/%EC%95%88%EA%B2%BDX_%EB%B0%B0%EA%B2%BDX.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMTAw/MDAxNjg5Mjg3NDE2OTA3.x31dzNW5-b-E49kMVuNOW716zPJ9wyAeuffvB04yaNwg.y20dFvyxgW_bRdq8LrKuB_WR6DAJ09ZmSBMFYagabz4g.PNG/%EB%B0%B0%EA%B2%BDX.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMjA2/MDAxNjg5Mjg3NDExNjc2.yCOiyUIFvkezTwBCQBJUvrZhvLJLnGfBJC-M92dYxl4g.92ZXGbFXKSWycpFtC6ZvNbKutgAV7K-nxZYsFEztmWcg.PNG/%EC%8D%B8%EB%84%AC.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '그... 고과장 님?',
      date: '2023.07.14. 07:30',
      deleted: false,
      view: 15618,
      like: 1955,
      comment: 315,
    },
    {
      id: 12572956,
      url: 'https://cafe.naver.com/steamindiegame/12572956',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMzkg/MDAxNjkyODI0ODE5MDk4.Mh9KKwmIUezI47YXPXUusIM9mZlBVbmt8PF9uoy15Vsg.7FKl5or2qahEZ8LlKEstlVgymbJdyIdZfFoSZTQnyB4g.PNG/KIDDING.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMzkg/MDAxNjkyODI0ODE5MDk4.Mh9KKwmIUezI47YXPXUusIM9mZlBVbmt8PF9uoy15Vsg.7FKl5or2qahEZ8LlKEstlVgymbJdyIdZfFoSZTQnyB4g.PNG/KIDDING.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMTUz/MDAxNjkyODI0ODIyODk5.4p0P8Kf-SOaLADgob-3DWqR-X_ta1_kyYrf1fVV1oXAg.IwKVP2TX5OUF3bWVQzw3T7ylH9V0KAwuwHxGLOUzcS0g.PNG/kidding.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjcy/MDAxNjkyODI0ODI2MDkx.9y3hzswVP-VgkRBwFmmK5RrJ0lHBt5v9ZZn2fp7c7h8g._Nkf_4DBtJg2or_99wLCfkv9JA3QHqWNp2yB1c3Jgqkg.PNG/%EB%A9%9C%EB%A1%A0_6%EC%9C%84_%EC%95%84%EC%9D%B4%EB%8F%8C.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '멜론 6위 아이돌',
      date: '2023.08.21. 17:59',
      deleted: false,
      view: 11161,
      like: 1647,
      comment: 227,
    },
    {
      id: 11518537,
      url: 'https://cafe.naver.com/steamindiegame/11518537',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTRfMjE0/MDAxNjg2Njk0MDM0ODY3.g53jaywlVx48t3UpwdQY5umWnmMaENiAZPZ-6k5GINog.gTS6BsoHU-tI1Rsez2vOwr3-w4YUoXkeJZksJVEN7Vwg.PNG/%EB%A9%94%EC%9D%B4%EB%93%9C_%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTRfMjE0/MDAxNjg2Njk0MDM0ODY3.g53jaywlVx48t3UpwdQY5umWnmMaENiAZPZ-6k5GINog.gTS6BsoHU-tI1Rsez2vOwr3-w4YUoXkeJZksJVEN7Vwg.PNG/%EB%A9%94%EC%9D%B4%EB%93%9C_%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTRfMjE1/MDAxNjg2Njk0MDM0MzQ1.oXyKa3SXNvNZp5U71kAObbz5sjyX6sLbNl8c4OnkrDsg.55DKrtvr54MTIaAzhvH10HaBvyHABDXlAk-dIsNBTJEg.JPEG/1686694029123.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '오므라이스상~',
      date: '2023.06.09. 16:14',
      deleted: false,
      view: 10443,
      like: 1545,
      comment: 260,
    },
    {
      id: 12393790,
      url: 'https://cafe.naver.com/steamindiegame/12393790',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjUg/MDAxNjkyODI0OTA1OTM0.hXNFTykPkWEywkhzbnC3nR_HH36iw6cZCgPKeOCfnJkg.e-f2KjoG0LYD_7ToMGoR2lkDhDfIJDPClAsA7UR1n30g.PNG/%EC%88%98%EC%98%81%EB%B3%B5.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjUg/MDAxNjkyODI0OTA1OTM0.hXNFTykPkWEywkhzbnC3nR_HH36iw6cZCgPKeOCfnJkg.e-f2KjoG0LYD_7ToMGoR2lkDhDfIJDPClAsA7UR1n30g.PNG/%EC%88%98%EC%98%81%EB%B3%B5.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfOTUg/MDAxNjkyODI0OTA1NzMz.XonnSWluNp8LSu-AGOoTSVL4HqqKjvQs_lzmfKRZ1oUg.pNWWoJ9AsKRpUDiIwT4cIOlfvaFTVq0tBVIcfwMPPuQg.PNG/%EC%88%98%EC%98%81%EB%B3%B5_%EB%B0%B0%EA%B2%BDX.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '수영복',
      date: '2023.08.11. 02:38',
      deleted: false,
      view: 11140,
      like: 1532,
      comment: 247,
    },
    {
      id: 12638024,
      url: 'https://cafe.naver.com/steamindiegame/12638024',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjdfMTcw/MDAxNjkzMTE4MzE5Nzkw.d_dPMMJb5n9EGkqcF70uEp7iu3FrsXZ3_zrYSPgHmwYg.JA0OkZAolsOq8w-D9P5mvnzTDSc4Tq-HZLqbWBvFUBEg.PNG/%ED%8C%8C%EC%9E%90%EB%A7%88_%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjdfMTcw/MDAxNjkzMTE4MzE5Nzkw.d_dPMMJb5n9EGkqcF70uEp7iu3FrsXZ3_zrYSPgHmwYg.JA0OkZAolsOq8w-D9P5mvnzTDSc4Tq-HZLqbWBvFUBEg.PNG/%ED%8C%8C%EC%9E%90%EB%A7%88_%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjdfMjIg/MDAxNjkzMTE4Mzk2MTg0.t0OcieV-tmiJ6F8PVG8H_3jiS5tT52b6jX0uLyA3yCEg.vCBehZb14cXu2JRjoGjWgSUXUhwQxKozRZdwuCsE904g.JPEG/1693118393832.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '세구 다키마쿠라',
      date: '2023.08.26. 20:05',
      deleted: false,
      view: 12384,
      like: 1438,
      comment: 298,
    },
    {
      id: 12272277,
      url: 'https://cafe.naver.com/steamindiegame/12272277',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDFfNjAg/MDAxNjkwODc4Mzg2NDg2.fCO5HaRgFbee1K_4_fU8d5GWNm36Gqjv3LxKjD7qry8g.x6176L56UlWL64S8tBJN0fF2K6I0gB0uHq4PA8jC--cg.PNG/%EC%96%B4%EB%82%98%EB%8D%94%EC%9B%94%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDFfNjAg/MDAxNjkwODc4Mzg2NDg2.fCO5HaRgFbee1K_4_fU8d5GWNm36Gqjv3LxKjD7qry8g.x6176L56UlWL64S8tBJN0fF2K6I0gB0uHq4PA8jC--cg.PNG/%EC%96%B4%EB%82%98%EB%8D%94%EC%9B%94%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDFfOTQg/MDAxNjkwODc2NDI3NTAw.Lq0I_6hoMksScklsMLm1CfT8U4dvkhc8mh4JLsjGqfkg.WjSrlXO485Zjedr3IFUS1pLWHpnhXC78B9pYjgzSSskg.JPEG/%EB%B0%B0%EA%B2%BDX.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDFfODEg/MDAxNjkwODc2NDI3NTA4.ux_YCNwT2ObJmxwFzdiarQGMUwm27NcTPRlIcH1hEsAg._dUL0O70LnflHCksUTQPdlUc25YJM-QDtqxM-A_tjR4g.PNG/%EB%8C%80%EA%B8%B0%EC%8B%A4.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDFfNjcg/MDAxNjkwODc2NDI3NTkw.DlSkB4CdmXE546uFTiLgx2TJkPeBZ7HZVBhahFTN3yYg.h67YLfWoryoshNwkkwJYwZAgQELNyJ0OUJ9Pi4FdI-Ag.PNG/%EC%8D%B8%EB%84%AC.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '어나더 월구~ 어나더 구~',
      date: '2023.08.01. 16:53',
      deleted: false,
      view: 8331,
      like: 1353,
      comment: 221,
    },
    {
      id: 12607038,
      url: 'https://cafe.naver.com/steamindiegame/12607038',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjkz/MDAxNjkyODI0NzExNDcx.htVprx-TynXCKT_on_3VK8wXjWmHco6ECMWJpK5SS-Yg.6CEWCHHGNOaCYU3ni-NBvMLZJJbDFIxOSlz5JcDL83og.PNG/%EC%97%B0%EC%8A%B5%EC%8B%A4_%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjkz/MDAxNjkyODI0NzExNDcx.htVprx-TynXCKT_on_3VK8wXjWmHco6ECMWJpK5SS-Yg.6CEWCHHGNOaCYU3ni-NBvMLZJJbDFIxOSlz5JcDL83og.PNG/%EC%97%B0%EC%8A%B5%EC%8B%A4_%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjc5/MDAxNjkyODI0NzEzNDc2.cBUtHtZWK9LWvhvoj9jvzabNs1rheBQ_y8wAjSjpPocg.BOFErdDhpBJfrdvndL7GLUE-KGdbqN8S_lXfKq9H_nAg.PNG/%ED%92%8D%EC%84%A0%EC%9D%B4%EC%84%B8%EB%8F%8C.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMjg0/MDAxNjkyODI0NzE0NTEy.UkgUXRBlhwQ6PoWMr5ZiLLkaV7izy7BhfEhvtqyxxpgg.tqzWeykhVL1Slyvei0APVMWYE3MOH361KYRQECtI_hog.PNG/%EC%95%88%EB%AC%B4%EC%97%B0%EC%8A%B5_%EC%84%B8%EA%B5%AC.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '키딩~',
      date: '2023.08.24. 05:00',
      deleted: false,
      view: 8982,
      like: 1334,
      comment: 205,
    },
    {
      id: 12468134,
      url: 'https://cafe.naver.com/steamindiegame/12468134',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMTE1/MDAxNjkyODI0ODY2NzY0.KS6ejOwq-p7DiTbB3jruK0KbnzGG3sdz-04CE8tWUQkg.f_lrPDrFy3ax6B8Ns35mkkM57aSrGDwjXR5Fho_0L-kg.PNG/%ED%8F%AC%EC%9E%A5%EB%A7%88%EC%B0%A8.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MjRfMTE1/MDAxNjkyODI0ODY2NzY0.KS6ejOwq-p7DiTbB3jruK0KbnzGG3sdz-04CE8tWUQkg.f_lrPDrFy3ax6B8Ns35mkkM57aSrGDwjXR5Fho_0L-kg.PNG/%ED%8F%AC%EC%9E%A5%EB%A7%88%EC%B0%A8.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTdfMTI4/MDAxNjkyMjU4NDI1MDUz.CDEG84fw7DQblBKC6JMak5_ADhL5gTwWREwoaleA8xog.68QDoPUm4ChMpl3rt4CiMIsvcrScBQ4twLFbNcFGpYEg.PNG/%EC%88%A0%EB%A7%9B_%EC%A2%8B%EB%8B%A4.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '이파리 너 술 잘마셔?',
      date: '2023.08.17. 16:47',
      deleted: false,
      view: 10922,
      like: 1318,
      comment: 247,
    },
    {
      id: 12700503,
      url: 'https://cafe.naver.com/steamindiegame/12700503',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MzFfMTcg/MDAxNjkzNDY2NjAwMTYz.yMhn2xbbNjE06lpcs6rtu8OGgVE09Nui7kK6EdAWYbYg.Kbnz9ezo0SnGFZEMXLF_IAxCbCUewXeVsmo_jtuGLbwg.PNG/%EB%94%B0%EB%B4%89%ED%9E%99%ED%95%A9%EC%9E%BC%EB%AF%BC%EC%8A%88%EB%B6%95%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MzFfMTcg/MDAxNjkzNDY2NjAwMTYz.yMhn2xbbNjE06lpcs6rtu8OGgVE09Nui7kK6EdAWYbYg.Kbnz9ezo0SnGFZEMXLF_IAxCbCUewXeVsmo_jtuGLbwg.PNG/%EB%94%B0%EB%B4%89%ED%9E%99%ED%95%A9%EC%9E%BC%EB%AF%BC%EC%8A%88%EB%B6%95%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MzFfNDUg/MDAxNjkzNDY2NTE5MTgz.b89OEH_XMhAV9rEO6iVWps-uSPjtNFFo3rUoJpaezGcg.MfLWaKdqm9dsTdwwTjt18_PXmf9hkBCdawym15drbAMg.PNG/%EB%94%B0%EB%B4%89%ED%9E%99%EC%84%B8%EA%B5%AC.png?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '따봉👍',
      date: '2023.08.31. 16:20',
      deleted: false,
      view: 6676,
      like: 1277,
      comment: 216,
    },
    {
      id: 11479714,
      url: 'https://cafe.naver.com/steamindiegame/11479714',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNTMg/MDAxNjg2MDMzMDE5NDU0.J1OZP51k01Ro4il1UD3IVYpPIRg1xcU9jdlzT1WYtCcg.1qNNIf2amIaaRxtsaS78mXkFvyackm3ScPJ-tiqX-9Ig.PNG/%EB%8D%A4%EB%B2%BC%EB%9D%BC_%EA%B7%A0%EB%83%A5%EC%95%84%2C_%EC%99%80%EB%9D%BC_%EC%84%B8%EA%B7%A0...png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNTMg/MDAxNjg2MDMzMDE5NDU0.J1OZP51k01Ro4il1UD3IVYpPIRg1xcU9jdlzT1WYtCcg.1qNNIf2amIaaRxtsaS78mXkFvyackm3ScPJ-tiqX-9Ig.PNG/%EB%8D%A4%EB%B2%BC%EB%9D%BC_%EA%B7%A0%EB%83%A5%EC%95%84%2C_%EC%99%80%EB%9D%BC_%EC%84%B8%EA%B7%A0...png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNzYg/MDAxNjg2MDMzMDE5NTYw.l6NhySLIosMRRmLWwtwqNqan1ZYC6tBkYhKeUvDeiFwg.AM0SkN--5xFLtijGKjloksnl2Sk6KgQ_QbCYNfkxP0Yg.PNG/%EB%82%B4_%EB%A8%B8%EB%A6%AC%EC%97%90%EC%84%9C_%EB%AD%90%ED%95%B4.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '세균들도 복싱',
      date: '2023.06.06. 15:30',
      deleted: false,
      view: 6423,
      like: 1175,
      comment: 208,
    },
    {
      id: 11848944,
      url: 'https://cafe.naver.com/steamindiegame/11848944',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTBfMTY4/MDAxNjg4OTIxOTczMTQy.1ypAOokT4Sa0N8c8C_zPumwHQQFe4M2gxa8JvxF5nsMg.0JMeSWJC7ppSEGz1O5j3_WYAM0iyZXCp-D_yXB8OVC8g.PNG/%EC%88%98%EC%98%81%EB%B3%B5_%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTBfMTY4/MDAxNjg4OTIxOTczMTQy.1ypAOokT4Sa0N8c8C_zPumwHQQFe4M2gxa8JvxF5nsMg.0JMeSWJC7ppSEGz1O5j3_WYAM0iyZXCp-D_yXB8OVC8g.PNG/%EC%88%98%EC%98%81%EB%B3%B5_%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfMTU4/MDAxNjg4MTE4Mjk4MzQ0.TXATTz4N5dOt_UniwtPjJP3Y69qRuvAUNBlpxB1Vxssg.6Z1gaSOhllb05ZxG26-t16AkwNI9Ifjd-rffVkNjabgg.PNG/%ED%92%8D%EC%84%A0%EC%9E%88%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfNzkg/MDAxNjg4MTE4Mjk4Mzc5.cm-RukT66JySr9n9J4TIThY30O9IsVrYW_2CLVHMlz4g.Nf8p2e3OEOAPKf7JruTkzTDnK3d5bUfEYYcR_j_8gngg.PNG/%ED%92%8D%EC%84%A0%EC%97%86%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTBfMTE4/MDAxNjg4OTIxOTczMTEx.UE5HkUw6wSQ_sCCYqPrvjM2yF-B7LbV6dcRBoQqwDC8g.wUR79EGPrw6jSITx-ID2hvFUqf101B_3DKFWh1GL94cg.JPEG/1688921965661.jpg?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '여름이었다.',
      date: '2023.06.30. 16:21',
      deleted: false,
      view: 6653,
      like: 1115,
      comment: 211,
    },
    {
      id: 12296429,
      url: 'https://cafe.naver.com/steamindiegame/12296429',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDZfMTA0/MDAxNjkxMzAyODY5ODM1.L4jP7JhCPbVbNvbbQrDXONLCtfzA0HBiZuv0bdzlXbAg.jfto9LqJMuqOppWduFmRVlCh-ArxGZNKLunPijn1RYQg.PNG/%EC%84%9D%EC%96%91%EC%9D%B4_%EC%A7%84%EA%B5%AC....png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDZfMTA0/MDAxNjkxMzAyODY5ODM1.L4jP7JhCPbVbNvbbQrDXONLCtfzA0HBiZuv0bdzlXbAg.jfto9LqJMuqOppWduFmRVlCh-ArxGZNKLunPijn1RYQg.PNG/%EC%84%9D%EC%96%91%EC%9D%B4_%EC%A7%84%EA%B5%AC....png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '세구와 여름나기',
      date: '2023.08.03. 16:24',
      deleted: false,
      view: 5478,
      like: 1047,
      comment: 204,
    },
    {
      id: 12774405,
      url: 'https://cafe.naver.com/steamindiegame/12774405',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDdfMjI5/MDAxNjk0MDM3NDY5NzI1.reJh2RVgeohR_XPbOu5qJEKxlrp8Gh6n-VsQxaMb_RAg.D0mSjR0odEdeUHLE3fNqHrT7tPAPupygmFeRULKj0zsg.PNG/%EC%8A%88%ED%8D%BC%EC%83%A4%EC%9D%B4_%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDdfMjI5/MDAxNjk0MDM3NDY5NzI1.reJh2RVgeohR_XPbOu5qJEKxlrp8Gh6n-VsQxaMb_RAg.D0mSjR0odEdeUHLE3fNqHrT7tPAPupygmFeRULKj0zsg.PNG/%EC%8A%88%ED%8D%BC%EC%83%A4%EC%9D%B4_%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDdfMjYy/MDAxNjk0MDM3NDcyMjkz.NUtM531XqH_iB_WK8b2FzUl6AVsP9Vn7s8xwnoWsBvMg.Mh0kwdQTcG6PzDzFDbLTUssA__YItAksXrJo96LctAcg.PNG/%EC%8A%A2%EC%83%A4%EA%B5%AC_%EA%B8%80%EC%94%A8X.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDdfMjM1/MDAxNjk0MDM3NDczNTky.Rkqwygvn-2fYMvEGqKcTObLJnGhXyfVQbgCaL0oe3Xwg.72CzkvUQaK9tl2mIux-4QYJrtAxc3-06ROxnhZaWaOsg.PNG/%EC%8A%A2%EC%83%A4%EA%B5%AC_%EB%B0%B0%EA%B2%BDX.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDdfMjk0/MDAxNjk0MDI2Mjg3Njg3.NxAgq6Q76f9Gqw6HMSLb9QcnXUoaIBs823X2COzJ52og.EP7Es0pmPO5p5GXvsNyzht9NSBVQmGbdG7qWh5FnUfgg.GIF/%EC%A1%B0%EC%95%84%EC%9A%94.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '슈퍼샤잉',
      date: '2023.09.07. 03:29',
      deleted: false,
      view: 4567,
      like: 1037,
      comment: 174,
    },
    {
      id: 12206552,
      url: 'https://cafe.naver.com/steamindiegame/12206552',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjdfMjQx/MDAxNjkwMzk0NDE3NjY0.IlL9QhfNk3y3OmtiQwEC47tJdVt_KO7ORFnbdRrxbCcg.LJX7DqPt3aLlDdf9RHwc8uZH_4KJ03Coh75KcXIoWOsg.PNG/Happy_2ND_Anniversary.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjdfMjQx/MDAxNjkwMzk0NDE3NjY0.IlL9QhfNk3y3OmtiQwEC47tJdVt_KO7ORFnbdRrxbCcg.LJX7DqPt3aLlDdf9RHwc8uZH_4KJ03Coh75KcXIoWOsg.PNG/Happy_2ND_Anniversary.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjdfMTI4/MDAxNjkwMzk0NDE1NjYx.v9M9q_y93sfXGRMO-XhXfBkqUW9XEgRVoW-8YQXRsXUg.vCp5zhee4A-HcOODLMx7LCUgzcAiXbjNAdgf6LHSA-Qg.PNG/2%EC%A3%BC%EB%85%84_%EC%B6%94%EC%B9%B4%EB%BD%95%EC%B9%B4%EB%BF%A1%EC%B9%B4.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '💙💙💙🎉세구일🎉💙💙💙',
      date: '2023.07.27. 03:00',
      deleted: false,
      view: 4254,
      like: 1029,
      comment: 176,
    },
  ],
};

const Artist = ({
  artist_name2info,
  // artist_artworks_data
}) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(artist_name2info); //useState(null);
  const [artworks, setArtworks] = useState(data.list);
  // const [artworks, setArtworks] = useState([]); // useState(artist_artworks_data?.list);

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [init, setInit] = useState(true);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('like'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  let [loadingData, setLoadingData] = useState(false);
  let [loadingImage, setLoadingImage] = useState(true);
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);

  const toast = useToast();

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    if (menuText === sortType) return;
    setSortType(menuText);
    // 다시 불러오기
    setPage(1);
    setIsLastPage(false);
    setArtworks([]);
  }, []);

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 이미지 로딩
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const getArtistInfo = useCallback(async () => {
    try {
      const response = await axios
        // .get('/api/artistInfo', {
        //   params: {
        //     nickname: nickname,
        //   },
        // })
        .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
        .then((res) => res.data);
      setProfile(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setProfile(nickname);
      // 404 페이지로 이동
      router.push('/404');
    }
  }, [nickname]);

  const getArtistArtworks = useCallback(async () => {
    console.log('getArtistArtworks');
    if (isLastPage) return;
    if (loadingData) return;

    setLoadingData(true);
    console.log('artworks loading...');

    try {
      const response = await axios
        .get(
          `https://re-find.reruru.com/author_artworks?name=${nickname}&type=${sortType}&page=${page}`
        )
        .then((res) => res.data);

      console.log(response.lastPage);
      console.log(response.list);
      if (response.lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 1) setArtworks([...response.list]);
      else setArtworks([...artworks, ...response.list]);
    } catch (error) {
      // 500에러 예외처리
      console.log(error.response);
      if (error.response?.status === 500) {
        toast({
          title:
            '현재 작가 프로필 쪽 서버가 점검중 입니다. 잠시 후 다시 시도해주세요.',
          description: '500 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, [sortType, page, nickname]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log('page: ', page);
    getArtistArtworks();
    // 2초뒤 1번 더 호출
    // setTimeout(() => {
    //   // setPage((prevState) => prevState + 1);
    //   getArtistArtworks();
    // }, 1500);
  }, [sortType, page]);

  useEffect(() => {
    // if (init) return;
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  useEffect(() => {
    if (nickname) {
      console.log(nickname);
      // getArtistInfo();
      getArtistArtworks();
      // setInit(false); // 초기 렌더링 완료
    }
  }, [nickname]);

  return (
    <Box>
      <Head>
        <title>{`${profile?.author_nickname} - RE:FIND`}</title>
        {/* <title>{`${nickname} - RE:FIND`}</title> */}
        <meta
          property="og:title"
          content={profile?.author_nickname + '- Profile | RE:FIND '}
        />
        <meta
          property="og:description"
          content="리파인드 - 왁타버스 이세계아이돌 팬아트 출처 찾기"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={profile?.author_prof_url} />
        <meta
          property="og:url"
          content={`https://re-find.xyz/artists/${profile?.author_nickname}`}
        />
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        mb="2rem"
      >
        <AuthorProfileHead nickname={nickname} profile={profile} />
        <ViewSelectBar
          // artworks={artworks}
          activeView={activeView}
          onViewChange={handleViewChange}
          selectedMenu={sortType}
          onMenuItemClick={handleMenuItemClick}
          isDeletedVisible={isDeletedVisible}
          handleShowDeleted={handleShowDeleted}
        />
        {!artworks && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        )}
        {artworks && (
          <>
            {/* {loadingImage && (
              <Box position="relative">
                <Box
                  w="100vw"
                  h="100vh"
                  // position="absolute"
                  position="fixed"
                  display="flex"
                  top={0}
                  left={0}
                  justifyContent="center"
                  alignItems="center"
                  zIndex={160}
                >
                  <HashLoader color="#01BFA2" />
                </Box>
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top={0}
                  right={0}
                  backgroundColor={bgColor}
                  zIndex={150} // 다른 컴포넌트 위에 표시되도록 z-index 설정
                ></Box>
              </Box>
            )} */}
            {/* {artworks?.length === 0 && (
              <Center>
                <Text>아직 업로드한 작품이 없네요!</Text>
              </Center>
            )} */}
            {artworks?.length !== 0 && (
              <Box
                w="100%"
                overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
              >
                {activeView === 'masonryView' && (
                  <MasonryView
                    artworks={artworks}
                    isDeletedVisible={isDeletedVisible}
                    // loadingImage={loadingImage}
                    handleLoading={handleLoading}
                  />
                )}
                {activeView === 'gridView' && (
                  <SimpleView
                    artworks={artworks}
                    isDeletedVisible={isDeletedVisible}
                    handleLoading={handleLoading}
                  />
                )}
                {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
                {/* Observer를 위한 div */}
                {<Box ref={ref} w="100%" h="2rem"></Box>}
              </Box>
            )}
          </>
        )}
        {loadingData && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <HashLoader color="#01BFA2" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Artist;

export async function getServerSideProps(context) {
  const { nickname } = context.query;

  try {
    const artist_name2info = await axios
      .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
      .then((res) => res.data);

    return {
      props: {
        artist_name2info: artist_name2info,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
