import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import AlbumGrid from '@/components/artwork/albumGrid';
import ThisWeekBtnList from '@/components/gallery/ThisWeekBtnList';
import members from '@/data/members';
import { darkMode, lightMode } from '@/styles/theme';

const thisWeekTop = ['전체', '이세돌', '고멤', '우왁굳', '금손 작가들의 방'];

type Props = {
  type: string;
  range: { start: number; end: number };
  selected: string | null;
  setSelected: ((value: string) => void) | null;
  isdPick: boolean;
};

export default function RefindPickSection() {
  return (
    <Box padding="0 2rem">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        h="80px"
        p="0 0.5rem"
      >
        <Text textAlign="left" fontWeight="bold" fontSize={['xl', 'xl', '2xl']}>
          리파인드 추천 앨범
        </Text>
        <Box
          w={['2rem', '2rem', '2.5rem']}
          h={['2rem', '2rem', '2.5rem']}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="0.6rem"
        >
          <MdOutlineArrowForwardIos
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
        </Box>
      </Box>
      <AlbumGrid />
    </Box>
  );
}
