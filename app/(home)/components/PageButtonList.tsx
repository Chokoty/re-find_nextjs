import PageButton from '@/app/(home)/components/PageButton';

export default function PageButtonList() {
  return (
    <div className="mb-1 flex h-16 w-full items-center justify-start gap-2 pl-8">
      <PageButton text="갤러리" />
      <PageButton text="작가" />
      <PageButton text="이벤트" />
    </div>
  );
}
