import Measure from 'react-measure';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import MasonryCard from '@/components/card/MasonryCard';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
};

export default function MasonryView({ artworks, isDeletedVisible }: Props) {
  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork) => (
        <Measure key={artwork.id}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <MasonryCard key={artwork.id} artwork={artwork} />
            </div>
          )}
        </Measure>
      ));
    }

    if (!isDeletedVisible) {
      return artworks.map((artwork) =>
        !artwork.deleted ? (
          <Measure key={artwork.id}>
            {({ measureRef }) => (
              <div
                ref={measureRef}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MasonryCard key={artwork.id} artwork={artwork} />
              </div>
            )}
          </Measure>
        ) : null
      );
    }
  };

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 2,
        590: 3,
        830: 4,
        1110: 5,
        1350: 6,
        1528: 7,
        1792: 8,
      }}
    >
      <Masonry gutter="10px">{content()}</Masonry>
    </ResponsiveMasonry>
  );
}
