import Link from 'next/link';

export default function Title() {
  return (
    <Link href="/" className="no-underline">
      <h2 className="font-pop flex items-center justify-center text-center text-[60px] font-bold leading-tight 2xs:text-[70px] md:text-[85px] lg:text-[100px]">
        <span className="text-green-highlight dark:text-pink-highlight">
          RE:
        </span>
        FIND
      </h2>
    </Link>
  );
}
