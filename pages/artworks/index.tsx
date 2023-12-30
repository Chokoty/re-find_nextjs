import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import gallary from '@/data/gallary';
import members from '@/data/members';
import { useStore } from '@/store/store';

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.',
  };

  return (
    <Box mt="10px" mb="10px" p="1rem" textAlign="center" w="100%">
      <PageTitle topTitle={topTitle} />
      <MemberButtonList
        members={members}
        type="link"
        range={null}
        selected={null}
        setSelected={null}
      />
      <AlbumGrid gallary={gallary} />
    </Box>
  );
};

export default Artworks;
