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
      id: 10608385,
      url: 'https://cafe.naver.com/steamindiegame/10608385',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDNfMTEy/MDAxNjgwNDQ4NzMzNzUx.rWxFL4rJuQP5kMw00P-0lOLlHwdK_He4nlssVCBMCocg.V4EkXQGyQRXXrlSdE4dBlhgslGehZBgZjJwAGavDVVQg.GIF/%EC%95%84%EA%B8%B0%EB%8B%AC%EB%9E%98%EB%8A%94-%EC%9A%B0%EC%99%81%EA%B5%B3.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDNfMTEy/MDAxNjgwNDQ4NzMzNzUx.rWxFL4rJuQP5kMw00P-0lOLlHwdK_He4nlssVCBMCocg.V4EkXQGyQRXXrlSdE4dBlhgslGehZBgZjJwAGavDVVQg.GIF/%EC%95%84%EA%B8%B0%EB%8B%AC%EB%9E%98%EB%8A%94-%EC%9A%B0%EC%99%81%EA%B5%B3.gif?type=w800',
      ],
      board: '우왁굳 팬아트',
      category: '팬아트',
      title: '(gif) 아기 달래는 우왁굳',
      date: '2023.04.03. 00:19',
      deleted: false,
      view: 9868,
      like: 1368,
      comment: 226,
    },
    {
      id: 12042594,
      url: 'https://cafe.naver.com/steamindiegame/12042594',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTZfMTYx/MDAxNjg5NDk4ODEwMDQ5.fe7r6AgHJZ36cDUtjCFDD4WUutn-czT-KqxXjDj6qZYg.EjksmR0hLAXJRwn5_pU1wppZkW7moF9zsoOXZoOQXTAg.GIF/%EB%A6%B4%ED%8C%8C-%EC%97%89%EB%8D%A9%EC%9D%B4-%EB%95%8C%EB%A6%AC%EB%8A%94-%EC%95%84%EC%9D%B4%EB%84%A4.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTZfMTYx/MDAxNjg5NDk4ODEwMDQ5.fe7r6AgHJZ36cDUtjCFDD4WUutn-czT-KqxXjDj6qZYg.EjksmR0hLAXJRwn5_pU1wppZkW7moF9zsoOXZoOQXTAg.GIF/%EB%A6%B4%ED%8C%8C-%EC%97%89%EB%8D%A9%EC%9D%B4-%EB%95%8C%EB%A6%AC%EB%8A%94-%EC%95%84%EC%9D%B4%EB%84%A4.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '2인 이상',
      title: '(gif) 찰싹찰싹',
      date: '2023.07.16. 18:13',
      deleted: false,
      view: 9741,
      like: 1189,
      comment: 250,
    },
    {
      id: 11639321,
      url: 'https://cafe.naver.com/steamindiegame/11639321',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTdfMTY2/MDAxNjg3MDA3MTAyNTMz.pfeOzDQpMm8o2KOgIaFsNZIO9ejSBAMm14hQYucx20kg.2D_CIvxcOfGCskKCt3nM9-3qF0kzYJuvrTTwcppFtX8g.GIF/%EC%A7%84%ED%9D%AC-never-gonna-give-u-up.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTdfMTY2/MDAxNjg3MDA3MTAyNTMz.pfeOzDQpMm8o2KOgIaFsNZIO9ejSBAMm14hQYucx20kg.2D_CIvxcOfGCskKCt3nM9-3qF0kzYJuvrTTwcppFtX8g.GIF/%EC%A7%84%ED%9D%AC-never-gonna-give-u-up.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTdfODIg/MDAxNjg3MDA3NDg2NzAx.7ivgNl5bvXWteWORfuI0cGxCG4YgciRC_W-lF91ocWsg.dWGbWwMldtEq1Pw8TgfqIEFcxrqJYmJZYK78-FezoCEg.PNG/image.png?type=w800',
      ],
      board: '고멤┃팬아트',
      category: '아카데미 팬아트',
      title: '(gif) 시리안 핫써머 춤',
      date: '2023.06.17. 22:13',
      deleted: false,
      view: 15687,
      like: 1183,
      comment: 316,
    },
    {
      id: 10653091,
      url: 'https://cafe.naver.com/steamindiegame/10653091',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDZfMjc5/MDAxNjgwNzIxOTI2MDAz.qW8ae6zabZ7vtIhlLSkPqy0jFCbwSla5qT7cpiEAT04g.fBKJgTe5g-Zmcotr7dLsoH3HhdqMluzeD_R510dPhowg.GIF/%EB%A5%B4%EB%A5%B4%EB%95%85-%EA%B8%B0%EB%B6%84%EC%A2%8B%EC%95%99.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDZfMjc5/MDAxNjgwNzIxOTI2MDAz.qW8ae6zabZ7vtIhlLSkPqy0jFCbwSla5qT7cpiEAT04g.fBKJgTe5g-Zmcotr7dLsoH3HhdqMluzeD_R510dPhowg.GIF/%EB%A5%B4%EB%A5%B4%EB%95%85-%EA%B8%B0%EB%B6%84%EC%A2%8B%EC%95%99.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '주르르',
      title: '(gif) 르르땅 기분좋앙',
      date: '2023.04.06. 04:12',
      deleted: false,
      view: 8601,
      like: 1093,
      comment: 176,
    },
    {
      id: 10239559,
      url: 'https://cafe.naver.com/steamindiegame/10239559',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMTJfMTU4/MDAxNjc4NjEyMDczMTgx.PPaxjA44hIoAOcOQdnu3lbVub1Agl5gt1izoDYx2y6sg.D4t5dxVBU2PmqlcR-2EcT99a1YlvtX9ns23rjVpc-4Qg.GIF/%EB%A8%B8%EB%A6%AC%EC%93%B0%EB%8B%A4%EB%93%AC%EB%B0%9B%EB%8A%94-%EC%B1%A0%EB%8B%88.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMTJfMTU4/MDAxNjc4NjEyMDczMTgx.PPaxjA44hIoAOcOQdnu3lbVub1Agl5gt1izoDYx2y6sg.D4t5dxVBU2PmqlcR-2EcT99a1YlvtX9ns23rjVpc-4Qg.GIF/%EB%A8%B8%EB%A6%AC%EC%93%B0%EB%8B%A4%EB%93%AC%EB%B0%9B%EB%8A%94-%EC%B1%A0%EB%8B%88.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '비챤',
      title: '(gif) 머리쓰다듬받는챠니',
      date: '2023.03.12. 18:08',
      deleted: false,
      view: 7490,
      like: 1068,
      comment: 253,
    },
    {
      id: 11123551,
      url: 'https://cafe.naver.com/steamindiegame/11123551',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MDhfOTYg/MDAxNjgzNTUzOTI4NDY5.N7Ohf17ySh-hD9Z8EEn8F3nRRxhhklcQrFVQAAjtjZUg.c9YcSrwRH0jLpzSs-DIZrryE_0NkuV_LNA21U0NhgEQg.GIF/%ED%98%B8%EC%87%BC%EB%A7%88%EB%A6%B0%EB%B3%B4%EB%8A%94-%EC%84%B8%EA%B5%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MDhfOTYg/MDAxNjgzNTUzOTI4NDY5.N7Ohf17ySh-hD9Z8EEn8F3nRRxhhklcQrFVQAAjtjZUg.c9YcSrwRH0jLpzSs-DIZrryE_0NkuV_LNA21U0NhgEQg.GIF/%ED%98%B8%EC%87%BC%EB%A7%88%EB%A6%B0%EB%B3%B4%EB%8A%94-%EC%84%B8%EA%B5%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 좋아하는 버튜버에게 도네쏘는 세규땅',
      date: '2023.05.08. 22:52',
      deleted: false,
      view: 8059,
      like: 1063,
      comment: 214,
    },
    {
      id: 10600086,
      url: 'https://cafe.naver.com/steamindiegame/10600086',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfMTQ3/MDAxNjgwNDIxMzk2NjE2.h7gD97HvUoSP_nuo08KPg2fDnATYhgPhAqMFSu68QVEg.DFoctgd_m0W_DUMBcEFs82Dvm-awwFarSOiXZFQ1Z-cg.GIF/%EC%9D%B4%EC%84%B8%EB%8F%8C-f6.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfMTQ3/MDAxNjgwNDIxMzk2NjE2.h7gD97HvUoSP_nuo08KPg2fDnATYhgPhAqMFSu68QVEg.DFoctgd_m0W_DUMBcEFs82Dvm-awwFarSOiXZFQ1Z-cg.GIF/%EC%9D%B4%EC%84%B8%EB%8F%8C-f6.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '2인 이상',
      title: '(gif) 이세계 f6',
      date: '2023.04.02. 16:45',
      deleted: false,
      view: 6373,
      like: 1034,
      comment: 185,
    },
    {
      id: 12115539,
      url: 'https://cafe.naver.com/steamindiegame/12115539',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjFfMTcy/MDAxNjg5OTA0Mjc5Mjgy.LZTaW8NrOLgSP6Gt8nJCJ9Uip3r6rct2sAG_RfLqLMog.XsVGuDMINW4dZ_wSV0HCUl7WJ9sw3Ir24Z2x3TbSsa8g.GIF/%EC%84%B8%EA%B5%AC-%ED%95%98%EC%9D%B4.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjFfMTcy/MDAxNjg5OTA0Mjc5Mjgy.LZTaW8NrOLgSP6Gt8nJCJ9Uip3r6rct2sAG_RfLqLMog.XsVGuDMINW4dZ_wSV0HCUl7WJ9sw3Ir24Z2x3TbSsa8g.GIF/%EC%84%B8%EA%B5%AC-%ED%95%98%EC%9D%B4.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjFfNzkg/MDAxNjg5OTA0Mjg0MjU0.CLwKSEnKhmszHjkwEWWea3iT92z7Q2F1s31m1s5UZAMg.ZOTPWqL159ErgTtMr-YuLAyhKYp49KtHyWA-U-cnPuUg.GIF/%EC%84%B8%EA%B5%AC-%EC%9E%98%EC%9E%90.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 세구하이와 잘자',
      date: '2023.07.21. 10:52',
      deleted: false,
      view: 8487,
      like: 1022,
      comment: 183,
    },
    {
      id: 12374754,
      url: 'https://cafe.naver.com/steamindiegame/12374754',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDlfMjYz/MDAxNjkxNTkwNzU4MjUx.t70MTemcq08QaS0s3o23vYsDYdcQDWObUCCKOXgo64sg.USU19oW0jfrqRFSX6Ndwy4CE7QzNdbHtTuQH_VD50bQg.GIF/%EC%83%81%EC%96%B4%EA%B5%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDlfMjYz/MDAxNjkxNTkwNzU4MjUx.t70MTemcq08QaS0s3o23vYsDYdcQDWObUCCKOXgo64sg.USU19oW0jfrqRFSX6Ndwy4CE7QzNdbHtTuQH_VD50bQg.GIF/%EC%83%81%EC%96%B4%EA%B5%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 상어구',
      date: '2023.08.09. 23:19',
      deleted: false,
      view: 7017,
      like: 1020,
      comment: 204,
    },
    {
      id: 10224328,
      url: 'https://cafe.naver.com/steamindiegame/10224328',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMTFfNjIg/MDAxNjc4NTMzMTM0MzM4.4LcDtxBR8-lLL_-Z9gURBrVuQcrXc8VKAVJ9ZfIHQUQg.WHeZLp_vwtaqmbbjW930LdeC3WGayUE5Y9aCVvqs4f4g.GIF/%EC%A3%BC%ED%8F%AD%EB%8F%84-%EB%95%8C%EB%A6%AC%EB%8A%94-%EB%A5%B4%EB%A5%B4%EB%95%85.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMTFfNjIg/MDAxNjc4NTMzMTM0MzM4.4LcDtxBR8-lLL_-Z9gURBrVuQcrXc8VKAVJ9ZfIHQUQg.WHeZLp_vwtaqmbbjW930LdeC3WGayUE5Y9aCVvqs4f4g.GIF/%EC%A3%BC%ED%8F%AD%EB%8F%84-%EB%95%8C%EB%A6%AC%EB%8A%94-%EB%A5%B4%EB%A5%B4%EB%95%85.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMTFfMTY3/MDAxNjc4NTMzMTM0Mjc1.AKZLMSCHfp9XfpmYqu7nAIpQTxPcp5WRco0cmCTMC34g.L0_XJ812LqTNhiHr9Q8xDcwhZAjHVIpnynejH1lVhLgg.GIF/%EB%A5%B4%EB%A5%B4%EB%95%85%EC%97%90%EA%B2%8C%EB%A7%9E%EB%8A%94-%EC%A3%BC%ED%8F%AD%EB%8F%84.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '주르르',
      title: '(gif) 뒤졋 뒤졋',
      date: '2023.03.11. 20:12',
      deleted: false,
      view: 7463,
      like: 1014,
      comment: 224,
    },
    {
      id: 12762058,
      url: 'https://cafe.naver.com/steamindiegame/12762058',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDVfNjAg/MDAxNjkzOTE1ODQyNzQ3.J1nqQzKInPDohU9mkdU-SHC8nhYJ9XlUB3geAVNGgYQg.rkh9gdy3zJgvxlN1S2XHbDyA4KA29T34aBC2X6oDyyMg.GIF/%EC%84%B8%EA%B5%AC-%EC%8A%88%ED%8D%BC%EC%82%AC%EC%9D%B4.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDVfNjAg/MDAxNjkzOTE1ODQyNzQ3.J1nqQzKInPDohU9mkdU-SHC8nhYJ9XlUB3geAVNGgYQg.rkh9gdy3zJgvxlN1S2XHbDyA4KA29T34aBC2X6oDyyMg.GIF/%EC%84%B8%EA%B5%AC-%EC%8A%88%ED%8D%BC%EC%82%AC%EC%9D%B4.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 슈퍼샤이세규',
      date: '2023.09.05. 21:10',
      deleted: false,
      view: 6131,
      like: 1012,
      comment: 232,
    },
    {
      id: 9965957,
      url: 'https://cafe.naver.com/steamindiegame/9965957',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMjNfMjU5/MDAxNjc3MTE0NzYyMTQx.41fKTkbazkoJRUbeOxvWwWY0BmAa3Z3NseD4SXEW6kQg.cn7DpYf-ydqWzEAGyAX_EDgp_LBnGh-NBCj6G_U9yqgg.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMjNfMjU5/MDAxNjc3MTE0NzYyMTQx.41fKTkbazkoJRUbeOxvWwWY0BmAa3Z3NseD4SXEW6kQg.cn7DpYf-ydqWzEAGyAX_EDgp_LBnGh-NBCj6G_U9yqgg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '고세구와 눈나구',
      date: '2023.02.23. 10:13',
      deleted: false,
      view: 7137,
      like: 960,
      comment: 171,
    },
    {
      id: 9740232,
      url: 'https://cafe.naver.com/steamindiegame/9740232',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDlfMTE4/MDAxNjc1ODkwODA0NzA0.hRXRReNqUTP8pk25IC6Ad2OaIaKs6GH7uMgRKFz9U3Mg.RVSgsb8gRo5upoOsadjB1JLt7yztsu5T_EGd9S11f4Ig.GIF/%EB%91%A0%EC%B9%AB%EC%84%B8%EA%B5%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDlfMTE4/MDAxNjc1ODkwODA0NzA0.hRXRReNqUTP8pk25IC6Ad2OaIaKs6GH7uMgRKFz9U3Mg.RVSgsb8gRo5upoOsadjB1JLt7yztsu5T_EGd9S11f4Ig.GIF/%EB%91%A0%EC%B9%AB%EC%84%B8%EA%B5%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 둠칫구',
      date: '2023.02.09. 06:11',
      deleted: false,
      view: 8574,
      like: 943,
      comment: 183,
    },
    {
      id: 12304447,
      url: 'https://cafe.naver.com/steamindiegame/12304447',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDRfMTk4/MDAxNjkxMTA1MDEzMzY0.G7UDh3JIekNkksnK9pfp7aISV7N_DBwBRNZ03X3Eg1cg.LSNgIR9GQv1pjypIqjaH95rBaAWO60Vh1A32_bMst4og.GIF/%EC%97%AC%EC%9A%B0%EB%A5%BC-%EC%B6%A4%EC%B6%94%EA%B2%8C%ED%95%98%EB%8A%94-%EB%A5%B4%EB%A5%B4%EB%95%85.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDRfMTk4/MDAxNjkxMTA1MDEzMzY0.G7UDh3JIekNkksnK9pfp7aISV7N_DBwBRNZ03X3Eg1cg.LSNgIR9GQv1pjypIqjaH95rBaAWO60Vh1A32_bMst4og.GIF/%EC%97%AC%EC%9A%B0%EB%A5%BC-%EC%B6%A4%EC%B6%94%EA%B2%8C%ED%95%98%EB%8A%94-%EB%A5%B4%EB%A5%B4%EB%95%85.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '주르르',
      title: '(gif) 폭도를 춤추게 만드는 르르땅',
      date: '2023.08.04. 08:23',
      deleted: false,
      view: 6256,
      like: 937,
      comment: 154,
    },
    {
      id: 11213515,
      url: 'https://cafe.naver.com/steamindiegame/11213515',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MTZfMjc1/MDAxNjg0MTc3MDgzNTMw.ymox_8k2DHGVamWuN9OPQI2VjjzV7hYjRrxeBWRkMPIg.5-acBiYyluVTrXAbOSY7b315fqdwKwArMYj_ZuQ276Ug.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MTZfMjc1/MDAxNjg0MTc3MDgzNTMw.ymox_8k2DHGVamWuN9OPQI2VjjzV7hYjRrxeBWRkMPIg.5-acBiYyluVTrXAbOSY7b315fqdwKwArMYj_ZuQ276Ug.PNG/image.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MTZfMzAg/MDAxNjg0MTc3MTAxMjMy.kRxzw-t_E6Akt2zRjTG4rC5GjcW72PBb3tmAts642U4g.X1DKN-jXUddAgsnSFceaUPS98L6oLxos-gUA5NfhP8wg.PNG/image.png?type=w800',
      ],
      board: '고멤┃팬아트',
      category: '고멤 팬아트',
      title: '고백잼',
      date: '2023.05.16. 03:58',
      deleted: false,
      view: 14881,
      like: 924,
      comment: 104,
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
                    nickname={nickname}
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
