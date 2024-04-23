import Link from 'next/link';

// TODO: ONE-Mobile-POP 폰트 최적화 필요 feat) fonts.ts
export default function Title() {
  return (
    <Link href="/" className="no-underline">
      <h2 className="flex items-center justify-center text-center font-['ONE-Mobile-POP'] text-[60px] font-bold leading-tight 2xs:text-[70px] md:text-[85px] lg:text-[100px]">
        <span className="text-green-highlight dark:text-pink-highlight">
          RE:
        </span>
        FIND
      </h2>
    </Link>
  );
}
