'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { IoClose } from 'react-icons/io5';

import { lightMode } from '@/lib/theme';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const bg = useColorModeValue(lightMode.bg, '#262626');

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    const htmlElement = document.documentElement;
    htmlElement.style.overflowY = 'hidden';
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onDismiss]);
  // const isMobile = useResponsive(); // 모바일 환경인지 체크

  return createPortal(
    // 외부로 tab 키 이동을 막기 위해 FocusLock 사용
    <FocusLock>
      <Box
        zIndex={201} // overlay > header보다 위
        position="fixed"
        left="0"
        top="0"
        width="100%"
        height="100%"
        background="rgba(0 0 0 / 48%)"
      />
      <Box
        ref={modalRef}
        zIndex={1000} // modal content > header, overlay보다 위
        position="fixed"
        left="50%"
        transform={`translateX(-50%)`}
        top="0"
        // maxW={isMobile ? '100%' : '75%'}
        width="100%"
        height="100%"
        // height="100dvh"
        // display="flex"
        // justifyContent="center"
        // alignItems="flex-start"
        overflow="auto"
        // overscrollBehaviorY="none"
      >
        <Box padding={['1rem', '1rem', '1rem 3rem']}>
          <Box position="relative" background={bg} borderRadius="1rem">
            <Box position="absolute" right="9px" top="9px">
              <button onClick={onDismiss}>
                <IoClose size="32px" />
              </button>
            </Box>
            {children}
          </Box>
        </Box>
      </Box>
    </FocusLock>,
    document.getElementById('artwork-modal-root')!
  );
}
