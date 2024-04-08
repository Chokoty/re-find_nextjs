'use client';

import { Box, Button, Heading, Text, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaChevronRight, FaShare } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

import SocialStats from '@/components/search/SocialStats';
import { useResponsiveLink } from '@/hook/useResponsiveLink';

import RecommendArtworks from './RecommendArtworks';
import ImageSlider from './ImageSlider';

export default function Artwork({ data }: { data: ArtworkDetail }) {
  const {
    id,
    title,
    img_url,
    img_url_list,
    author,
    board,
    category,
    comment,
    date,
    deleted,
    prof_url,
    url,
    like,
    view,
  } = data;
  const [imgUrl, setImageUrl] = useState(img_url);
  const article_link = useResponsiveLink('', 'article');
  const { colorMode } = useColorMode();
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
    <Box w="100%" h="100%" display="flex" flexDir="column" px="20px" py="50px">
      {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
      <Box
        w="100%"
        minH="40vh"
        display="flex"
        flexDir={['column', 'column', 'row']}
        gap="1rem"
        justifyContent="center"
        alignItems={['center', 'center', 'flex-start']}
        padding={['1rem', '0']}
      >
        {/* 좌측 이미지 */}
        <Box
          w={['100%', '100%', '508px']}
          h="100%"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Image
            // fill
            priority
            quality={100}
            width={508}
            height={633}
            src={imgUrl}
            alt={title}
            style={{
              objectFit: 'cover',
              borderRadius: '20px',
              background: '#f5f5f5',
              border:
                colorMode === 'dark' ? 'none' : '1px solid rgba(0,0,0,.102)',
            }}
            // unoptimized
          />
          <Box
            w="100%"
            // gap="0.5rem"
            mt="0.5rem"
          >
            <ImageSlider
              urls={img_url_list}
              handleClickImage={handleClickOtherImage}
            />
          </Box>
        </Box>
        {/* 우측 세부 정보 */}
        <Box
          w={['100%', '100%', '508px']}
          display="flex"
          flexDir="column"
          px="0.5rem"
          my="1rem"
        >
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
              href={article_link + id}
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
            {title}
          </Heading>
          <Box mt="12px">
            <Text>{board.replace(/&#\d+;/g, '').trim()}</Text>
          </Box>
          <Box mt="12px">
            <Text>{date}</Text>
          </Box>
          <Box
            mt="12px"
            display="flex"
            flexDir="row"
            alignItems="center"
            gap="0.5rem"
          >
            {prof_url ? (
              <Image
                // fill
                priority
                width={100}
                height={100}
                src={prof_url}
                alt={author ?? '작가 프로필 이미지'}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                unoptimized
              />
            ) : (
              <FaCircleUser size="3rem" />
            )}
            <Text>{author ?? '알 수 없음'}</Text>
          </Box>
          <Box mt="12px">
            <SocialStats view={view} like={like} comment={comment} />
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
      <RecommendArtworks />
    </Box>
  );
}
