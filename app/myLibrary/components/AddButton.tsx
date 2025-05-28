import { FaPlus } from 'react-icons/fa';

export default function AddButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button className="m-auto flex h-[178px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[212px] md:w-full md:max-w-[180px]">
      <div
        className="flex size-[120px] items-center justify-center rounded-lg bg-gray-100 md:size-[156px]"
        onClick={handleClick}
      >
        <FaPlus size="50" className="text-black-200" />
      </div>
      <p className="line-clamp-1 w-full pr-0 text-center text-base font-bold dark:text-white md:pr-3">
        앨범 만들기
      </p>
    </button>
  );
}
