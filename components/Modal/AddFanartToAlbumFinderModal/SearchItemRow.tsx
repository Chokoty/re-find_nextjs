import Image from 'next/image';

import Checkbox from '@/components/Checkbox';

type Props = {
  item: SearchItem;
  toggleSelection: (id: number) => void;
  isSelected: boolean;
  disabled?: boolean;
};

export default function SearchItemRow({
  item,
  toggleSelection,
  isSelected,
  disabled = false,
}: Props) {
  const { id, title, img_url, date, author, board } = item;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    toggleSelection(id);
  };
  const handleRowClick = () => {
    if (disabled) return;
    toggleSelection(id);
  };

  return (
    <div
      onClick={handleRowClick}
      className={`mb-4 flex w-full cursor-pointer items-center justify-between gap-1 overflow-hidden rounded-md border-b-base border-gray-300 px-0.5 pb-1 transition-all duration-300 dark:border-whiteAlpha-300 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 2xs:px-2 ${
        disabled ? 'pointer-events-none opacity-70' : ''
      }`}
    >
      <Checkbox
        name={`searchitem-select-${id}`}
        onChange={handleCheckboxChange}
        defaultChecked={isSelected}
        disabled={disabled}
        shape="circle"
        checkedBgColor="bg-green-200"
        onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 Row 클릭 이벤트 방지
      />
      <div className="flex w-full items-center gap-4">
        <div className="flex size-[60px] flex-none items-center justify-center overflow-hidden rounded-md border-base border-blackAlpha-200 dark:border-none">
          <Image
            width={60}
            height={60}
            src={img_url}
            alt={title}
            className="rounded-lg bg-[#f5f5f5] object-cover transition"
            priority
            unoptimized
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex min-w-0 flex-1 flex-col items-start">
            <p className="truncate text-start text-lg">{title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-blackAlpha-800 dark:text-whiteAlpha-800 min-[698px]:text-base">
              <p className="truncate hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600">
                {author ?? '-'}
              </p>
              <p>·</p>
              <p className="truncate text-blackAlpha-700 dark:text-whiteAlpha-700">
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
    </div>
  );
}
