import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  // { path: '/gallery', name: '갤러리', width: 'w-12' },
  { path: '/artists', name: '작가', width: 'w-8' },
];

// gallery or artists 페이지일 경우만 isActive style 적용
export default function DesktopHeaderTab() {
  const currentPathname = usePathname();
  const isInGallery = currentPathname.includes('/gallery');
  const isInArtist = currentPathname.includes('/artists');
  const isInGalleryOrArtists = isInGallery || isInArtist;

  const getSpanClassName = (width: string, tabPath: string) => {
    if (isInGalleryOrArtists) {
      return clsx(
        `${width} inline-block text-center font-bold hover:text-blackAlpha-900 dark:hover:text-whiteAlpha-900`,
        {
          'text-blackAlpha-900 dark:text-whiteAlpha-900':
            currentPathname.includes(tabPath),
          'text-blackAlpha-600 dark:text-whiteAlpha-600':
            !currentPathname.includes(tabPath),
        }
      );
    }

    return `${width} inline-block text-center font-bold hover:text-blackAlpha-900 dark:hover:text-whiteAlpha-900 text-blackAlpha-900 dark:text-whiteAlpha-900`;
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
          {isInGalleryOrArtists && (
            <div
              className={clsx(
                `absolute bottom-[-6px] h-0.5 rounded-sm bg-green-highlight dark:bg-pink-highlight`,
                {
                  [width]: currentPathname.includes(tabPath),
                }
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
