import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

import MemberButtonList from '@/components/gallery/MemberButtonList';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  type: string;
  range: { start: number; end: number };
  selected: string | null;
  setSelected: ((value: string) => void) | null;
  isdPick: boolean;
};

export default function MemberAlbumSection() {
  const [selectedItem, setSelectedItem] = useState('전체');
  const hexToRGBA = (hex: string, alpha: number) => {
    // 헥사코드를 2자리씩 나누어 각각의 R, G, B 값을 추출
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // rgba 형식으로 반환
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  return (
    <Box padding="0 2rem" mt="120px">
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
        <Text textAlign="left" fontWeight="800" fontSize={['xl', 'xl', '40px']}>
          멤버별 앨범 모아보기
        </Text>
        {/* <Box
          w={['2rem', '2.5rem', '3rem']}
          h={['2rem', '2.5rem', '3rem']}
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
        </Box> */}
      </Box>
      <Box
        p="0 2rem"
        // background={bg2}
        background={hexToRGBA(bg2, 0.4)}
        borderRadius="1rem"
        w="100%"
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
      {/* <AlbumGrid /> */}
    </Box>
  );
}
