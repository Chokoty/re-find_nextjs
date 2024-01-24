import { Box, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
// import { CgMoreO } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa6';
// import { IoPersonCircle } from 'react-icons/io5';
import { MdHomeFilled, MdPerson } from 'react-icons/md';

const routerList = {
  home: '/',
  search: '/search',
  gallery: '/gallery',
  artists: '/artists',
};

const iconStyle = {
  width: '2rem',
  height: '2rem',
};

const IconComponent = ({ router }) => {
  switch (router) {
    case 'home':
      return <MdHomeFilled style={iconStyle} />;
    case 'search':
      return <FaSearch style={iconStyle} />;
    case 'gallery':
      return <FaImage style={iconStyle} />;
    case 'artists':
      return <MdPerson style={iconStyle} />;
    default:
      return null;
  }
};

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
        {Object.keys(routerList).map((router) => (
          <NextLink href={routerList[router]} passHref key={router}>
            <Box
              color={getButtonColor(router)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => setTab(router)}
            >
              <IconComponent router={router} />
            </Box>
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};

export default TabBarComponent;
