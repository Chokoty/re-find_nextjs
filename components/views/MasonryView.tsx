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
        300: 2,
        756: 3,
        1008: 4,
        1260: 5,
        1528: 6,
        1792: 7,
      }}
    >
      <Masonry gutter="10px">{content()}</Masonry>
    </ResponsiveMasonry>
  );
}
