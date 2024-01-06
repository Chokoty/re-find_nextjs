import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.',
  };

  return (
    <Box
      p="1rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w="100%"
    >
      <PageTitle topTitle={topTitle} />
      <Box
        // m="1.5rem 1rem"
        mt="2rem"
        p="0 1rem"
        background={bg2}
        borderRadius="1rem"
        w="95%"
        h="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MemberButtonList
          members={members}
          type="link"
          range={{ start: 0, end: 7 }}
          selected={null}
          setSelected={null}
          isdPick={false}
        />
      </Box>
      <AlbumGrid gallery={gallery} />
    </Box>
  );
};

export default Artworks;
