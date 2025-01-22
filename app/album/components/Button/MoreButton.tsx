import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

export default function MoreButton() {
  return (
    <div className="flex items-center justify-center">
      <Link
        href="/gallery/weekRanking"
        className="flex flex-col items-center justify-center gap-1"
      >
        <CiCirclePlus size="100" />
        <p>더보기</p>
      </Link>
    </div>
  );
}
