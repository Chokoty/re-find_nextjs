import {
  Box,
  Button,
  Flex,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa6';
import { IoPersonCircle } from 'react-icons/io5';
import { MdHomeFilled } from 'react-icons/md';

export const TabBar = () => {
  const [tab, setTab] = useState('home'); // 현재 선택된 탭의 상태

  // 버튼 색상을 결정하는 함수
  const getButtonColor = (buttonName) => {
    return tab === buttonName ? '#FFFFFF' : '#828282'; // 선택된 탭과 버튼 이름이 같으면 하얀색, 아니면 회색
  };

  const boxShadow = '0px -4px 4px rgba(0, 0, 0, 0.25)';

  return (
    <Box
      position="sticky"
      bottom="4"
      zIndex="200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        background="#292929"
        height="56px"
        width="280px"
        justifyContent="center"
        alignItems="center"
        borderRadius="2rem"
        gap="2rem"
        boxShadow={boxShadow}
      >
        <NextLink href="/" passHref>
          <Link
            style={{
              color: getButtonColor('home'),
              width: '2rem',
              height: '2rem',
            }}
            onClick={() => setTab('home')}
          >
            <MdHomeFilled
              style={{
                color: getButtonColor('home'),
                width: '2rem',
                height: '2rem',
              }}
            />
          </Link>
        </NextLink>
        <NextLink href="/search" passHref>
          <Link
            style={{
              color: getButtonColor('search'),
              width: '1.5rem',
              height: '1.5rem',
            }}
            onClick={() => setTab('search')}
          >
            <FaSearch
              style={{
                color: getButtonColor('search'),
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          </Link>
        </NextLink>
        <NextLink href="/artworks" passHref>
          <Link
            style={{
              color: getButtonColor('artworks'),
              width: '2rem',
              height: '2rem',
            }}
            onClick={() => setTab('artworks')}
          >
            <FaImage
              style={{
                color: getButtonColor('artworks'),
                width: '2rem',
                height: '2rem',
              }}
            />
          </Link>
        </NextLink>
        <NextLink href="/profile" passHref>
          <Link
            style={{
              color: getButtonColor('profile'),
              width: '2rem',
              height: '2rem',
            }}
            onClick={() => setTab('profile')}
          >
            <IoPersonCircle
              style={{
                color: getButtonColor('profile'),
                width: '2rem',
                height: '2rem',
              }}
            />
          </Link>
        </NextLink>
        {/* <Button
          variant="ghost"
          _hover={{ background: 'none' }}
          onClick={() => setTab('search')}
        >
          <FaSearch
            style={{
              color: getButtonColor('search'),
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        </Button>
        <Button
          variant="ghost"
          _hover={{ background: 'none' }}
          onClick={() => setTab('artworks')}
        >
          <FaImage
            style={{
              color: getButtonColor('artworks'),
              width: '2rem',
              height: '2rem',
            }}
          />
        </Button>
        <Button
          variant="ghost"
          _hover={{ background: 'none' }}
          onClick={() => setTab('profile')}
        >
          <IoPersonCircle
            style={{
              color: getButtonColor('profile'),
              width: '2rem',
              height: '2rem',
            }}
          />
        </Button> */}
      </Flex>
    </Box>
  );
};
