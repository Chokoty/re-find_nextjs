import Measure from 'react-measure';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import MasonryCard from '@/components/Card/MasonryCard';

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
                className="flex items-center justify-center"
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
      className="w-full"
      columnsCountBreakPoints={{
        350: 2,
        590: 3,
        830: 4,
        1110: 5,
        1350: 6,
        1528: 7,
        1792: 8,
        2020: 9,
      }}
    >
      <Masonry gutter="10px">{content()}</Masonry>
    </ResponsiveMasonry>
  );
}
