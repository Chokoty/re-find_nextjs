import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { path: '/gallery', name: '갤러리', width: 12 },
  { path: '/artists', name: '작가', width: 8 },
];

// gallery or artists 페이지일 경우만 isActive style 적용
export default function DesktopHeaderTab() {
  const currentPathname = usePathname();
  const isInGalleryOrArtists =
    currentPathname.includes('/gallery') ||
    currentPathname.includes('/artists');
  const getSpanClassName = (width: number, tabPath: string) => {
    if (isInGalleryOrArtists) {
      return clsx(
        `w-${width} inline-block text-center font-bold hover:text-blackAlpha-900 dark:hover:text-whiteAlpha-900`,
        {
          'text-blackAlpha-900 dark:text-whiteAlpha-900':
            currentPathname === tabPath,
          'text-blackAlpha-600 dark:text-whiteAlpha-600':
            currentPathname !== tabPath,
        }
      );
    }

    return `w-${width} inline-block text-center font-bold hover:text-blackAlpha-900 dark:hover:text-whiteAlpha-900 text-blackAlpha-900 dark:text-whiteAlpha-900`;
  };
  return (
    <div className="mr-3 hidden items-center md:flex">
      {tabs.map(({ path: tabPath, name, width }) => (
        <div
          key={tabPath}
          className="relative flex w-[60px] items-center justify-center"
        >
          <Link href={tabPath}>
            <span className={getSpanClassName(width, tabPath)}>{name}</span>
          </Link>
          {currentPathname === tabPath && (
            <div
              className={`w-${width} absolute bottom-[-6px] h-0.5 rounded-sm bg-green-highlight dark:bg-pink-highlight`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
