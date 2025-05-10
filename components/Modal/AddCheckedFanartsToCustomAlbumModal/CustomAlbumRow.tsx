import Image from 'next/image';

import Checkbox from '@/components/Checkbox';

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
      className={`relative mb-4 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-md border-b-base border-gray-300 px-2 pb-1 transition-all duration-300 dark:border-whiteAlpha-300 dark:hover:bg-whiteAlpha-300 ${
        disabled ? 'pointer-events-none opacity-70' : '' // ✅ hover 효과 제거
      }`}
    >
      {/* TODO: test */}
      <Checkbox
        name={`album-select-${id}`}
        onChange={handleCheckboxChange}
        defaultChecked={isSelected}
        disabled={disabled}
        shape="circle"
        checkedBgColor="bg-green-200"
        onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 Row 클릭 이벤트 방지
      >
        {/* 필요하다면 라벨 텍스트 추가 가능 */}
      </Checkbox>
      <div className="flex w-full items-center gap-4">
        <div className="flex size-14 items-center justify-center overflow-hidden rounded-md border-base border-blackAlpha-200 dark:border-none">
          <Image
            width="60"
            height="60"
            src={
              cover_image === '' ? 'https://placehold.co/375x375' : cover_image
            }
            alt={name}
            className="rounded-lg bg-[#f5f5f5] object-cover transition "
            priority
            unoptimized
          />
        </div>
        <p className="text-start text-lg">{name}</p>
      </div>
    </div>
  );
}
