import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PageButton({
  text,
  path,
}: {
  text: string;
  path: string;
}) {
  const currentPath = usePathname(); // 현재 경로 가져오기
  const isGallerySelected =
    path === '/gallery' &&
    (currentPath === '/' || currentPath.startsWith('/gallery')); // 루트 또는 /gallery일 때 선택
  const isSelected = isGallerySelected || currentPath.startsWith(path); // 나머지는 일반적인 경로 비교

  return (
    <Link href={path}>
      <button
        className={`flex h-10 min-w-16 items-center justify-center rounded-full px-3 py-1 text-base ${
          isSelected
            ? 'bg-whiteAlpha-900 text-blackAlpha-900' // 선택된 버튼 스타일
            : 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 group-hover:bg-light-card-2 dark:bg-dark-card-2 dark:hover:bg-dark-card-3'
        }`}
      >
        {text}
      </button>
    </Link>
  );
}
