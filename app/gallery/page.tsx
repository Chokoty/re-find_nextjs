'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import { darkMode, lightMode } from '@/styles/theme';

const topTitle = {
  title: '팬아트 갤러리',
  description: '왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.',
};

export default function IsdPage() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isAprilFool = useState(false);

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
          type="link"
          range={{ start: 0, end: 8 }}
          selected={null}
          setSelected={null}
          isdPick={false}
        />
      </Box>
      <AlbumGrid />
    </Box>
  );
}
