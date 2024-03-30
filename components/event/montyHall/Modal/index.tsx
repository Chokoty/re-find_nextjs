import { Box, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { useShallow } from 'zustand/react/shallow';

import { useResponsive } from '@/hook/useResponsive';
import { usePromptStore } from '@/store/promptStore';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  keep: () => void;
  change: () => void;
};

export default function PromptModal({ keep, change }: Props) {
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  const { setIsOpen } = usePromptStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
    }))
  );
  const onClose = () => {
    setIsOpen(false);
  };

  const keepDoor = () => {
    keep();
    onClose();
  };
  const changeDoor = () => {
    change();
    onClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const htmlElement = document.documentElement;
    htmlElement.style.overflowY = 'hidden';
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    <FocusLock>
      <Box
        zIndex={201} // overlay > header보다 위
        position="fixed"
        left="0"
        top="0"
        width="100%"
        height="100%"
        background="rgba(0 0 0 / 48%)"
        onClick={onClose}
      />
      <Box
        zIndex={1000} // modal content > header, overlay보다 위
        position="fixed"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%)`}
        maxW={isMobile ? '100%' : '75%'}
        width="auto"
        // height="100dvh"
        overflow="auto"
        overscrollBehaviorY="none"
      >
        <Box
          display="flex"
          flexDir="column"
          as="section"
          // width="100%"
          // maxW={['100%', '66%']}
          my="0"
          boxShadow="none"
          border={`1px solid ${color7}`}
          borderTopRadius={isMobile ? '0' : '1rem'}
          borderBottomRadius="1rem"
          background={bg2}
          p="2rem"
        >
          <Heading as="h2" size="md" mb="1rem">
            처음 선택한 문을 바꾸시겠습니까?{' '}
          </Heading>
          <Box mt="2rem" display="flex" flexDir="row" gap="1rem">
            <Button tabIndex={0} colorScheme="green" onClick={keepDoor}>
              그대로 긔
            </Button>
            <Button tabIndex={0} colorScheme="yellow" onClick={changeDoor}>
              바꾸기
            </Button>
          </Box>
        </Box>
      </Box>
    </FocusLock>
  );
}
