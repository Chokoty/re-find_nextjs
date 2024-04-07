'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaChevronRight, FaShare } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

import SocialStats from '@/components/search/SocialStats';
import { useResponsiveLink } from '@/hook/useResponsiveLink';

const dummyData2 = {
  id: 15429713,
  url: 'https://cafe.naver.com/steamindiegame/15429713',
  img_url:
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
  img_url_list: [
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMjNfMTQ0/MDAxNzExMTg5NTIyMTYy.OvRvvObiiiKVmnMc_SwQHIx0Ppm1t6hc7ZDXwwWeNyAg.zovjsfZShedb6fADVLXQeQnAsgFI02NbJLCnv95DIYUg.PNG/%EC%9D%B4%EC%84%B8%EB%8F%8C_kissing_you.png?type=w800',
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMjNfMTc0/MDAxNzExMTkxNTA2MzU2.HXTC3mVpIemVi07f036Bl3KRB5kIcxmsFhZ7z5LxDQUg.MbcijwHKzwzZHoI4llFhdL-cI9zrz6IBvt-ApTFj5asg.PNG/%EC%9D%B4%EC%84%B8%EB%8F%8C_kissing_you3.png?type=w800',
  ],
  board: '&#127912; 이세돌┃팬아트',
  category: '릴파',
  title: '(경)해피 릴파데이(축)',
  author: '만치치',
  prof_url:
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
  date: '2024.03.09. 00:04',
  view: 2190,
  like: 627,
  comment: 106,
  is_shukkou: false,
  deleted: false,
  is_hyum: false,
};

