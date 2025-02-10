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
  const adjustedPath = path === '/album' ? '/' : path;
  const isGallerySelected = path === '/album' && currentPath === '/';
  const isSelected = isGallerySelected || currentPath.startsWith(path);

  return (
    <Link href={adjustedPath}>
      <button
        className={`flex h-10 min-w-16 items-center justify-center rounded-full px-3 py-1 text-base font-bold ${
          isSelected
            ? 'bg-gray-900 text-white dark:bg-whiteAlpha-900 dark:text-blackAlpha-900' // 선택된 버튼 스타일
            : 'bg-light-button text-blackAlpha-900 hover:bg-light-button-hover active:bg-gray-800 group-hover:bg-light-card-2 dark:bg-dark-card-2 dark:text-white dark:hover:bg-dark-card-3'
        }`}
      >
        {text}
      </button>
    </Link>
  );
}
