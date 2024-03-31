import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useResponsive } from '@/hook/useResponsive';
import { useImageViewerStore } from '@/store/imageViewerStore';
import { darkMode, lightMode } from '@/styles/theme';

import ImageCard from './ImageCard';

const artwork = {
  id: 15756083,
  url: 'https://cafe.naver.com/steamindiegame/15756083',
  img_url:
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMzBfMjk1/MDAxNzExODA5NzMyOTQ1.gJWF718bInTzxJzKxZU23t4cLE8i_RuV7pSBGUg0wJQg.xrmSr2Q_p7mFdD-5XamcX8t-W8pOrl3H3J6SQ2W14fcg.PNG/%EC%BC%80%EC%9D%B4%EC%85%89%EB%91%90.png?type=w800',
  img_url_list: [
    'https://cafeptthumb-phinf.pstatic.net/MjAyNDAzMzBfMjk1/MDAxNzExODA5NzMyOTQ1.gJWF718bInTzxJzKxZU23t4cLE8i_RuV7pSBGUg0wJQg.xrmSr2Q_p7mFdD-5XamcX8t-W8pOrl3H3J6SQ2W14fcg.PNG/%EC%BC%80%EC%9D%B4%EC%85%89%EB%91%90.png?type=w800',
  ],
  board: '우왁굳 팬아트',
  category: '팬아트',
  title: '케이셉굳',
  author: '침팬치 수듄',
  date: '2024.03.30. 23:43',
  view: 113,
  like: 5,
  comment: 17,
  is_shukkou: false,
  deleted: false,
  is_hyum: false,
};

export default function DetailedImageViewer() {
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  const { isOpen, setIsOpen } = useImageViewerStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
    }))
  );
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    // const htmlElement = document.documentElement;
    // htmlElement.style.overflowY = 'hidden';
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      // htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  const [isFocused, setFocuised] = useState(false);

  const handleToggleFocus = (id: number | null) => {
    setFocuised(!isFocused);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>이미지 제목</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" my="2rem">
            <ImageCard
              width={350}
              nickname={''}
              artwork={artwork}
              isFocused={isFocused}
              onToggleFocus={handleToggleFocus}
              isGallery={true}
            />
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
