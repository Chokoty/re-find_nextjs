export default function PageButton({ text }: { text: string }) {
  return (
    <button
      className="flex h-8 items-center justify-center rounded-full bg-gray-600 px-3 py-1 text-white hover:bg-gray-700 active:bg-gray-800 group-hover:bg-light-card-2 dark:bg-dark-card-2 dark:hover:bg-dark-card-3"
      // onClick={handleCopyLink}
    >
      <p className="text-sm">{text}</p>
    </button>
  );
}
