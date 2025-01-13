import toast from 'react-hot-toast';
import { MdShare } from 'react-icons/md';

import Button from '@/components/Button';

export default function ShareLinkButton() {
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/gallery/${value}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('링크를 클립보드에 복사했어요.');
    });
  };

  return (
    <Button
      additionalClass="bg-green-highlight dark:hover:bg-pink-400 dark:active:bg-pink-500 dark:bg-pink-highlight hover:bg-teal-500 active:bg-teal-600 rounded-full"
      onClick={handleCopyLink}
    >
      <MdShare className="mr-2 text-white" />
      <p className="text-white">
        <span className="hidden 2xs:inline-block">갤러리</span> 공유하기
      </p>
    </Button>
  );
}
