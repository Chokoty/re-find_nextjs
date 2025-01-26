import PageButton from '@/app/(home)/components/PageButton';

const buttons = [
  { text: '갤러리', path: '/gallery' },
  { text: '작가', path: '/artists' },
  { text: '이벤트', path: '/events' },
];

export default function PageButtonList() {
  return (
    <div className="mb-1 flex h-16 w-full items-center justify-start gap-2 pl-8">
      {buttons.map((button, index) => (
        <PageButton key={index} text={button.text} path={button.path} />
      ))}
    </div>
  );
}