const dummyData = {
  id: 15640651,
  url: 'https://cafe.naver.com/steamindiegame/15640651',
  img_url:
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMjNfMTQ0/MDAxNzExMTg5NTIyMTYy.OvRvvObiiiKVmnMc_SwQHIx0Ppm1t6hc7ZDXwwWeNyAg.zovjsfZShedb6fADVLXQeQnAsgFI02NbJLCnv95DIYUg.PNG/%EC%9D%B4%EC%84%B8%EB%8F%8C_kissing_you.png?type=w800',
  img_url_list: [
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMjNfMTQ0/MDAxNzExMTg5NTIyMTYy.OvRvvObiiiKVmnMc_SwQHIx0Ppm1t6hc7ZDXwwWeNyAg.zovjsfZShedb6fADVLXQeQnAsgFI02NbJLCnv95DIYUg.PNG/%EC%9D%B4%EC%84%B8%EB%8F%8C_kissing_you.png?type=w800',
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMjNfMTc0/MDAxNzExMTkxNTA2MzU2.HXTC3mVpIemVi07f036Bl3KRB5kIcxmsFhZ7z5LxDQUg.MbcijwHKzwzZHoI4llFhdL-cI9zrz6IBvt-ApTFj5asg.PNG/%EC%9D%B4%EC%84%B8%EB%8F%8C_kissing_you3.png?type=w800',
  ],
  board: '통합 BEST 팬아트 게시판',
  category: '',
  title: 'Kissing you',
  author: 'WAMELL',
  prof_url:
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMDlfMzAg/MDAxNzA5OTEwMTY5NTY2.SKraP8r6-tuNO1xd9JX5smJpnfx4dhPV5E-NQYo2mFsg.2_QVNusHwoez0WjYPdxflWclp6XMOh9Abs1UEm_DA54g.JPEG/%EB%A6%B4%ED%8C%8C_%EC%83%9D%EC%9D%BC.jpg?type=w800',
  content:
    '\n\n\n\n\n\n\n\n\n이세돌 팬아트 수위 규정 : https://cafe.naver.com/steamindiegame/4685397\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n​\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n​\n\n\n\n \n\n',
  date: '2024.03.23. 19:26',
  view: 7568,
  like: 1411,
  comment: 217,
  deleted: false,
  source: null,
  is_shukkou: false,
  is_hyum: false,
};
export default function Artwork() {
  const [imgUrl, setImageUrl] = useState(dummyData2.img_url);
  const article_link = useResponsiveLink('', 'article');
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/gallery/${value}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('갤러리 링크 복사됨');
    });
  };

  const handleClickOtherImage = (imgSrc: string) => {
    setImageUrl(imgSrc);
  };
  return (
    <Box w="100%" h="100%" display="flex" flexDir="column" pt="50px">
      {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
      <Box
        w="100%"
        minH="40vh"
        display="flex"
        flexDir={['column', 'column', 'row']}
        gap="1rem"
        justifyContent="center"
        alignItems={['center', 'center', 'flex-start']}
      >
        {/* 좌측 이미지 */}
        <Box w="508px" h="100%" display="flex" flexDir="column">
          <Image
            // fill
            priority
            quality={100}
            width={508}
            height={633}
            src={imgUrl}
            alt={dummyData2.title}
            style={{
              objectFit: 'cover',
              borderRadius: '20px',
            }}
            // unoptimized
          />
          <Box
            display="flex"
            flexDir="row"
            gap="0.5rem"
            mt="0.5rem"
            justifyContent="center"
            alignItems="center"
          >
            {dummyData2.img_url_list.map((src, idx) => (
              <button key={idx} onClick={() => handleClickOtherImage(src)}>
                <Image
                  // fill
                  priority
                  width={100}
                  height={130}
                  src={src}
                  alt={dummyData2.title}
                  style={{
                    width: '100px',
                    height: '130px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                  }}
                  unoptimized
                />
              </button>
            ))}
          </Box>
        </Box>
        {/* 우측 세부 정보 */}
        <Box w="508px" display="flex" flexDir="column" px="0.5rem" my="1rem">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            py="0.5rem"
          >
            <Button
              display="flex"
              flexDir="row"
              gap="0.5rem"
              alignItems="center"
              borderRadius="800px"
              onClick={handleCopyLink}
            >
              <FaShare />
              <Text>공유</Text>
            </Button>
            <Link
              // className={styles.btns}
              href={article_link + dummyData2.id}
              target="_blank"
            >
              <Box
                // className={styles.textBox}
                // w="100%"
                h="2.5rem"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap="0.5rem"
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'pink.400',
                  color: 'rgba(0, 0, 0, 0.7)',
                }}
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="800px"
                background="linear-gradient(92deg, #FF4195 0%, #FF72B0 100%)"
                padding="0 1rem"
                color="white"
                transition="all 0.2s ease-in-out"
              >
                <Text>왁물원</Text>
                <FaChevronRight />
              </Box>
            </Link>
          </Box>
          <Heading
            mt="12px"
            as="h3"
            size="lg"
            // _hover={{ color: 'rgba(0,0,0,.7)' }}
            textAlign="start"
            // className={styles.mainTitle}
          >
            {dummyData2.title}
          </Heading>
          <Box mt="12px">
            <Text>{dummyData2.board.replace(/&#\d+;/g, '').trim()}</Text>
          </Box>
          <Box mt="12px">
            <Text>{dummyData2.date}</Text>
          </Box>
          <Box
            mt="12px"
            display="flex"
            flexDir="row"
            alignItems="center"
            gap="0.5rem"
          >
            <Image
              // fill
              priority
              width={100}
              height={100}
              src={dummyData2.prof_url}
              alt={dummyData2.author}
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              unoptimized
            />
            <Text>{dummyData2.author}</Text>
          </Box>
          <Box mt="12px">
            <SocialStats
              view={dummyData2.view}
              like={dummyData2.like}
              comment={dummyData2.comment}
            />
          </Box>
          {/* <Box mt="12px">
            <Text>
              {dummyData2.content.length > 400
                ? `${dummyData2.content.slice(0, 300)}...`
                : dummyData2.content}
            </Text>
          </Box> */}
        </Box>
      </Box>
      {/* 하단(유사이미지 추천) */}
      <Box
        w="100%"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="62px"
      >
        <Heading as="h4" size="md">
          유사 이미지 추천
        </Heading>
      </Box>
    </Box>
  );
}
