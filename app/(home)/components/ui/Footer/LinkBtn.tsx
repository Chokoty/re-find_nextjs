import { Button, Flex } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import { FaYoutube } from 'react-icons/fa';

import { Afreeca, Twitter, Waksplorer, Wakzoo } from '@/lib/images';

const XButton = () => (
  <Button
    href="https://twitter.com/RE_FIND_XYZ"
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
      quality={90}
      src={Twitter}
      alt="twitter-x"
      style={{ filter: 'invert(100%)' }}
    />
  </Button>
);

const AfreecaButton = () => (
  <Button
    href="https://bj.afreecatv.com/ecvhao"
    as="a"
    target="_blank"
    width="32px"
    mr="2.5"
    p="0"
    colorScheme="white"
    bg="white"
    borderRadius={8}
    shadow="md"
  >
    <NextImage
      width={30}
      height={30}
      quality={90}
      src={Afreeca}
      alt="afreeca"
      // style={{ filter: 'invert(100%)' }}
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
    bg="white"
    as="a"
    target="_blank"
    shadow="md"
  >
    <NextImage
      width={60}
      height={60}
      quality={90}
      src={Wakzoo}
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
      quality={90}
      src={Waksplorer}
      alt="waksplorer"
    />
  </Button>
);

export default function LinkBtns() {
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
      <AfreecaButton />
      <YoutubeButton />
      <WaksplorerButton />
      <XButton />
    </Flex>
  );
}
