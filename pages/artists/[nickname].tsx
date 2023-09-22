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
      id: 11482574,
      url: 'https://cafe.naver.com/steamindiegame/11482574',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMzQg/MDAxNjg2MDUxODA3NTYw.KHnYWcnPCw-sNDr4nUsGT4nGe2XfsVdpNMf9YmMt1V4g.tWvULHehYdIP7cU07uKD0LVQ2ibFuLZhek2-ohmEitkg.PNG/%ED%95%9C%EA%B5%AD.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMzQg/MDAxNjg2MDUxODA3NTYw.KHnYWcnPCw-sNDr4nUsGT4nGe2XfsVdpNMf9YmMt1V4g.tWvULHehYdIP7cU07uKD0LVQ2ibFuLZhek2-ohmEitkg.PNG/%ED%95%9C%EA%B5%AD.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE4/MDAxNjg2MDUxODA3NTU2.M01arObNZLJjuW0Ac5-wVfloE40ZRs8ensRqY5b7N_kg.qkj3QVSyqnIPpiFYilPuZFH5GrWpSSu2e-5dNvdjx9og.PNG/%EB%8F%85%EC%9D%BC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjc2/MDAxNjg2MDUxODA3NTU2.WJOyPJ6VExYagkt2U0gH23uq2fJLwHp05Gjon6onrM0g.NndpWq0g3JLxklhsMeGh6B40w-vDwOJgWLrT4s8IU-sg.PNG/%EB%9F%AC%EC%8B%9C%EC%95%84.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTgy/MDAxNjg2MDUxODA3NTQ2.4Ox4QF4ANNakUsHdaKgdVkIt2sMz7jyPrUXdvICY4OIg.-1s11P5w62BBRzYRzgkE_q7s6mOdgNckkVZG7nViGxQg.PNG/%EC%8A%A4%ED%8E%98%EC%9D%B8.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE0/MDAxNjg2MDUxODA3NTQ2.jVsfsyC0Yxj2gI0ubL2Sw7kk7V1Dmfnw0Q_1FTRZEx4g.3l13W04hN5-ROgPP2WQHSoywHLx00M28VgjNSwE5T74g.PNG/%EC%9D%BC%EB%B3%B8.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE3/MDAxNjg2MDUxODA3NTQ4.IBwzofrllHpuKtMzTSetdJbNzzH04E_a6yZQmrWaTNcg.hc7QgtKvv_xgMnXPUPi3jAR77TI5f20XvIBbddG2uPUg.PNG/%EC%A4%91%EA%B5%AD.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTM1/MDAxNjg2MDUxODA3NzI3.uXPYSc5I-jXCvJ_4bzzkKc8VYrx992p-48QLLi7J5ggg.-pQ8jEyiLiVKY9AyXJkCPUDjSIHLLhcHmSWejwAzYLEg.PNG/%ED%98%B8%EC%A3%BC.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '나라별 고세구입니닷',
      date: '2023.06.06. 20:45',
      deleted: false,
      view: 8214,
      like: 904,
      comment: 180,
    },
    {
      id: 10593975,
      url: 'https://cafe.naver.com/steamindiegame/10593975',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfMjI3/MDAxNjgwMzgwNDUwODA4.tamq_ua-SMKwNxv29LTX4a_D-mgWKhlDLnekNizxeS4g.o11eLwUAylOal2g37qsgZ3vUAa9PlYWJ_bJS4OSrG7Qg.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfMjI3/MDAxNjgwMzgwNDUwODA4.tamq_ua-SMKwNxv29LTX4a_D-mgWKhlDLnekNizxeS4g.o11eLwUAylOal2g37qsgZ3vUAa9PlYWJ_bJS4OSrG7Qg.PNG/image.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfNDUg/MDAxNjgwMzgwNDY3Mzkw.gk8eU6EkWDnA89wn-584nr8iKnRUYREhzIUAQhU-RDUg.JuyupqIK83L2fqivkI4nVYUOGLy0UgpeEFIW3iL1XAcg.PNG/image.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDJfMTQx/MDAxNjgwMzgwNDgyMDgx.WcCLeJIRA7wM0VqPVoXoMXlzj3x4MHhunMXWB3uOJBkg.ZJqvQwvsBmVo7dzcI0emZAtvR0Ty2wwxzymlawb_6_og.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '2인 이상',
      title: '이세계 f6 동생즈',
      date: '2023.04.02. 05:22',
      deleted: false,
      view: 7400,
      like: 903,
      comment: 125,
    },
    {
      id: 8876909,
      url: 'https://cafe.naver.com/steamindiegame/8876909',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMTNfMjEg/MDAxNjcwOTQxOTk5MjI0.5lUu2wVv_gZlrK-aQS3QsiXJK4MUgJ4wqK6h29Wvkqkg.lTvIJgcI81Lc2Hujhl8qqltaNn_PVbM329CoJo_alqIg.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMTNfMjEg/MDAxNjcwOTQxOTk5MjI0.5lUu2wVv_gZlrK-aQS3QsiXJK4MUgJ4wqK6h29Wvkqkg.lTvIJgcI81Lc2Hujhl8qqltaNn_PVbM329CoJo_alqIg.PNG/image.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMTNfMTM4/MDAxNjcwOTQyMDEyNzEy.v-OvkvnWvmq66DUpKeNr5GDe-wDzjHvhmqzs0-C6JqQg.Y-WfzFRwJTu7iCboD50RWEN8DHRq2uKn72VcpDrBmzQg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '웹툰세구머시기',
      date: '2022.12.13. 23:33',
      deleted: false,
      view: 9585,
      like: 891,
      comment: 147,
    },
    {
      id: 9115711,
      url: 'https://cafe.naver.com/steamindiegame/9115711',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMjhfNCAg/MDAxNjcyMjA5NTQyODQz.JFYvoVrM0bwQ4ZtcyJeBMQt-HX0huVCFJIoDNc3hnTYg.waIz7r_Wf5pfrBGhDatsfaVkNDPjCa3Zrz7nhHTmg-Mg.GIF/%EB%B9%84%EC%B1%A4%EB%B9%84%ED%96%89%EA%B8%B0.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMjhfNCAg/MDAxNjcyMjA5NTQyODQz.JFYvoVrM0bwQ4ZtcyJeBMQt-HX0huVCFJIoDNc3hnTYg.waIz7r_Wf5pfrBGhDatsfaVkNDPjCa3Zrz7nhHTmg-Mg.GIF/%EB%B9%84%EC%B1%A4%EB%B9%84%ED%96%89%EA%B8%B0.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjEyMjhfMjIw/MDAxNjcyMjA5NTU5MDkw.z1-LAMZUOY4W4ph9ZIazjbJOylmD6QgqmbT5QvDzW5Ag.CCDFrqYshgdCty-g5jagqEguqiX4ZSiGW_c7WSrmICMg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '비챤',
      title: '(gif) 비챤비행기',
      date: '2022.12.28. 15:39',
      deleted: false,
      view: 6958,
      like: 883,
      comment: 181,
    },
    {
      id: 9624636,
      url: 'https://cafe.naver.com/steamindiegame/9624636',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDRfMTgx/MDAxNjc1NDU1MjMxODcw.RPVgKDuMHZ-J_RGyhHnLzlCaKIPqlNyM5CVkoS00HxUg.BYVMljmaNa5RGbhYDxKEsaZIrNJPNt70RvTerzEum54g.GIF/%EC%84%B8%EA%B5%AC-%EC%9D%B8%EC%82%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDRfMTgx/MDAxNjc1NDU1MjMxODcw.RPVgKDuMHZ-J_RGyhHnLzlCaKIPqlNyM5CVkoS00HxUg.BYVMljmaNa5RGbhYDxKEsaZIrNJPNt70RvTerzEum54g.GIF/%EC%84%B8%EA%B5%AC-%EC%9D%B8%EC%82%AC.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDRfMjYg/MDAxNjc1NDU1NDU5ODA2.1ZS0Ug0G-49vc0y36vCpuDu16rQjO_7fis8KPYT4GIUg.TDVA3k_tTqjRtbRQcWdaOpc7J9B4hHZgMGMlggtei3Ag.GIF/%EC%84%B8%EA%B5%AC-%EB%B9%A0%EB%A5%B8%EC%9D%B8%EC%82%AC.gif?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMDRfMjk1/MDAxNjc1NDU1NTIyNzc0.tEurk6MT0GQZLymF2C1w4aadc9cnjxCuzYp5CL7y6ekg.1WbxZY6STR4DHHW9oA1u27vR0iqkaIzT86zBCjUBJuQg.GIF/%EC%84%B8%EA%B5%AC-%EB%8D%94%EB%B9%A0%EB%A5%B8%EC%9D%B8%EC%82%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 세구 인사',
      date: '2023.02.04. 05:14',
      deleted: false,
      view: 7981,
      like: 879,
      comment: 134,
    },
    {
      id: 7272425,
      url: 'https://cafe.naver.com/steamindiegame/7272425',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjA4MTVfNTYg/MDAxNjYwNTY0ODM0MTk1.reqW3Bys1HptHvVuuNc6BUek2W3atdRPYoZx8rsy0log.XuEYshhmOgU2-YHE26iv5LNkL0j92aqAhHPKn32I9J0g.GIF/%EB%88%88%EB%82%98%EA%B5%AC-%EC%9B%80%EC%A7%A4.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMjA4MTVfNTYg/MDAxNjYwNTY0ODM0MTk1.reqW3Bys1HptHvVuuNc6BUek2W3atdRPYoZx8rsy0log.XuEYshhmOgU2-YHE26iv5LNkL0j92aqAhHPKn32I9J0g.GIF/%EB%88%88%EB%82%98%EA%B5%AC-%EC%9B%80%EC%A7%A4.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '눈나구 (gif)',
      date: '2022.08.15. 21:00',
      deleted: false,
      view: 7528,
      like: 879,
      comment: 178,
    },
    {
      id: 11541416,
      url: 'https://cafe.naver.com/steamindiegame/11541416',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMSAg/MDAxNjg2NDAxNTU1NjA5.tJIwO665a8IIcuUbK6nlcpqoWh-uNTJqCPBXiD8rjWkg.VTrXzKTNEH4mSHTthw27ZPqD7Nf5MCHTt6Sl1ZK1ahMg.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMSAg/MDAxNjg2NDAxNTU1NjA5.tJIwO665a8IIcuUbK6nlcpqoWh-uNTJqCPBXiD8rjWkg.VTrXzKTNEH4mSHTthw27ZPqD7Nf5MCHTt6Sl1ZK1ahMg.PNG/image.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMjcw/MDAxNjg2NDAxNjAwMjIy.Y-xB0KgiY9L2ABbnuhL5WmiYhVPJ1hthjL9rWK302wYg.ye6rrwwQg3guvK8TD4ibsWvTqQv4BL8xeuRlWjYW6lgg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '공쥬구',
      date: '2023.06.10. 21:53',
      deleted: false,
      view: 5775,
      like: 874,
      comment: 171,
    },
    {
      id: 12298956,
      url: 'https://cafe.naver.com/steamindiegame/12298956',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDNfMTU2/MDAxNjkxMDYzNzAxNjM3.iV0sFuXxJFHsBcUqliUj_-iHs_HJMlINJinH4g5l-YQg.O4eRG2D5hs8DXe-PMO9vnaTHJN3ItkgJItKAOiMk3cIg.GIF/%EB%91%A0%EC%B9%AB%ED%95%98%EB%8A%94-%EC%84%B8%EA%B5%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDNfMTU2/MDAxNjkxMDYzNzAxNjM3.iV0sFuXxJFHsBcUqliUj_-iHs_HJMlINJinH4g5l-YQg.O4eRG2D5hs8DXe-PMO9vnaTHJN3ItkgJItKAOiMk3cIg.GIF/%EB%91%A0%EC%B9%AB%ED%95%98%EB%8A%94-%EC%84%B8%EA%B5%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 둠칫세구',
      date: '2023.08.03. 20:55',
      deleted: false,
      view: 5785,
      like: 870,
      comment: 183,
    },
    {
      id: 11476238,
      url: 'https://cafe.naver.com/steamindiegame/11476238',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjM4/MDAxNjg2MDAxNDgxMjQy.qh71j0SWN9fLTuhhMDm3P-g9md-b5Zr-WCkslimFnDQg.dnmcDyRSMB-VoQFYxinIiIC-PGIf6NtoFrCuxp3q_z0g.GIF/%EC%A7%95%EB%B2%84%EA%B1%B0-%ED%95%B4%ED%94%BC%ED%95%B4%ED%94%BC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjM4/MDAxNjg2MDAxNDgxMjQy.qh71j0SWN9fLTuhhMDm3P-g9md-b5Zr-WCkslimFnDQg.dnmcDyRSMB-VoQFYxinIiIC-PGIf6NtoFrCuxp3q_z0g.GIF/%EC%A7%95%EB%B2%84%EA%B1%B0-%ED%95%B4%ED%94%BC%ED%95%B4%ED%94%BC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '징버거',
      title: '(gif) 햅삐버거',
      date: '2023.06.06. 06:44',
      deleted: false,
      view: 6747,
      like: 870,
      comment: 163,
    },
    {
      id: 9195546,
      url: 'https://cafe.naver.com/steamindiegame/9195546',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDJfNDMg/MDAxNjcyNjU5OTgzNzEw.JOdTaeujB9ywpJb5V2QgijQyX4YWhKzWleSds1xqRX8g.fxq3tAimOmTRruMWoI52p0k7UFUJlohDKBkjJLTjNNog.GIF/%EB%A6%B4%ED%8C%8C-%EC%B1%A4%EC%9D%B4%EB%84%88%EB%82%B4%EA%B0%80%EC%96%BC%EB%A7%88%EB%82%98%EC%9E%98%ED%95%B4%EC%A4%AC%EB%8A%94%EB%8D%B0.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDJfNDMg/MDAxNjcyNjU5OTgzNzEw.JOdTaeujB9ywpJb5V2QgijQyX4YWhKzWleSds1xqRX8g.fxq3tAimOmTRruMWoI52p0k7UFUJlohDKBkjJLTjNNog.GIF/%EB%A6%B4%ED%8C%8C-%EC%B1%A4%EC%9D%B4%EB%84%88%EB%82%B4%EA%B0%80%EC%96%BC%EB%A7%88%EB%82%98%EC%9E%98%ED%95%B4%EC%A4%AC%EB%8A%94%EB%8D%B0.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '릴파',
      title: '(gif) 챤이너언니가얼마나잘해줬는데',
      date: '2023.01.02. 20:49',
      deleted: false,
      view: 9508,
      like: 868,
      comment: 138,
    },
    {
      id: 11745216,
      url: 'https://cafe.naver.com/steamindiegame/11745216',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MjRfMjc5/MDAxNjg3NTMyNDYwMjc4.8Crn61gd8ssLJHKE09-7PUDZRT_nnhZFoYTQ9J79dGUg.8LYlzBTBncP2RDfJRfNhWPL324v3JUYZv61biLW_T1cg.PNG/image.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MjRfMjc5/MDAxNjg3NTMyNDYwMjc4.8Crn61gd8ssLJHKE09-7PUDZRT_nnhZFoYTQ9J79dGUg.8LYlzBTBncP2RDfJRfNhWPL324v3JUYZv61biLW_T1cg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '2인 이상',
      title: '멜론 차트 대기중인 이세돌분들',
      date: '2023.06.24. 00:01',
      deleted: false,
      view: 7218,
      like: 867,
      comment: 129,
    },
    {
      id: 9873252,
      url: 'https://cafe.naver.com/steamindiegame/9873252',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMTdfMjQz/MDAxNjc2NjM3MzI3ODA0.astQVV5cy9HyH9Y5u5zu9dB8T7Odq-huqMs9poYxcgsg.ALm5gCp7POG5nBNExjkgDeSZUZloqiIIVpCCEgm3Ojsg.GIF/%EC%99%81%EA%B5%B3%EB%8B%98%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94%EC%84%B8%EA%B5%AC%EB%8B%98.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAyMTdfMjQz/MDAxNjc2NjM3MzI3ODA0.astQVV5cy9HyH9Y5u5zu9dB8T7Odq-huqMs9poYxcgsg.ALm5gCp7POG5nBNExjkgDeSZUZloqiIIVpCCEgm3Ojsg.GIF/%EC%99%81%EA%B5%B3%EB%8B%98%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94%EC%84%B8%EA%B5%AC%EB%8B%98.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 왁굳님,,,,',
      date: '2023.02.17. 21:35',
      deleted: false,
      view: 9135,
      like: 865,
      comment: 192,
    },
    {
      id: 9175681,
      url: 'https://cafe.naver.com/steamindiegame/9175681',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMTcz/MDAxNjcyNTM1MTE0MDYy.q45KsEZ8HtOHff-PD2CQPBj6p3__MUXXauZvHTxjzw4g.aYoKB_ewzRE0tccfnZoss9oIpcm9qBq0AnzIHc_RV1wg.PNG/%ED%82%B9%EC%95%84%EA%B3%A0%EC%84%B8%EA%B5%AC.png?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMTcz/MDAxNjcyNTM1MTE0MDYy.q45KsEZ8HtOHff-PD2CQPBj6p3__MUXXauZvHTxjzw4g.aYoKB_ewzRE0tccfnZoss9oIpcm9qBq0AnzIHc_RV1wg.PNG/%ED%82%B9%EC%95%84%EA%B3%A0%EC%84%B8%EA%B5%AC.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMzIg/MDAxNjcyNTM1ODQzNzc4.JuJVTtOU-jf9xxnYpIB8oDGE_NxTsseXWJbG3JsueJwg.hWNPWHj2573LfDUAI2hPyrRwjygtkSMNZHsCOdCfVPEg.PNG/%EB%B9%84%EC%B1%A4%EB%8B%B4%EA%B5%AC%EC%84%B8%EA%B5%AC.PNG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMjUz/MDAxNjcyNTM1ODk3ODI0.eIw1kyXrmmlC_lvNcGSzt_Z5TGQUIwIVHuO3Z5vx7IQg._425_t8byOloBdT4CDxvxBDRqIUwMoxuwme2geLhDPwg.PNG/%EB%B9%84%EC%B1%A4%EA%B8%B0%EB%AA%A8%EB%85%B8.png?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMTMg/MDAxNjcyNTM1OTMyMTAx.h3BNDElTOM9971Ws9Z2wRqS685PftwiieqTvwz7KTKQg.Xr7JniS6-tD9rm7IxzrblhAREOjiTxTCCBWKewk4a9cg.PNG/%EB%AC%B4%EC%B9%A0%EC%A6%88.PNG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMDFfMjYg/MDAxNjcyNTM1NTIwMjcz.Xu01_5yv3kEOR0ymmFp0upxEyqzjWYGpnbZwPLzuBwUg.JYuxIN1KmDq-QuCNFQ50JjNfuzuhFfquk912J8c0G3Eg.PNG/image.png?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '그림체변화,...',
      date: '2023.01.01. 10:14',
      deleted: false,
      view: 9930,
      like: 860,
      comment: 160,
    },
    {
      id: 10622705,
      url: 'https://cafe.naver.com/steamindiegame/10622705',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDNfMTY1/MDAxNjgwNTMxNjY5MjU4.T3sTLev8acEuR2ueoEmsszyGr3ApOxu2lzxuPLtibzQg.r3rBUdu6XDYA-TuwGHvp4VJqergd73Iggg0C7YIey5sg.GIF/%ED%98%95%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94-%ED%8C%AC%EC%B9%98.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDNfMTY1/MDAxNjgwNTMxNjY5MjU4.T3sTLev8acEuR2ueoEmsszyGr3ApOxu2lzxuPLtibzQg.r3rBUdu6XDYA-TuwGHvp4VJqergd73Iggg0C7YIey5sg.GIF/%ED%98%95%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94-%ED%8C%AC%EC%B9%98.gif?type=w800',
      ],
      board: '우왁굳 팬아트',
      category: '팬아트',
      title: '(gif) 형 금방갈게',
      date: '2023.04.03. 23:21',
      deleted: false,
      view: 10431,
      like: 859,
      comment: 198,
    },
    {
      id: 12407395,
      url: 'https://cafe.naver.com/steamindiegame/12407395',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTJfMTk1/MDAxNjkxODExMzcwNzU0.IGAuyghZiSBg2Xg9I-8uEv1y5L97ZRwjRSBWPoa2K_Yg.lOv28i-6Mu6TAfe6bX1m0NoPtgOWZsKOErU5Kbc7ZAcg.GIF/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EB%B9%84%ED%82%A4%EB%8B%88%EA%B5%AC.gif?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTJfMTk1/MDAxNjkxODExMzcwNzU0.IGAuyghZiSBg2Xg9I-8uEv1y5L97ZRwjRSBWPoa2K_Yg.lOv28i-6Mu6TAfe6bX1m0NoPtgOWZsKOErU5Kbc7ZAcg.GIF/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EB%B9%84%ED%82%A4%EB%8B%88%EA%B5%AC.gif?type=w800',
      ],
      board: '🎨 이세돌┃팬아트',
      category: '고세구',
      title: '(gif) 마이크로비키니구',
      date: '2023.08.12. 12:36',
      deleted: false,
      view: 9028,
      like: 858,
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
