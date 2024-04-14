import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import Link from 'next/link';

import styles from '@/app/artists/components/ui/Card/ArtistCard.module.scss';
import SortTypeIcons from '@/components/ui/IconGroup/SortTypeIcons';
import ViewTypeIcons from '@/components/ui/IconGroup/ViewTypeIcons';
import { useResponsive } from '@/hooks/useResponsive';
import { darkMode, lightMode } from '@/lib/theme';
import type { SortCriteria } from '@/types';

type Props = {
  artist: AuthorInfo;
  highlightedText: string;
  sortCriteria: SortCriteria;
  selectedView: keyof AuthorCommon | null;
  nth: number;
};

export default function ArtistCard({
  artist,
  highlightedText,
  nth,
  sortCriteria,
  selectedView,
}: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const imgValue = useBreakpointValue({ base: '4rem', md: '6rem' });
  const { nick, prof_url } = artist;
  const isMobile = useResponsive();
  return (
    <Link href={`/artists/${nick}`} prefetch={false} className={styles.box}>
      <Box
        backgroundColor={bg2}
        _hover={{
          backgroundColor: bg3,
        }}
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
            {nth <= 100 ? nth : '-'}
          </Text>
          <Box w={imgValue} h={imgValue}>
            <NextImage
              // fill
              // sizes="(min-width: 767px) 66px, 100px"
              width={100}
              height={100}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                width: imgValue,
                height: imgValue,
                // marginRight: '1rem',
              }}
              src={prof_url}
              alt={nick}
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
            <Text
              fontSize="lg"
              fontWeight="bold"
              dangerouslySetInnerHTML={{
                __html: highlightedText,
              }}
            />
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
          className={styles.viewTypeIconsContainer}
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
      </Box>
    </Link>
  );
}
