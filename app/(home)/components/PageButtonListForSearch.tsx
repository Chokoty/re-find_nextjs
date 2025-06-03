import PageButton from '@/app/(home)/components/PageButton';

const buttons = [
  { text: '갤러리', path: '/album' },
  { text: '작가', path: '/artists' },
];

export default function PageButtonListForSearch() {
  return (
    <div className="sticky top-0 z-20 mb-1 flex h-16 w-full items-center justify-start gap-2 bg-white py-4 pl-8 shadow-md transition-colors dark:bg-dark-card">
      {buttons.map((button, index) => (
        <PageButton key={index} text={button.text} path={button.path} />
      ))}
    </div>
  );
}
