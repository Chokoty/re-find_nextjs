import toast from 'react-hot-toast';
import { MdShare } from 'react-icons/md';

import Button from '@/components/Button';

export default function ShareLinkButton() {
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/gallery/${value}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('갤러리 링크 복사됨');
    });
  };

  return (
    <Button
      additionalClass="bg-green-highlight dark:hover:bg-pink-400 dark:bg-pink-highlight hover:bg-teal-500 rounded-full"
      onClick={handleCopyLink}
      h="2.5rem"
    >
      <p className="text-white">
        <span className="hidden 2xs:inline-block">갤러리</span> 공유하기
      </p>
      <MdShare className="ml-1 text-white" />
    </Button>
  );
}
