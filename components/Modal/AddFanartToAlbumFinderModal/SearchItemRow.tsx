import Image from 'next/image';
import Link from 'next/link';

type Props = {
  item: SearchItem;
  toggleSelection: (id: number) => void;
  isSelected: boolean;
};

export default function SearchItemRow({
  item,
  toggleSelection,
  isSelected,
}: Props) {
  const { id, title, img_url, date, author, board, url } = item;

  const handleToggle = () => {
    toggleSelection(id);
  };

  return (
    <div
      className={`relative mb-4 flex w-full items-center justify-between overflow-hidden rounded-md border-b-base border-gray-300 px-2 pb-1 transition-all duration-300 dark:border-whiteAlpha-300 dark:hover:bg-whiteAlpha-300`}
    >
      <div className="flex items-center gap-4">
        <Link href={url} prefetch={false} target="_blank">
          <div className="size-14 w-full overflow-hidden rounded-md border-base border-blackAlpha-200 dark:border-none">
            <Image
              width="60"
              height="60"
              src={img_url}
              alt={title}
              className="rounded-lg bg-[#f5f5f5] object-cover transition hover:scale-110"
              priority
              unoptimized
            />
          </div>
        </Link>
        <div className="flex w-full flex-col">
          <div className="mb-2 flex flex-1 flex-col items-start">
            <Link href={url} prefetch={false} target="_blank">
              <p className="text-start text-lg hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600">
                {title}
              </p>
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-blackAlpha-800 dark:text-whiteAlpha-800 min-[698px]:text-base">
              <Link
                href={`/artists/${author}`}
                prefetch={false}
                target="_blank"
                className="link-to-profile"
              >
                <p className="hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600">
                  {author}
                </p>
              </Link>
              <p>·</p>
              <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                {board.replace(/&#\d+;/g, '').trim()}
              </p>
              <p>·</p>
              <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                {date.split(' ')[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleToggle}
        className={`${isSelected ? 'text-green-highlight' : ''}`}
      >
        {isSelected ? '선택 해제' : '선택'}
      </button>
    </div>
  );
}
