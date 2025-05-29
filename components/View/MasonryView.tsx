import Measure from 'react-measure';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import MasonryCard from '@/components/Card/MasonryCard';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
  isIsdPick?: boolean;
  isSideMenuOpen?: boolean;
};

export default function MasonryView({
  artworks,
  isDeletedVisible,
  isIsdPick = false,
  isSideMenuOpen = false,
}: Props) {
  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork) => (
        <Measure key={artwork.id}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <MasonryCard
                key={artwork.id}
                artwork={artwork}
                isIsdPick={isIsdPick}
              />
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
                <MasonryCard
                  key={artwork.id}
                  artwork={artwork}
                  isIsdPick={isIsdPick}
                />
              </div>
            )}
          </Measure>
        ) : null
      );
    }
  };

  const columnsCountBreakPoints = isSideMenuOpen
    ? {
        349: 1,
        739: 2,
        983: 3,
        1184: 4,
        1421: 5,
        1658: 6,
        1959: 7,
        2203: 8,
      }
    : {
        349: 2,
        739: 3,
        983: 4,
        1184: 5,
        1421: 6,
        1658: 7,
        1959: 8,
        2203: 9,
      };

  return (
    <ResponsiveMasonry
      className="w-full"
      columnsCountBreakPoints={columnsCountBreakPoints}
    >
      <Masonry gutter="10px">{content()}</Masonry>
    </ResponsiveMasonry>
  );
}
