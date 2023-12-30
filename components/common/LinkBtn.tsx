import { Button, Flex } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import { FaYoutube } from 'react-icons/fa';

const XButton = () => (
  <Button
    href="https://twitter.com/rerurureruru"
    as="a"
    borderRadius={8}
    target="_blank"
    width="32px"
    mr="2.5"
    p="0"
    colorScheme="black"
    bg="black"
    shadow="md"
  >
    <NextImage
      width={18}
      height={18}
      src="/static/icons/twitter-x-logo.png"
      alt="twitter-x"
      style={{ filter: 'invert(100%)' }}
    />
  </Button>
);

const WakzooButton = () => (
  <Button
    className="link-to-wakzoo"
    width="32px"
    borderRadius={8}
    p="0"
    mr="2.5"
    href="https://cafe.naver.com/steamindiegame"
    colorScheme="green"
    bg="#FFFFFF"
    as="a"
    target="_blank"
    shadow="md"
  >
    <NextImage
      width={60}
      height={60}
      src="/static/icons/wakzoo-logo.png"
      alt="naver-cafe-logo"
    />
  </Button>
);

const YoutubeButton = () => (
  <Button
    width="32px"
    borderRadius={8}
    p="0"
    mr="2.5"
    href="https://www.youtube.com/@waktaverse"
    colorScheme="red"
    bg="#FF0000"
    as="a"
    target="_blank"
    shadow="md"
  >
    <FaYoutube
      color="white"
      style={{
        width: '20px',
        height: '20px',
        padding: '0',
      }}
    />
  </Button>
);

const GithubButton = () => (
  <Button
    width="32px"
    borderRadius={8}
    p="0"
    mr="2.5"
    href="https://github.com/re-find-WAKTAVERSE"
    bg="#eee"
    as="a"
    target="_blank"
    shadow="md"
  >
    <svg
      aria-hidden="true"
      className="octicon octicon-mark-github"
      height="24"
      version="1.1"
      viewBox="0 0 16 16"
      width="24"
      color="#333"
    >
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      ></path>
    </svg>
  </Button>
);

const WaksplorerButton = () => (
  <Button
    href="https://waktaver.se/"
    as="a"
    target="_blank"
    width="32px"
    mr="2.5"
    p="0"
    colorScheme="white"
    bg="#fff"
    shadow="md"
  >
    <NextImage
      width={30}
      height={30}
      src="/static/icons/waksplorer-logo.png"
      alt="twitter-x"
    />
  </Button>
);

const LinkBtns = () => {
  return (
    <Flex
      w="100%"
      mb="20px"
      p="10px 0"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <WakzooButton />
      <YoutubeButton />
      <WaksplorerButton />
      {/* <XButton /> */}
      <GithubButton />
    </Flex>
  );
};

export default LinkBtns;

// const GithubIcon = () => (
//   <Box
//     width="36px"
//     height="36px"
//     backgroundImage="url('/static/icons/search-icon.svg')"
//     backgroundPosition="center"
//     backgroundSize="contain"
//   />
// );
