import Image from 'next/image';
import Link from 'next/link';

type Props = {
  album: CustomAlbumInfos;
  toggleSelection: (id: string) => void;
  isSelected: boolean;
  disabled?: boolean;
};

export default function CustomAlbumRow({
  album,
  toggleSelection,
  isSelected,
  disabled = false,
}: Props) {
  const { id, cover_image, name } = album;

  const handleToggle = () => {
    if (disabled) return;
    toggleSelection(id);
  };

  return (
    <div
      className={`relative mb-4 flex w-full items-center justify-between overflow-hidden rounded-md border-b-base border-gray-300 px-2 pb-1 transition-all duration-300 dark:border-whiteAlpha-300 dark:hover:bg-whiteAlpha-300 ${
        disabled ? 'pointer-events-none opacity-70' : '' // ✅ hover 효과 제거
      }`}
    >
      <div className="flex items-center gap-4">
        <Link
          href={`/album/${id}?viewType=masonry`}
          prefetch={false}
          target="_blank"
          className={disabled ? 'pointer-events-none' : ''}
        >
          <div className="size-14 w-full overflow-hidden rounded-md border-base border-blackAlpha-200 dark:border-none">
            <Image
              width="60"
              height="60"
              src={
                cover_image === ''
                  ? 'https://placehold.co/375x375'
                  : cover_image
              }
              alt={name}
              className="rounded-lg bg-[#f5f5f5] object-cover transition hover:scale-110"
              priority
              unoptimized
            />
          </div>
        </Link>
        <p className="text-start text-lg hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600">
          {name}
        </p>
      </div>
      <button
        onClick={handleToggle}
        className={`${isSelected ? 'text-green-highlight' : ''} ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={disabled}
      >
        {isSelected ? '선택 해제' : '선택'}
      </button>
    </div>
  );
}
