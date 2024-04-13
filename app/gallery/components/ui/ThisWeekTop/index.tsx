'use client';

import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import GalleryFanartSliderSkeleton from '@/app/gallery/components/skeleton/GalleryFanartSliderSkeleton';
import ThisWeekBtnList from '@/app/gallery/components/ui/ThisWeekTop/ThisWeekBtnList';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryFanartSliderSkeleton />,
  }
);

export default function ThisWeekTop() {
  const [selectedItem, setSelectedItem] = useState('전체');

  return (
    <Box w="100%" display="flex" flexDir="column" gap="30px">
      <Box
        padding="0 2rem"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        // h="80px"
      >
        <Text textAlign="left" fontWeight="800" fontSize={['xl', 'xl', '40px']}>
          이 주의 왁물원 인기 팬아트!
        </Text>
      </Box>
      <ThisWeekBtnList
        // type="link"
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />
      <GallerySlider type="fanart" />
    </Box>
  );
}
