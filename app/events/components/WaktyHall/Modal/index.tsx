import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useImageViewerStore } from '@/app/events/store/imageViewerStore';

import ImageView from './ImageView';

export default function DetailedImageViewer() {
  const { fanart, isOpen, setIsOpen } = useImageViewerStore(
    useShallow((state) => ({
      fanart: state.fanart,
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
            {fanart && (
              <ImageView
                width={350}
                nickname={''}
                artwork={fanart}
                isFocused={isFocused}
                onToggleFocus={handleToggleFocus}
                isGallery={true}
              />
            )}
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
