// components/AlbumGrid.tsx (예시)
import Image from 'next/image';
import Link from 'next/link';

export default function AlbumGrid({ albums }: { albums: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {albums.map((album) => (
        <Link
          key={album.id}
          href={`/album/${album.id}?viewType=masonry`}
          className="rounded-md bg-white p-2 shadow hover:shadow-md dark:bg-dark-card"
        >
          <div className="aspect-square relative w-full overflow-hidden rounded">
            <Image
              src={
                album.cover_image === ''
                  ? 'https://placehold.co/300x300'
                  : album.cover_image
              }
              alt={album.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="mt-2 truncate text-center text-sm font-medium">
            {album.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
