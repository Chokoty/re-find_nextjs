import {
  Button,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ImLink } from 'react-icons/im';

import { darkMode, lightMode } from '@/styles/theme';

const ShareLinkButton = () => {
  const toast = useToast();
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

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
        w={['8rem', '10rem', '12rem']}
        h="3rem"
        // variant="ghost"
        // borderRadius="full"
        // p="0"
        m="3rem 0"
        p="0 1rem"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        background={highlight}
        // w="200px"
        borderRadius="2rem"
        onClick={handleCopyLink}
      >
        <Text size={['0.8rem', '1rem', '1.2rem']}>갤러리 공유하기</Text>
        <ImLink />
      </Button>
    </Tooltip>
  );
};

export default ShareLinkButton;
