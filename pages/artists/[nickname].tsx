import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

import { useRouter } from 'next/router';
import {
  Text,
  Center,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

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
      id: 11478778,
      url: 'https://cafe.naver.com/steamindiegame/11478778',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjUw/MDAxNjg2MDI3MjM1Mzgw.Y2tXcATqPXlSYqDWwnUnzGy0_p_BTaVH2k_OzkzAmWUg.qCWShuo4EqOuJ3qAjwPeogYWKc-xYc4oDXZsJSbGCeUg.JPEG/1683629450100.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjUw/MDAxNjg2MDI3MjM1Mzgw.Y2tXcATqPXlSYqDWwnUnzGy0_p_BTaVH2k_OzkzAmWUg.qCWShuo4EqOuJ3qAjwPeogYWKc-xYc4oDXZsJSbGCeUg.JPEG/1683629450100.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjMx/MDAxNjg2MDI3MjM0MzIy.HtInoZUt61IQEA0yAXYDOGrHTHjyg0mqUWX1ErEsHFUg.1ciBqug3quEpTw-9wZg2Ktim9GpwND7mwHJaH--mxacg.JPEG/1683378368884.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTM5/MDAxNjg2MDI3MjMzOTQz.B4KpV1B7mYJb79dBcACXY-aBMc1UmLRRKZh6oLhTtB0g.4wMHUYmmI7S45TC-50_5ehTBvozVgtZnYBSr-IKr21kg.JPEG/1683206952170.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjEz/MDAxNjg2MDI3MjMzNjY5.3DHUlh2B4oHLmKvAzvFD2-Sl2GcIEzaICqbqIg32-n0g.F35PBlF762MAbzCvIlFaUAmMtn1J1EVqkSEJ_QdbCPEg.JPEG/%EC%A4%912%EC%B1%A4%EC%9D%B4%EB%9D%BC%EB%8F%84%EF%BC%BF%EC%82%AC%EB%9E%91%EC%9D%B4%EF%BC%BF%ED%95%98%EA%B3%A0%EC%8B%B6%EC%96%B4.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjM5/MDAxNjg2MDI3MjM4MTMy.ma26bgcWeul899uwyVlVx89Qtm6ZJt3OFF6mbb8wlccg.1e_SCV94rQ1CW5IHDmPLAyANPoc_9APnbCMP8ZVHCQkg.JPEG/1683067887792.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE3/MDAxNjg2MDI3MjM4NTUx.YYzkVo56iBLuUd_77w_TuejYzPqGuX98IPiSmfgyC2Ig.iu97P4wDSgLcDgd8FDl916ZS1HF4aO-TR615IrIUzvkg.JPEG/1683023512561.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE0/MDAxNjg2MDI3MjQwMDUw.p3UWo4UTYqzeuTqorcb-7JGBbqQbcUvYl0czvc9Y6D8g.GBfdCT92eGzOuLDNh1fMfu1OAeMSg7FM_HU5TUiEEKUg.JPEG/1682837534556.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE5/MDAxNjg2MDI3MjQwOTE0.bBOYEMqEQTsOfNC67dWDETlIVNtRcjWCAiuXkLpDunIg.lHrRmrZ-7l2ZIqx0w9sZLIWJSnzNLUt2rJyNH1Noi_8g.JPEG/1682753222844.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNjMg/MDAxNjg2MDI3MjQzODYy.jxrk8pZ63zJSEBrQVMWtZOsjTuv-RvdkmMwNydg7byUg.DVuKfdLrYsdqn1_a9AxU191i-Th8QSQwjr-FsJ8pOGIg.JPEG/12.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjU3/MDAxNjg2MDI3MjQ0MzYx.NOjZnIZZMpbt4jJHFuJfh6cwPQTnAWSR-1Ypw8yemdUg.IZf4m5Nc3cQa_lYW4JRMe5XgbcVa50BkeEFBSzcwGdUg.JPEG/13.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTYy/MDAxNjg2MDI3MjQ0NjE0.XdDtPAURQqnXKx8Ud2cS40qPgXrG4TyOVE8nAkx0fksg.0A62B7yfiw9tIWhqR9P6ea_k-RGql78FkbCue2EZsRog.JPEG/20230124%EF%BC%BF221326%EF%BC%BFIMG%EF%BC%BF0568.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjEz/MDAxNjg2MDI3MjQ0NTcy.YngMtVAnJfj7JQRah5YS6BcU_0MqZvfkPDdhFDkcF9Qg.Mt7G3rtnWfn91e2fn26zEmokfUK41AtdtKR4GRn66Ucg.JPEG/20230521%EF%BC%BF210346.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjkg/MDAxNjg2MDI3MjQ1NjI2.Z_GcE4aY9WkzZv1bLSIDr0BzVVuIQOa3heDlJhVgJLkg.He7olmyoXUfNUyG-1dZUwGNCyFwhWT9ASXOnVHabmkUg.JPEG/20221231%EF%BC%BF225737%EF%BC%BFIMG%EF%BC%BF0541.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTIy/MDAxNjg2MDI3MjQ4NDY0.0iZbxcykjfF0YTmgKZLSoUP-pBGcjzVKTGP0JqILswkg.3aRHkLQSAlG0IJpKWLpU6MX7XthSTif-c0Ry_RTuJ0Eg.JPEG/20221130%EF%BC%BF152116%EF%BC%BFIMG%EF%BC%BF0484.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE3/MDAxNjg2MDI3MjQ4NTcz.lc06IiIGWpBqgTMYQY0_MPazHLGM-OYYts0ono7Q_-wg.UBm2V1ZPfylprNatf7cXsGhKpLdUWxfxZGnokVtOdh8g.JPEG/20230117%EF%BC%BF223830%EF%BC%BFIMG%EF%BC%BF0564.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjMy/MDAxNjg2MDI3MjQ2NDM4.wLmH_HpgV3h_p7w3w3ou-v-SSBxJpQzl4iHpmwAhDHcg.1jNWamwJG1SbnVXy8VQ5iFKXuUsDuQ08sXOhTFBt-xgg.JPEG/20221120%EF%BC%BF225008%EF%BC%BFIMG%EF%BC%BF0464.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMzAw/MDAxNjg2MDI3MjQ5MTc3.DFGlBfLA6GL-MiOuYRUewm6Fm6iG4NHjz97p7q_MwQog.8y1mznI4iNhhsKUej1wuxBroat1OLACYxPs2Ts7KFy8g.JPEG/20221124%EF%BC%BF225341%EF%BC%BFIMG%EF%BC%BF0470.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjcw/MDAxNjg2MDI3MjQ5Nzg5.fRjO6-S7cQJV2FTezkopshLLH33t67xZSgBvdFhPr9cg.6DQVYah_FZqr5ShlzY85QwxgPCzw4FG2AOgdx1B_8CAg.JPEG/20221123%EF%BC%BF155126%EF%BC%BFIMG%EF%BC%BF0468.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfODkg/MDAxNjg2MDI3MjUwNTE3.clo2i79832xe9gJCi1F_6mtrjce-d5eNi2qDSkTZqcgg.A0gTf-QclqhSeRdwmeA-Hj86U3EglvGOpFAjX0J43x4g.JPEG/20221121%EF%BC%BF223502%EF%BC%BFIMG%EF%BC%BF0466.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTQw/MDAxNjg2MDI3MjUxMDI2.e7GSFXGrWrH02pmNSgUrcEp3DJjMjo3w3LUxGIpk91Eg.3-YY9naE0gEP8rah09w0Bv-SUqssZcJS9rU22NOSOygg.JPEG/20221120%EF%BC%BF151219%EF%BC%BFIMG%EF%BC%BF0463.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNyAg/MDAxNjg2MDI3MjUxNDEx.XvIvq6U97P3bUmWvH7BEE6XEXBC4HnZa8N0tEypXiq4g.S3s17b0QB1r9v1mbVduXoq_GXJSPx3nrYqAKhAS4fh0g.JPEG/20221119%EF%BC%BF225218%EF%BC%BFIMG%EF%BC%BF0462.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjkg/MDAxNjg2MDI3MjUyNTAz.8FLMYumsvpHFFaYT8J4ZANGNOx4EEfQMb8orJGzJpDMg.q7XC5kTXFVyW8-kwQT5AhYetA5aalFXzevfreDi5auQg.JPEG/20221201%EF%BC%BF223916%EF%BC%BFIMG%EF%BC%BF0489.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU2/MDAxNjg2MDI3MjUzODA0.NH45qn2I4BexvHvmIsOjriq1-q4DstqWFHzcDz6ttacg.XwHitOLDhzhsc5IM1g0nEHBKsVDQT4xvUVVcGmO2Ezgg.JPEG/20221204%EF%BC%BF212847%EF%BC%BFIMG%EF%BC%BF0496.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTI1/MDAxNjg2MDI3MjUzMzg5.pN-xYrcujW0WFcfWAkeHPmJYQDiH56hDAkYqSwiz_cQg.JAGXjdTZwOY690JvTOvL7DIrKu891hRQyehDoSgaKHkg.JPEG/20221220%EF%BC%BF214034%EF%BC%BFIMG%EF%BC%BF0521.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE5/MDAxNjg2MDI3MjU0Njcw.em2-c3wQdQr3FZa8vfXlADpgV87DqDjjiO--kUcCRvsg.A2BhpBlotmLkj50dxmkrFbmGPXM-jT06Xsyq-KVsim4g.JPEG/20221215%EF%BC%BF160105%EF%BC%BFIMG%EF%BC%BF0515.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE5/MDAxNjg2MDI3MjU1Njcz.vv2r6RYweCshg32qivSojaZJrR6uC2JKDPONq3gfZgkg.XDFTJO9GR2VvVzlnf21NYCupUhlDp3Nv2A46nJG6zxgg.JPEG/20230104%EF%BC%BF232016%EF%BC%BFIMG%EF%BC%BF0557.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTE0/MDAxNjg2MDI3MjU2Mzg0.ZoSFhfs3C6ww8pWa9BfQZf7mSNvcOoCJUNNkiPDm31Ug.QtOV9AReq4Lf5_MXPhLqvIlNX-45sfZ652e8R4zdIhog.JPEG/20221224%EF%BC%BF213148%EF%BC%BFIMG%EF%BC%BF0528.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjc5/MDAxNjg2MDI3MjU3MTc0.JAsHp8MEZ-_HbA9ElmxNhcP6NYIVSKzPG0xms6ngdSYg.-_LLviwe0LJSUpxbo7yHP4H5huvXRX3PHCqTVErVIJIg.JPEG/20221115%EF%BC%BF184535%EF%BC%BF1668505535.852473.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTc0/MDAxNjg2MDI3MjU4MDU1.vZ1n3QRQCvC4eynyhxp-10FurcxhwTGlQOXGnHmHZ0Ag.T9Rkdrasl4b-mqbXRQT95wfo9t_9rTNzY3bQ5QXB-Rog.JPEG/20221108%EF%BC%BF222902%EF%BC%BFIMG%EF%BC%BF0449.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfODkg/MDAxNjg2MDI3MjU5MDEx.duyKasM2lLTqHPQLu-B9jxWShtas4-lVkSUBM-tE-Uog.dTE00ILoz_a7UgIQgpCVUqQh7ilruXnaYFdrpy-O5gcg.JPEG/20221108%EF%BC%BF160226%EF%BC%BFIMG%EF%BC%BF0447.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTM0/MDAxNjg2MDI3MjU5OTA1.zPSsxnQmZUeUAh8_ZIsbkksAdeILJTeU6U2f8QevNAAg.hBTS-tNbgYF84vlCJpkdJR9mb22O6fGrw-AyVKl6ZnEg.JPEG/20221106%EF%BC%BF234046%EF%BC%BFIMG%EF%BC%BF0443.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfODkg/MDAxNjg2MDI3MjYwNDk4.8vgAZA2okGiiXh_qWkVLGsSYa60DYEZuyUqIfK_YjvEg.8nvz3JY5kGapxA5NH1tNsVh-Wq47lDJoqVvmKPILQb4g.JPEG/20221102%EF%BC%BF232222%EF%BC%BFIMG%EF%BC%BF0435.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTY5/MDAxNjg2MDI3MjYxNzUz.7z42n4arzCC5G7Ov-Kqx_nFlH4-XTJkogpks7aij0tIg.rUjPTjMMrhY27PcPALTJsRPxxaawAkSl1uxMNABrAdEg.JPEG/20221027%EF%BC%BF232809%EF%BC%BFIMG%EF%BC%BF0427.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjQg/MDAxNjg2MDI3MjYyOTIz.js3taKE0iG_krLQxkwW7G9iWZo8QG0xxhldrLrmeFGAg.0oYbF2Lc5IjD_1q_2W02FvfjXRteWqnZdvd3ox2C-Lsg.JPEG/20221015%EF%BC%BF152137%EF%BC%BFIMG%EF%BC%BF0383.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjcx/MDAxNjg2MDI3MjYzOTg3.4JAKB6A15QYHXYyljJTbVw4G_uk6ZXbHBrVNeeaoLN4g._NgC5AtXc5c2_x59w35lucfWrauxJKFcT34LFfBoEl8g.JPEG/20221025%EF%BC%BF161045%EF%BC%BFIMG%EF%BC%BF0415.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTQ1/MDAxNjg2MDI3MjYzNjE0._Gx7bmxsuuLDu3FcWREmb9Lsx_Waab5gBT0HxrIGIpAg.E2U6o0P3GNM3fTXWhfTqBntj_Uvib-0aXsBnhSZrsMkg.JPEG/20221008%EF%BC%BF144411%EF%BC%BFIMG%EF%BC%BF0352.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNjAg/MDAxNjg2MDI3MjY1MDc2.XvKKkwOIMmn029IM1--PoeQp1TwdmmxNsm5COSKMZbYg.i03hrxXTZogyv6sEL_KGT1QLtnkYQfNZLx1G0_Ahchgg.JPEG/20220925%EF%BC%BF220427%EF%BC%BFIMG%EF%BC%BF0312.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjU4/MDAxNjg2MDI3MjY2NTUy.LshgiPHginDEXO4sF8Q6HhCveeKWESbIrRYfIgaOMuog.RO5DYGaSYq5CoU6uX-ouKHsx9I0kQbd6MhC7PRN8BUMg.JPEG/20220922%EF%BC%BF224357%EF%BC%BFIMG%EF%BC%BF0138.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjI4/MDAxNjg2MDI3MjY3NTc5.HnLMMs_nVfHzs7W-KvWnuzbCUgTNSbL5g8J5hWQzddsg.V0p6pcJvFDK33PQiiRkv7rwgqncetQcsVNIC82oPGegg.JPEG/20220927%EF%BC%BF205316%EF%BC%BFIMG%EF%BC%BF0322.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE4/MDAxNjg2MDI3MjY4MTgx.3f7z3kk9TV7p3lSmMX3wtQSI6rGwaJrQCTFkYmhofX8g.GylrGoGLyfoeaVdeaTsPj0baYye7HG3WkFi6lPa_HjAg.JPEG/20220927%EF%BC%BF205309%EF%BC%BFIMG%EF%BC%BF0323.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE4/MDAxNjg2MDI3MjY5MDA3.JK32gC_Yeh2fMFZuwEcQSa0xF5XcOJbZSpgTXQiPB90g.dOqzab_-GJmUXgysqB6QpssIjMCLOBOlgeqAjHTExV8g.JPEG/20220927%EF%BC%BF205259%EF%BC%BFIMG%EF%BC%BF0324.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU5/MDAxNjg2MDI3MjY5ODU4.EEiIHk5kBrdqbWn8i_wdIfyLcYOdL26_iS_GQP_vzDog.fRvVajBNGidR19MvXfdD6DTj8NhWhdOUw6kdvw86UlAg.JPEG/20220927%EF%BC%BF205030%EF%BC%BFIMG%EF%BC%BF0319.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTQ2/MDAxNjg2MDI3MjcwODY5.mGBv-8Rm4vejh9sdKZ66bZshpEbn5kYF_fEKPo718_4g.PDgkDONaBQHUCYQJKh3wBBfrcv4fJmoaQ0xDewWLu28g.JPEG/20220927%EF%BC%BF204755%EF%BC%BFIMG%EF%BC%BF0321.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNjAg/MDAxNjg2MDI3MjcxNDM1.hwPlJu9zVxP2SBjhY1dbbtOnojcUX25-FlDkxgoV7NMg.5LfMSEhxeWW4Ke4h0cAIgSrQAJn6_R7mZf8QK3omtDYg.JPEG/20220927%EF%BC%BF152948%EF%BC%BFIMG%EF%BC%BF0318.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjMw/MDAxNjg2MDI3MjcyODA3.wUVF8J8JsWMvsYs9UdCMfuRSKLDcBlibDZBUfKFu3hIg.gGtRsUAG3SdXjRl2EjFz8JNdCvp0bo4bGmvQgTe6pw4g.JPEG/20220922%EF%BC%BF224351%EF%BC%BFIMG%EF%BC%BF0144.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNSAg/MDAxNjg2MDI3MjcyODE2.JDy9ABCtdLZ6axCheMhrskg2G3YLJGtNMTOrJiBf7akg.3bADQJGuTsy2OjsYmIWlAFyP3P1hYTFnsdMIikfb_xYg.JPEG/20220922%EF%BC%BF224345%EF%BC%BFIMG%EF%BC%BF0146.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTUz/MDAxNjg2MDI3MjcyOTk0.QUVYka__JG7eIbOwnNbCKUn_cEqIILiufkaf6_BpgrIg.mhlSNPx7rpQ5mHqzUV2r-FSizQ5ddnA0NMZoviAgye4g.JPEG/20220922%EF%BC%BF224341%EF%BC%BFIMG%EF%BC%BF0155.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU2/MDAxNjg2MDI3MjczMzEy.loadHyXbiIJnDLiyH96TBchSoqAnouOoaiH1Adth4xUg.WGfv7o6fyndyum31pBiSshiONBjIfxanLZff8XGG7F4g.JPEG/20220922%EF%BC%BF224327%EF%BC%BFIMG%EF%BC%BF0164%EF%BC%881%EF%BC%89.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTMx/MDAxNjg2MDI3Mjc0MDYz.QB14BbwXdqPnH9Gk45aZVhZS1H_meaHiUeEsv2DOYpIg.mL8JYPUdMKc_Wd0hcxutWDJasi37BPiJ5teuwRfgaZgg.JPEG/20220922%EF%BC%BF224324%EF%BC%BFIMG%EF%BC%BF0170.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNzYg/MDAxNjg2MDI3Mjc0MTU2.obXz3D40W7Ozm0mbofDJnaPGZ1iL_Dx7NLbBxD0owrkg.vZ9sKBPFPFjPmGj7KFeahTLEIZpA4lLQDGtvb-HF85wg.JPEG/20220922%EF%BC%BF222427%EF%BC%BF41%EF%BC%BF4.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjYx/MDAxNjg2MDI3Mjc0MjY1.YjceDLUh4GWFmVdeuDfDn9yaA-0lSM5uQPMzHyfOrLQg.8oZ9hOhNg2mI2wgkHNR3WS4mf6FxslYwhSrM5BETiucg.JPEG/20220922%EF%BC%BF222425%EF%BC%BF42%EF%BC%BF3.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTUg/MDAxNjg2MDI3Mjc0NTkx.t5ZYaErM_l_pnuex_xWgwEwmUe5QpmGDCggAR6KCNh8g.wCaXgbOIteUk0yMXLkOKzvQutSX1bMpiQZaDMHkoppkg.JPEG/20220922%EF%BC%BF222419%EF%BC%BF49.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjMy/MDAxNjg2MDI3Mjc0OTkz.DjJDFsL86UzSstRUshCQGVYAgD7nn8LWZeLblc4AesMg.Py6LN3d6e5psJ2Qck0QLlz5S6q0y_jTAKt7E61U6JpIg.JPEG/20220922%EF%BC%BF222415%EF%BC%BF56%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTYg/MDAxNjg2MDI3Mjc1MzIz.DXn-5MAK31SKdmS08tn_h65MxH0P9fIoFnfHnvMPq5Mg.glS-5_Ae-V49VAJ7lzRh46aKZtN9lFsatJUyVqXw3Gsg.JPEG/20220922%EF%BC%BF222406%EF%BC%BF57%EF%BC%BF7.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjk2/MDAxNjg2MDI3Mjc1Mzk5.L13sIfUbqeTQS2iAarKqDz6MqzmZ5UQgWRtzd-n_P8sg.AdRl9UC-FVB2_afQuu9L1MUfQUsx4NSqg9SI4LDd_SMg.JPEG/20220922%EF%BC%BF222403%EF%BC%BF67%EF%BC%BF2.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjE0/MDAxNjg2MDI3Mjc2NDY2.ojcoDBCRcwfLDRiLDyjk8CfBx9H-i4TmoVekZnV1jWUg.lLMnbwZuwr1V8Nh0zCaQzxPBM5sNytlp8jBFzbD3q5Mg.JPEG/20220922%EF%BC%BF222348%EF%BC%BF51%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjUz/MDAxNjg2MDI3Mjc2Njkx.PfI15dlnSgmaIRyZCPYlygCsifnuhCoyh3g1Pdzo8Isg.ydiQqLqp79-fhDKmqyUs9SD_gJ61KjnvAUGuOjzIYHkg.JPEG/20220922%EF%BC%BF222327%EF%BC%BF39.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTY1/MDAxNjg2MDI3Mjc4MDAw.S1IIxzQZ-kfNg9RRJw4PqjMbg2der4iRKYKm3hgHZoMg.hfR9lNZKeKaJth3z-N6DgVOcfH__IAPBh5YHh7-Pvzgg.JPEG/20220922%EF%BC%BF222331%EF%BC%BF40.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfODkg/MDAxNjg2MDI3Mjc3OTY0.SRQAzSRbn4ivNFOxMI4LhDa85piBdPI_hZlReWeFk-4g.NMy3NOl6cIMowsrTzF-M2-JUJUwkPdTwJe_v9jy-EH8g.JPEG/20220922%EF%BC%BF222303%EF%BC%BF28.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjYg/MDAxNjg2MDI3Mjc5NTUz.Tmmk_gnuF1I45cGHqseo8XKEnWn86I4z7xUrc8CaCIUg.eDRjWlyoGPt4KApUx0rvDEg8sMEXsc9yekTWrujfcZEg.JPEG/20220922%EF%BC%BF222307%EF%BC%BF30%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfOTUg/MDAxNjg2MDI3MjgwMTg4.RE6M2GjFYb2wr70mbLdXIZcL_bNuC3_TJhnrifvWRukg.VDiOGecd4vtXtw_7y7mTc29Rma1vQeJ7nYRHKNMge0kg.JPEG/20220922%EF%BC%BF222249%EF%BC%BF23.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfOTcg/MDAxNjg2MDI3MjgxMzU5.ehyxBTJmJaexnKR6nhhaZ1XIKbI5RijY-urdpE2dhbIg.z8jqkrHsd1oCyohQ7xua92XFDPE2Y9gUNdDDEsJjfdcg.PNG/20220922%EF%BC%BF222244%EF%BC%BF22%EF%BC%BF1.PNG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjg0/MDAxNjg2MDI3MjgwNjM2.NH6e7eV-pcEWft8nu2qIrnnfxSN1YPfgyhvAnKO5x_0g.j5n5Wiwjp8QpOy0qLnUFObib0XVe54CmrVxdiI_yEBwg.JPEG/20220922%EF%BC%BF222235%EF%BC%BF6%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTA3/MDAxNjg2MDI3MjgxNTcz.yno8h-SenFjiv7Q6J96jghSxar-CvsZed93N_U6RBfMg.6eM1FV2cl0BWqFWIRcPzX1rA_xTbXGJXMk0eQQzkMOYg.JPEG/20220922%EF%BC%BF222047%EF%BC%BF68.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNzcg/MDAxNjg2MDI3MjgyMjY0.V3mlqG7lt3sv_YTyavWzXoIp6doZd1FjKk_DUJxlBqQg.BQ2W6iNw0ui2GEzV4LRa1aatxSVN1DjA8EsMvlmR_skg.JPEG/20220922%EF%BC%BF222101%EF%BC%BF61%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTky/MDAxNjg2MDI3MjgzNjQy.j5iiQIVC7GvtLdH-gpAHRE617SZbi4zqkr3keHLLYNEg.4SA2SUhtcnLgOYgZxLkS08jRM1Azs2f504iwteE-sbwg.JPEG/20220922%EF%BC%BF222109%EF%BC%BF59%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjMg/MDAxNjg2MDI3MjgzOTE5.Z8w4AUCPBXew0dIdZmEw_jjZzCA0ZpJKLZSCmNB-vZQg.Ammwb3W3ddJVzfB8BuMJUb7BuTrHlCMsJLNlDms3CoUg.JPEG/20220922%EF%BC%BF222124%EF%BC%BF10.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMSAg/MDAxNjg2MDI3Mjg0NDQ0.pSKFUj2VtheTLiXxwzW3BpTIESqdwQVz4aH9PpPJEW4g.pNJdXFP7UYHvvprGz-y7liHYUmpUhlzoAR2PLTDyBeAg.JPEG/20220922%EF%BC%BF222131%EF%BC%BF12.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjkz/MDAxNjg2MDI3Mjg1NDkx.o2pynjQFML-Qwoo1LYraAEfpFDXaZkaJ-EaNqlAotMog.POw829nrX786PG649vtBXqKhpRpFGBjHSfsytvVlH_wg.JPEG/20220922%EF%BC%BF222130%EF%BC%BF11%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTAw/MDAxNjg2MDI3Mjg2OTY5.fU3EJAl9ef1vAlKr5DXp3rNAnt-sTvYZDUM92xb-6n0g.eDFnTlFlzppTMdTSJ7vJO1lBtIdQM5Tj0qGWNHWGhKkg.JPEG/20220922%EF%BC%BF222136%EF%BC%BF13.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTg3/MDAxNjg2MDI3Mjg3NDA4.7pKk4ZWeXqPwML4_IhXTL_7JiHuowgG4vXvrNbD2C1Ug.GtRhSyPHwmjmnNc9UZs8NZEwzgJt_rdtpprRLi9x3jMg.JPEG/20220922%EF%BC%BF222147%EF%BC%BF14.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjg4/MDAxNjg2MDI3Mjg4MzI2.bDDABcNteMB6O0RLTiwIv8s1hWAaV2ygzn63N8Ne9Ygg.WWS8B7p_yL8cg3fXtI0FaszghP4jMIqh-EogHEXbMnQg.JPEG/20220922%EF%BC%BF222152%EF%BC%BF15.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjUy/MDAxNjg2MDI3Mjg4NzEx.lMEscSki9JRJ668l6qKRU-uPwTQ66SZ0TjQeAdd1QfYg.mGygWvFmo9xvyaWrcHrveHpeb-w9Pb31vwjSxngZ6hwg.PNG/20220922%EF%BC%BF222052%EF%BC%BF65.PNG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfODkg/MDAxNjg2MDI3Mjg5OTI0.bpyldh3zbEpKP4cySWyA6SsZXVQJPgaujiE7p4Ww_tkg.u8xrTZMYQhSjCu9XafVVMgLT1oRHw7ZoNKxBTAdjSf4g.PNG/20220922%EF%BC%BF222155%EF%BC%BF16%EF%BC%BF1.PNG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjM1/MDAxNjg2MDI3Mjg5Mjgx.9TlItp03AVyHtdRqWP1IexdZANEqHBLF8DmNBPm_kMQg.B7k69u6HZ43l52PiJ8vBwZ6xdBUkDBQGAIZ8pRYSCfkg.JPEG/20220922%EF%BC%BF222210%EF%BC%BF18%EF%BC%BF2.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU0/MDAxNjg2MDI3MjkxNzY2.DvuTvekGTjUtQMWBUFEowkgmJw42mcm-kQIUEnKcSmUg.C26mZ1XE_sRtMU66XMGk9rmUj1gIDAVYbG7mCuH_3jgg.JPEG/20221002%EF%BC%BF234502%EF%BC%BFIMG%EF%BC%BF0335.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjg3/MDAxNjg2MDI3MjkwOTM3.6B9ZtPWbu9ntSGdZPUGgpnxpYW8MCEB1rRnbfHDJsosg.OCUT8tL3oQ0IHGOeUe4EOboG0i2ouvdlTD5OjwJ2rXkg.JPEG/20221001%EF%BC%BF144858%EF%BC%BFIMG%EF%BC%BF0329.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfOTgg/MDAxNjg2MDI3MjkyNjYx.gKG-8dtYYKzKWR6sZvsDtKxXO2ZvtzOmVifxmwb3-PAg.jMmpi4nJ1vLhvR77G1qhrbDEJcnC2nj1r2yVKrvzxGAg.JPEG/20221001%EF%BC%BF221751%EF%BC%BFIMG%EF%BC%BF0331.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTI5/MDAxNjg2MDI3MjkzNDQy.uJsu1yCt1D5gk8B5q66btP5PH2yjgqACY-CGn-_xCVUg.0yaJ-hbOxP5ydDGed2ji_WW3T7DnFXg6Gv1z5wkQr7cg.JPEG/20220929%EF%BC%BF154000%EF%BC%BFIMG%EF%BC%BF0328.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMzgg/MDAxNjg2MDI3Mjk0MjA4.1XVYvt_e_iP_gYBH0pUeVH3pn9ggETR38L2Fr7L1G3Mg.38A1MLROQm0J_0FU__I7qU6W-VyvHFl3Xqke6j0ly9Ig.JPEG/20220928%EF%BC%BF210545%EF%BC%BFIMG%EF%BC%BF0326.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfOTQg/MDAxNjg2MDI3Mjk1MTIx.-_Qdi_HlzxreHlF23VRCDHYfvGqmqqaHLvuLPkZ8OP0g.gTZ4-Xix8uG5GLtpT1QGl4_pZwh6GMRMX00mpIBUTMwg.JPEG/20221105%EF%BC%BF230746%EF%BC%BFIMG%EF%BC%BF0440.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjc5/MDAxNjg2MDI3Mjk2MTYx.McgrGRBVIDMdu8Jbf30hr6F8NU0RuwK49pw4R7h2v5wg.TAYZTdxwgUP1TLWFnxOkrlSP7pOu9y0ItYt5scWUYcYg.JPEG/20221104%EF%BC%BF235557%EF%BC%BFIMG%EF%BC%BF0438.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjQ1/MDAxNjg2MDI3Mjk2Nzcy.gkzhaKmJtboejfk3VLl1P7aIUcY8a2sUbc7zOlk0q-kg.yFKJ7sFJL8xPuhpfWZNIkyowV71SgwhmlXlYtF2jBJwg.JPEG/1681224695895.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU1/MDAxNjg2MDI3Mjk3MTQ3.boplIPflOoOSogz08f6kfzILZuYc0YJySyK4OdlmtVYg.-38HK07sK01rHAMsh11vM2ofkuOInXOnLjU_FKOAOoMg.JPEG/20221231%EF%BC%BF031848%EF%BC%BFIMG%EF%BC%BF0539.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTA3/MDAxNjg2MDI3Mjk4NDQ4.q1GbkdzjZS2jMRE8VgNFiC2Gma_QNaZKoLmhSOVMuMsg.YPRwD72okOsM2Qz7Zx3LdGuz7M1sfUTQVm6guvzZNOwg.JPEG/1682088316449.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNjYg/MDAxNjg2MDI3Mjk5MjQy.Q3lQ1UVH7NGDUmKLF7apzARFnmDuKisrLVdFFAqYsbog.0IX1p40x6n3v1sgNP5nw3MxKfS_gO43SaWdFvcKa-c4g.JPEG/1685884125286.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfNzQg/MDAxNjg2MDI3MzAxMTQw.8nG-UTNGB-qhz0GWALrvnLyX6Xl_5ORjCrJkLUkcskIg.FfsYD0dc083drd8HQk150J199_QsDNhTysafEeIsCqgg.JPEG/1685685442279.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjY0/MDAxNjg2MDI3MzAxMjc1.MfFZzxwg1MMJqKhb_k7t3KwC865Uc-uzsarCyOA76eog.2AxvZ_MRh8dl58ijU5VY31lgS6Zk7Rft2ukL4xfhzbYg.JPEG/20230120%EF%BC%BF152459%EF%BC%BFIMG%EF%BC%BF0566.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjUx/MDAxNjg2MDI3MzAyMTQ1.BYQlhlv2i57gVW9eLP1DKwHKgHh5z0BIY6U_LKTKLkYg.Clnk24UAGOomYprooDPILEzgNymOJgKFXotVFnAgbRkg.JPEG/20221019%EF%BC%BF224724%EF%BC%BFIMG%EF%BC%BF0396.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTEz/MDAxNjg2MDI3MzAyODc0.hKjNUaJixhoB40JIg4JB-VDuTcjmZOYpbQvdYjqF6ZQg.BT2wb8GFcGw1ebHRlhJVbPJkH6BK_ssaoTV72L2-1yog.JPEG/20221016%EF%BC%BF212945%EF%BC%BFIMG%EF%BC%BF0387.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjcy/MDAxNjg2MDI3MzAzODQy.o-H9tFdcwGYozqQu3Q8-tiYY0xMPmpPENGOLcl7K1Wwg.qxpsQ9hZ615RdMBJ9XKA9KSoTPG3_SFq98x5CSFHjO0g.JPEG/20221008%EF%BC%BF222953%EF%BC%BFIMG%EF%BC%BF0359.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjc0/MDAxNjg2MDI3MzAzNzE5.lBliE98vJcEzqJHKhrI86SVpft_j5YiOyZqK4B2BBYAg.SkhAEskMXWn2Z0pUi5sNw6hoVujv8L_DFjrG6i_0Bpsg.JPEG/20221008%EF%BC%BF152851%EF%BC%BFIMG%EF%BC%BF0358.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjk0/MDAxNjg2MDI3MzA0MzUz.V0OiK-Gxjeoy3qCOSnhPxwo4agQjKYOMgURCo2Qmcfwg.CJz3WNE-0n8ic89yodNIpVWPvBBKh_bKOV5TjRvMOJkg.JPEG/20221008%EF%BC%BF152849%EF%BC%BFIMG%EF%BC%BF0357.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjQy/MDAxNjg2MDI3MzA0OTg5.zf1JhKZPbOE7rBtUx6CdWRTykYGfNe8y-2bnu8BvuNAg.MewluAop5sO57VxpL7Q7vztbB1Jq8V42bnMxZsm7zKcg.JPEG/20221008%EF%BC%BF152847%EF%BC%BFIMG%EF%BC%BF0356.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTIx/MDAxNjg2MDI3MzA2NTg3.udeUZYw2L65n83cciuvr7klvIImOQiFrfkKcaUhMvSsg.l5s_0z3Ge29iIxfJlZ-RgZJ_S-XK2_x6aOg_81V6HSwg.JPEG/20221008%EF%BC%BF152845%EF%BC%BFIMG%EF%BC%BF0355.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfOCAg/MDAxNjg2MDI3MzA2MDgy.C82qOuDvLAMsDqB05jNKRpf6iM195bQfgIRMFII6DW4g.c8MmgMW35LREo4aphWU8TYsCilD4vm762np9fK4uBU8g.JPEG/20221008%EF%BC%BF152843%EF%BC%BFIMG%EF%BC%BF0354.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjgg/MDAxNjg2MDI3MzA2ODMw.W76osZIhy_wd9xjW0ryXSbpBuGacJE0iAqPdPuCKj1cg.wdI7OIQ3BjO6Zp9beFlo5Vy1BgGnXlFhXG63_CXFjmgg.JPEG/20221008%EF%BC%BF152841%EF%BC%BFIMG%EF%BC%BF0353.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMTU4/MDAxNjg2MDI3MzA3NzUx.jOC-o3HoopR55E8IORep59O4rn2-9C6LHSnYbxzGt94g.siN2uDJJAcFTdpiJOFMtPGB-FZLcWYnA27TUro3eLUUg.JPEG/20221003%EF%BC%BF233509%EF%BC%BFIMG%EF%BC%BF0339.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjg5/MDAxNjg2MDI3MzA4MTM4.T_oXAWoGav2034fDFjh1FbYeRd4GL24UKxKxvd4Te-wg.wB_sjkYuMvI_rbUTlUtbSM4-7sPbAHXi9xkoc-LS9zUg.JPEG/20220922%EF%BC%BF222344%EF%BC%BF52%EF%BC%BF1.JPG?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDZfMjkw/MDAxNjg2MDI3MzA4NDI4.6c2N3ic6LW1je0CwnBBsp3VnaR0JleBpCZdT_V1OZLwg.JCox3s4ZpGxSVLIdrWXuIe2tZkMEVmMLWPDM-u4vtvQg.JPEG/20220922%EF%BC%BF222045%EF%BC%BF62%EF%BC%BF1.JPG?type=w800',
      ],
      board: '금손 작가들의 방',
      category: '',
      title: '안녕하세요',
      date: '2023.06.06. 13:55',
      deleted: false,
      deleted_img_list: [],
      view: 32524,
      like: 4190,
      comment: 640,
    },
    {
      id: 12152920,
      url: 'https://cafe.naver.com/steamindiegame/12152920',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjNfMTA5/MDAxNjkwMDgzMjQxOTY0.pTQngjgH-qaa4FRAPQ9KNC9zFLHy-4ljrlgWXz4F72kg.MHTGqsSL5LIdqKFLPCrxQbN3bgwWVujw4RM6F8lReZ4g.JPEG/1690078258319.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjNfMTA5/MDAxNjkwMDgzMjQxOTY0.pTQngjgH-qaa4FRAPQ9KNC9zFLHy-4ljrlgWXz4F72kg.MHTGqsSL5LIdqKFLPCrxQbN3bgwWVujw4RM6F8lReZ4g.JPEG/1690078258319.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: 'lady',
      date: '2023.07.23. 12:34',
      deleted: false,
      deleted_img_list: [],
      view: 21577,
      like: 2890,
      comment: 484,
    },
    {
      id: 11542828,
      url: 'https://cafe.naver.com/steamindiegame/11542828',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMTA1/MDAxNjg2NDA3OTEzMjAz.oTvuw7NLjjQ8p5cujHkLCaTQkvEZ-RrAo34JnFzHa-Mg.knUfIRae8y0bT3mdi2d63xPJlSsBhUJL3YUSvaWRsvMg.JPEG/%EA%B7%B8%EB%8F%99%EC%95%88%EC%A6%90%EA%B1%B0%EC%9B%A0%EC%96%B4%EC%9A%94%ED%96%89%EB%B3%B5%ED%95%98%EC%84%B8%EC%9A%94.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMTA1/MDAxNjg2NDA3OTEzMjAz.oTvuw7NLjjQ8p5cujHkLCaTQkvEZ-RrAo34JnFzHa-Mg.knUfIRae8y0bT3mdi2d63xPJlSsBhUJL3YUSvaWRsvMg.JPEG/%EA%B7%B8%EB%8F%99%EC%95%88%EC%A6%90%EA%B1%B0%EC%9B%A0%EC%96%B4%EC%9A%94%ED%96%89%EB%B3%B5%ED%95%98%EC%84%B8%EC%9A%94.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTBfMTEy/MDAxNjg2NDA3OTEzMDgx.UmMTpYWIcPUwrXJxuiRgJB4SyBGHRtknsaB0uAVz1Oog.gCageiQrWbqL66WvNlyrnO8OyzSV62LIO2E_i_Yk0Osg.JPEG/%EB%A7%88%EC%A7%80%EB%A7%89_%EC%9E%91%EC%97%85.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '르르땅 생일 축하드립니다~!',
      date: '2023.06.10. 23:38',
      deleted: false,
      deleted_img_list: [],
      view: 18529,
      like: 2763,
      comment: 404,
    },
    {
      id: 11628192,
      url: 'https://cafe.naver.com/steamindiegame/11628192',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTZfMTYz/MDAxNjg2OTIyODQyMzAz.jtKyP04ihTvjUIdIsrfAbw3NU-TkbDGHy6I-2-ALr1Mg.JGGXEnpMDfo_Qhbu9_UdNTaaTa2nSS14qiHpqsVM1k8g.JPEG/1686922412979.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTZfMTYz/MDAxNjg2OTIyODQyMzAz.jtKyP04ihTvjUIdIsrfAbw3NU-TkbDGHy6I-2-ALr1Mg.JGGXEnpMDfo_Qhbu9_UdNTaaTa2nSS14qiHpqsVM1k8g.JPEG/1686922412979.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MTZfMjkz/MDAxNjg2OTIyODQwOTA1.15rA-WHOybQ4jR4L8ddejLEufJ9MY5iCeJajRJICXV0g.YrX3TyZI9w-IFV-rw-8iYPpL33wORDP2YynY6TVjh7Ug.JPEG/1686755443.jpeg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '마호소죠',
      date: '2023.06.16. 22:40',
      deleted: false,
      deleted_img_list: [],
      view: 21671,
      like: 2499,
      comment: 377,
    },
    {
      id: 11853474,
      url: 'https://cafe.naver.com/steamindiegame/11853474',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfNDgg/MDAxNjg4MTMzOTk3MjA3.AxMKMtjGFnDY5W7VSvQs7Ty5G2SH3Duk86VoSQBFKFEg.McO3Gs9uGZncncN_rHF85WUQFAqXEkEfcTSkszhub9Ig.JPEG/1687696617947.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfNDgg/MDAxNjg4MTMzOTk3MjA3.AxMKMtjGFnDY5W7VSvQs7Ty5G2SH3Duk86VoSQBFKFEg.McO3Gs9uGZncncN_rHF85WUQFAqXEkEfcTSkszhub9Ig.JPEG/1687696617947.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfMjQx/MDAxNjg4MTMzOTk3Nzgx.wu9VFzhrLQyccyUbcBIP5SYjPZmymNfEucm8sPiQDCkg.xhBdO_WeJhtNFAS3Ti4GyMPqG9-CdTP_Ff6y5LJ6rmUg.JPEG/1687782167887.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfMjM1/MDAxNjg4MTMzOTk3OTQ2.wLe_VTVTCwiZAUFxydbRQsPYUz3x9t24CVkuy8srIm4g.fQRon138fh38v5wokfziONiO2UAP7zubJGjemKnqibgg.JPEG/1687846899911.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfMjE3/MDAxNjg4MTMzOTk5MzA5.IUt18H4FwT13bbQ6djQ1vxsjzT0Jv79HbkSFmgY-b8cg._1RQgZRshJruMLRpPliGOMJ5GuIBRuHwxrlSSFOBchIg.JPEG/1688133414938.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfNzIg/MDAxNjg4MTM0MDAwMjUy.ZnGsS0U8gDj0ohUQnXb9sOZbnq4proxClKsyK111DBwg.dUXKBSLFpRL_8RSGxF065Z5nzFyuA4ZWyOYEZd2y8a8g.JPEG/1688042532026.jpg?type=w800',
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MzBfMTg3/MDAxNjg4MTM0MDAxMDI1.OHlrbRa-uNVTvenxBRUp4qPn-pbR0Tmy0uvnduG-qugg.Ttsb3dQpBv7RigpHpnrxcRYgSVDcPvoKOoJFHLtiP7Ig.JPEG/1688129586478.jpg?type=w800',
      ],
      board: '금손 작가들의 방',
      category: '',
      title: '이세돌의 문단속',
      date: '2023.06.30. 23:06',
      deleted: false,
      deleted_img_list: [],
      view: 19424,
      like: 2326,
      comment: 338,
    },
    {
      id: 11867305,
      url: 'https://cafe.naver.com/steamindiegame/11867305',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDFfMjAx/MDAxNjg4MjIxODMxMDQy.tdW0J47i-nRfGFF-2l0zEnXDSsyJ1xA_vd4OvVRm1tog.VYpsNuCgDU9KS8VWDaK7imVT1PyTaJgjuBLYEhEK12sg.JPEG/1688221691010.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MDFfMjAx/MDAxNjg4MjIxODMxMDQy.tdW0J47i-nRfGFF-2l0zEnXDSsyJ1xA_vd4OvVRm1tog.VYpsNuCgDU9KS8VWDaK7imVT1PyTaJgjuBLYEhEK12sg.JPEG/1688221691010.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: 'LADY',
      date: '2023.07.01. 23:30',
      deleted: false,
      deleted_img_list: [],
      view: 17146,
      like: 2122,
      comment: 371,
    },
    {
      id: 12449461,
      url: 'https://cafe.naver.com/steamindiegame/12449461',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTVfMTM4/MDAxNjkyMDk2Mjg3MDIz.TxK_e603OwqNGMkyWqmRNxzx7A_jv09HcM9agzf1gaAg.Bjf5OKTvYnZQ9ZF9m3H5PtmACIeo72cQt9N2Q6Kh13Ig.JPEG/1692096262428.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTVfMTM4/MDAxNjkyMDk2Mjg3MDIz.TxK_e603OwqNGMkyWqmRNxzx7A_jv09HcM9agzf1gaAg.Bjf5OKTvYnZQ9ZF9m3H5PtmACIeo72cQt9N2Q6Kh13Ig.JPEG/1692096262428.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '수세구',
      date: '2023.08.15. 19:39',
      deleted: false,
      deleted_img_list: [],
      view: 13073,
      like: 2016,
      comment: 379,
    },
    {
      id: 12346899,
      url: 'https://cafe.naver.com/steamindiegame/12346899',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDdfMjQ1/MDAxNjkxNDAwMzM3NzYz.q8AhddUZ3Ii09LTpYR6nwya-2ekhOr9_B2ei86UVup4g.RPfTp0GnlzRiKd6b0FxlJYE2F6iu9fRl2g8vcDaZnCgg.JPEG/20230807%EF%BC%BF182522.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MDdfMjQ1/MDAxNjkxNDAwMzM3NzYz.q8AhddUZ3Ii09LTpYR6nwya-2ekhOr9_B2ei86UVup4g.RPfTp0GnlzRiKd6b0FxlJYE2F6iu9fRl2g8vcDaZnCgg.JPEG/20230807%EF%BC%BF182522.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '릴',
      date: '2023.08.07. 18:25',
      deleted: false,
      deleted_img_list: [],
      view: 12204,
      like: 1983,
      comment: 360,
    },
    {
      id: 12814173,
      url: 'https://cafe.naver.com/steamindiegame/12814173',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDlfMTU1/MDAxNjk0MjY5NjQwNzE5.ffrT2QA1N2J9QNgScFYsMjTxDqcNNCmplQLMpUwf_VUg.aIwFFSOPK3x_cmOab1l9tM213jJTPkXHpRdd_sbfDP8g.JPEG/%E3%85%87%E3%85%87%E3%84%B4.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MDlfMTU1/MDAxNjk0MjY5NjQwNzE5.ffrT2QA1N2J9QNgScFYsMjTxDqcNNCmplQLMpUwf_VUg.aIwFFSOPK3x_cmOab1l9tM213jJTPkXHpRdd_sbfDP8g.JPEG/%E3%85%87%E3%85%87%E3%84%B4.jpg?type=w800',
      ],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '99절',
      date: '2023.09.09. 23:27',
      deleted: false,
      deleted_img_list: [],
      view: 10285,
      like: 1879,
      comment: 375,
    },
    {
      id: 12413851,
      url: 'https://cafe.naver.com/steamindiegame/12413851',
      img_url:
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTJfMTU5/MDAxNjkxODUwNzY3OTg1.2BBHpgVGjmBPOaNTfMGYnaOVJl8Fys6vuAIi9gSChd4g.NYpQ7P85HKoFTiJvi_G_k6ZVgFPwnZE4TN0o4xFzpQ4g.JPEG/1691850761252.jpg?type=w800',
      img_url_list: [
        'https://cafeptthumb-phinf.pstatic.net/MjAyMzA4MTJfMTU5/MDAxNjkxODUwNzY3OTg1.2BBHpgVGjmBPOaNTfMGYnaOVJl8Fys6vuAIi9gSChd4g.NYpQ7P85HKoFTiJvi_G_k6ZVgFPwnZE4TN0o4xFzpQ4g.JPEG/1691850761252.jpg?type=w800',
      ],
      board: '금손 작가들의 방',
      category: '',
      title: 'ㅡ.ㅡ',
      date: '2023.08.12. 23:31',
      deleted: false,
      deleted_img_list: [],
      view: 13021,
      like: 1096,
      comment: 182,
    },
    {
      id: 12676340,
      url: 'https://cafe.naver.com/steamindiegame/12676340',
      img_url: '',
      img_url_list: [],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '∥',
      date: '2023.08.29. 15:24',
      deleted: true,
      deleted_img_list: [],
      view: '',
      like: '',
      comment: '',
    },
    {
      id: 12626803,
      url: 'https://cafe.naver.com/steamindiegame/12626803',
      img_url: '',
      img_url_list: [],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '연습이라네',
      date: '2023.08.25. 23:54',
      deleted: true,
      deleted_img_list: [],
      view: '',
      like: '',
      comment: '',
    },
    {
      id: 12452576,
      url: 'https://cafe.naver.com/steamindiegame/12452576',
      img_url: '',
      img_url_list: [],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '이~네',
      date: '2023.08.15. 23:54',
      deleted: true,
      deleted_img_list: [],
      view: '',
      like: '',
      comment: '',
    },
    {
      id: 12433260,
      url: 'https://cafe.naver.com/steamindiegame/12433260',
      img_url: '',
      img_url_list: [],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '간 줄래?',
      date: '2023.08.14. 13:29',
      deleted: true,
      deleted_img_list: [],
      view: '',
      like: '',
      comment: '',
    },
    {
      id: 12320220,
      url: 'https://cafe.naver.com/steamindiegame/12320220',
      img_url: '',
      img_url_list: [],
      board: '통합 BEST 팬아트 게시판',
      category: '',
      title: '릴',
      date: '2023.08.05. 17:40',
      deleted: true,
      deleted_img_list: [],
      view: '',
      like: '',
      comment: '',
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

  // console.log(artist_name2info);
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
      // console.log(response);
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
    // console.log('artworks loading...');

    try {
      const response = await axios
        .get(
          `https://re-find.reruru.com/author_artworks?name=${nickname}&type=${sortType}&page=${page}`
        )
        .then((res) => res.data);

      // console.log(response.lastPage);
      // console.log(response.list);
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
      {profile?.author_nickname === '' && profile.num_artworks === 0 && (
        <Center
          w="100%"
          h="80vh"
          p="3rem 0"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text fontSize={['2xl', '4xl']} fontWeight="600" mb="4rem">
            {`'${nickname}' 님의 프로필`}
          </Text>
          <Text fontSize={['xl', '3xl']}>존재하지 않는 아이디 이거나</Text>
          <Text fontSize={['xl', '3xl']} mb="2rem">
            아직 업로드한 작품이 없는 것 같네요
          </Text>
          <Image
            src="/static/images/original_18.png"
            alt="이파리티콘-추워"
            width={200}
            height={200}
            unoptimized
          />
        </Center>
      )}
      {profile?.author_nickname !== '' && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="0 auto"
          mb="2rem"
        >
          <AuthorProfileHead nickname={nickname} profile={profile} />
          <ViewSelectBar
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
      )}
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
