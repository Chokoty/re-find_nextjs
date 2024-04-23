import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function DesktopHeaderTab() {
  const pathname = usePathname();
  const isCurrentPath = (path: string) => pathname === path;
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  return (
    <div className="mr-3 hidden items-center md:flex">
      {/* 갤러리 탭 */}
      <div className="relative flex w-[60px] items-center justify-center">
        <Link href="/gallery">
          <span
            className={clsx('w-12 text-center font-bold', {
              'hover:text-whiteAlpha-800': isDarkMode,
              'text-whiteAlpha-800': isDarkMode && isCurrentPath('/gallery'),
              'text-whiteAlpha-600': isDarkMode && !isCurrentPath('/gallery'),
            })}
          >
            갤러리
          </span>
        </Link>
        {isCurrentPath('/gallery') && (
          <div className="absolute bottom-[-6px] h-0.5 w-8 rounded-sm bg-green-highlight dark:bg-pink-highlight" />
        )}
      </div>
      {/* 작가 탭 */}
      <div className="relative flex w-[60px] items-center justify-center">
        <Link href="/artists">
          <span
            className={clsx('w-8 text-center font-bold', {
              'hover:text-whiteAlpha-800': isDarkMode,
              'text-whiteAlpha-800': isDarkMode && isCurrentPath('/artists'),
              'text-whiteAlpha-600': isDarkMode && !isCurrentPath('/artists'),
            })}
          >
            작가
          </span>
        </Link>
        {isCurrentPath('/artists') && (
          <div className="absolute bottom-[-6px] h-0.5 w-6 rounded-sm bg-green-highlight dark:bg-pink-highlight" />
        )}
      </div>
    </div>
  );
}
