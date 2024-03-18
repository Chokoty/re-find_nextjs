'use client';

import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import ThisWeekBtnList from '@/components/gallery/ThisWeekBtnList';
import members from '@/data/members';

const thisWeekTop = ['전체', '이세돌', '고멤', '우왁굳', '금손 작가들의 방'];

export default function ThisWeekTopSection() {
  const [selectedItem, setSelectedItem] = useState('전체');

  return (
    <Box>
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
        <Text
          textAlign="left"
          fontWeight="bold"
          fontSize={['md', '2xl', '4xl']}
        >
          이 주의 왁물원 인기 팬아트!
        </Text>
        <Box
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
        </Box>
      </Box>
      <ThisWeekBtnList
        type="link"
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />
    </Box>
  );
}
