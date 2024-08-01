'use client';

import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function MyConfetti() {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 top-[60px] z-[201] size-full">
      <Confetti width={width} height={height} />
    </div>
  );
}
