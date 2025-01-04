import Link from 'next/link';

import { SOURCE_URL } from '@/app/more/lib/const';
import RefindRecap from '@/app/recap2024/Components/RefindRecap';
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
      <RefindRecap />
      <div className="mb-4"></div>
    </div>
  );
}
