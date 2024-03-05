import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { ImLink } from 'react-icons/im';

export default function ShareLinkButton() {
  const toast = useToast();

  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/gallery/${value}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: '갤러리 링크 복사됨',
        description: '링크가 클립보드에 복사되었습니다.',
        // status: 'success',
        duration: 1500,
        isClosable: true,
      });
    });
  };

  return (
    <Tooltip label="링크 공유">
      <Button
        w="3rem"
        h="3rem"
        variant="ghost"
        borderRadius="full"
        p="0"
        onClick={handleCopyLink}
      >
        <ImLink />
      </Button>
    </Tooltip>
  );
}
