import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import Link from 'next/link';
import React from 'react';

import SortTypeIcons from '@/components/artist/SortTypeIcons';
import ViewTypeIcons from '@/components/artist/ViewTypeIcons';
import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';
import type { AuthorInfoWithName, Sort, SortCriteria, View } from '@/types';

type Props = {
  visibleArtists: AuthorInfoWithName[];
  sortCriteria: SortCriteria;
  sortTypes: Sort[];
  viewTypes: View[];
  selectedView: keyof AuthorCommon | null;
  alert: boolean;
};

export default function ArtistsList({
  visibleArtists,
  sortCriteria,
  selectedView,
  alert,
}: Props) {
  const isMobile = useResponsive();
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const imgValue = useBreakpointValue({ base: '4rem', md: '6rem' });

  return (
    <Box
      mt="1rem"
      p="1rem"
      w="100%"
      maxW="1024px"
      m="0 auto"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      backgroundColor={bg2}
      borderRadius="1rem"
    >
      {/* {filteredArtists.map((artist, index) => (
            <div key={index}>{highlightText(artist.name, searchTerm)}</div>
          ))} */}
      {visibleArtists.map(
        (artist, index) =>
          !artist.name.includes('탈퇴회원') && (
            <Link
              key={index}
              href={`/artists/${artist.name}`}
              passHref
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                backgroundColor={bg2}
                _hover={{
                  backgroundColor: bg3,
                }}
                key={index}
                w="100%"
                mb="1rem"
                // p={['0.5rem', '1rem', '1rem']}
                p="1rem"
                mt="1rem"
                h="100%"
                minH={['250px', '150px', '126px']}
                display="flex"
                flexDirection={['column', 'column', 'row']}
                alignItems="center"
                justifyContent={['center', 'center', 'space-between']}
                borderRadius="1rem"
                gap="1rem"
              >
                <Box
                  display="flex"
                  flexDirection={['column', 'row', 'row']}
                  // flexDirection="row"
                  alignItems="center"
                  gap="1rem"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {index <= 100 ? index + 1 : '-'}
                  </Text>
                  <Box w={imgValue} h={imgValue} pos="relative">
                    <NextImage
                      fill
                      sizes="(min-width: 767px) 66px, 100px"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: imgValue,
                        height: imgValue,
                        // marginRight: '1rem',
                      }}
                      src={artist.prof_url}
                      alt={artist.name}
                      unoptimized
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    gap="0.5rem"
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {artist.name}
                    </Text>
                    {!isMobile && (
                      <SortTypeIcons
                        sortCriteria={sortCriteria}
                        // sortTypes={sortTypes}
                        artist={artist}
                        component={'inIndex'}
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="1rem"
                  w="100%"
                >
                  {isMobile && (
                    <SortTypeIcons
                      sortCriteria={sortCriteria}
                      // sortTypes={sortTypes}
                      artist={artist}
                      component={'inIndex'}
                    />
                  )}
                  <ViewTypeIcons
                    // viewTypes={viewTypes}
                    selectedView={selectedView}
                    artist={artist}
                    component={'inIndex'}
                    onSelectViewType={null}
                  />
                </Box>
              </Button>
            </Link>
          )
      )}
      {/* Observer를 위한 div
      {<Box ref={ref} w="100%" h="2rem"></Box>} */}
      {alert === true && (
        <Alert status="error" w="100%" borderRadius="1rem" maxW="500px">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription textAlign="start">
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
}
