import { FaPlus } from 'react-icons/fa';

export default function AddButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        className="flex size-40 items-center justify-center rounded-md bg-gray-100"
        onClick={handleClick}
      >
        <FaPlus size="50" className="text-black-200" />
      </button>
    </div>
  );
}
