import { Button, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { MdShare } from 'react-icons/md';

import { darkMode, lightMode } from '@/styles/theme';

export default function ShareLinkButton() {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

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
      style={{ background: highlightColor, borderRadius: '80px' }}
      variant="solid"
      onClick={handleCopyLink}
    >
      <Text color="white">갤러리 공유하기</Text>
      <MdShare color="white" />
    </Button>
  );
}
