import ArtistRecap from '@/app/recap2024/ArtistRecap';
import { recap2024Background } from '@/lib/images';

export default function More() {
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-start bg-repeat"
      style={{
        backgroundImage: `url(${recap2024Background})`,
        backgroundSize: 'auto',
      }}
    >
      <ArtistRecap />
      <div className="mb-4"></div>
    </div>
  );
}
