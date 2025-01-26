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
  const isSelected =
    currentPath.startsWith(path) ||
    (path === '/gallery' && currentPath.startsWith('/album')); // 경로가 path로 시작하는지 확인

  return (
    <Link href={path}>
      <button
        className={`flex h-8 items-center justify-center rounded-full px-3 py-1 text-sm ${
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
