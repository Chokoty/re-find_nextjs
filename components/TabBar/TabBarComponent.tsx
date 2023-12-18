import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { CgMoreO } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa6';
import { IoPersonCircle } from 'react-icons/io5';
import { MdHomeFilled, MdPerson } from 'react-icons/md';

const TabBarComponent = ({ tab, setTab }) => {
  const getButtonColor = (buttonName) => {
    return tab === buttonName ? '#FFFFFF' : '#828282';
  };

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
        // p="0.5rem"
        width="300px"
        height="60px"
        justifyContent="center"
        alignItems="center"
        borderRadius="2rem"
        gap="2rem"
        boxShadow="dark-lg"
      >
        <NextLink href="/" passHref>
          <Link
            style={{
              color: getButtonColor('home'),
              width: '2.5rem',
              height: '2.5rem',
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
              width: '2.5rem',
              height: '2.5rem',
            }}
            onClick={() => setTab('search')}
          >
            <FaSearch
              style={{
                color: getButtonColor('search'),
                width: '1.8rem',
                height: '1.8rem',
              }}
            />
          </Link>
        </NextLink>
        <NextLink href="/artworks" passHref>
          <Link
            style={{
              color: getButtonColor('artworks'),
              width: '2.5rem',
              height: '2.5rem',
            }}
            onClick={() => setTab('artworks')}
          >
            <FaImage
              style={{
                color: getButtonColor('artworks'),
                width: '1.8rem',
                height: '1.8rem',
              }}
            />
          </Link>
        </NextLink>
        <NextLink href="/artists" passHref>
          <Link
            style={{
              color: getButtonColor('artists'),
              width: '2.5rem',
              height: '2.5rem',
            }}
            onClick={() => setTab('artists')}
          >
            <MdPerson
              style={{
                color: getButtonColor('artists'),
                width: '2rem',
                height: '2rem',
              }}
            />
            {/* <CgMoreO
              style={{
                color: getButtonColor('more'),
                width: '2rem',
                height: '2rem',
              }}
            /> */}
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

export default TabBarComponent;
