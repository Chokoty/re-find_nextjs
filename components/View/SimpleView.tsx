import SimpleCards from '@/components/Card/SimpleCards';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
};

export default function SimpleView({ artworks, isDeletedVisible }: Props) {
  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork, index) => (
        <SimpleCards key={index} artwork={artwork} />
      ));
    }
    return artworks.map((artwork, index) =>
      !artwork.deleted ? <SimpleCards key={index} artwork={artwork} /> : null
    );
  };

  return (
    <div className="grid w-full grid-cols-2 gap-2 2xs:gap-2.5 min-[600px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1150px]:grid-cols-5 min-[1330px]:grid-cols-6 min-[1550px]:grid-cols-7 min-[1900px]:grid-cols-8">
      {content()}
    </div>
  );
}
