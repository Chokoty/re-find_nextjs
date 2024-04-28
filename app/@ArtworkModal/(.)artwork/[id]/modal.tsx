'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { IoClose } from 'react-icons/io5';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    // const htmlElement = document.documentElement;
    // htmlElement.style.overflowY = 'hidden';
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      // htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onDismiss]);
  // const isMobile = useResponsive(); // 모바일 환경인지 체크

  return createPortal(
    // 외부로 tab 키 이동을 막기 위해 FocusLock 사용
    <FocusLock>
      <div className="fixed left-0 top-0 z-[201] size-full bg-blackAlpha-600" />
      <div
        ref={modalRef}
        className="fixed left-1/2 top-0 z-[1000] size-full -translate-x-1/2 overflow-auto"
      >
        <div className="p-4 md:px-12">
          <div className="relative rounded-2xl bg-white dark:bg-dark-card">
            <button
              className="absolute right-[10px] top-[10px] size-8"
              onClick={onDismiss}
            >
              <IoClose className="size-8" />
            </button>
            {children}
          </div>
        </div>
      </div>
    </FocusLock>,
    document.getElementById('artwork-modal-root')!
  );
}
