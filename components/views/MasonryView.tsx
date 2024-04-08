import { Box, useBreakpointValue } from '@chakra-ui/react';
import Masonry from 'react-masonry-css';

import MasonryCard from '@/components/card/MasonryCard';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
};

export default function MasonryView({ artworks, isDeletedVisible }: Props) {
  // const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const widthValue2 = useBreakpointValue({ base: '188px', sm: '252px' });
  const breakpointColumnsObj = {
    default: 7,
    1792: 6,
    1528: 5,
    1290: 4,
    1036: 3,
    792: 2,
    556: 1,
  };

  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork, index) => (
        <MasonryCard key={index} artwork={artwork} />
      ));
    }

    if (!isDeletedVisible) {
      return artworks.map((artwork, index) =>
        !artwork.deleted ? <MasonryCard key={index} artwork={artwork} /> : null
      );
    }
  };

  return (
    <Box w="100%" mx="auto" position="relative">
      <Box
        as={Masonry}
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        {content()}
      </Box>
    </Box>
  );
}
