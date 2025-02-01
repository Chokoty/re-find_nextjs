import { FaPlus } from 'react-icons/fa';

export default function AddButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div className="flex h-[200px] w-full items-center justify-center 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px]">
      <button
        className="flex size-full items-center justify-center rounded-2xl bg-gray-100"
        onClick={handleClick}
      >
        <FaPlus size="50" className="text-black-200" />
      </button>
    </div>
  );
}
