import { createContext, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';

type Props = {
  Component: React.ComponentType<any>;
  modalProps?: Record<string, unknown>;
  hide: () => void;
};

export const ModalHideContext = createContext(() => {});

export default function Modal({ Component, modalProps, hide }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus the modal container when it mounts
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleCancel = () => {
    hide();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };
    // const htmlElement = document.documentElement;
    // htmlElement.style.overflowY = 'hidden';
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      // htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleCancel]);

  return (
    // 외부로 tab 키 이동을 막기 위해 FocusLock 사용
    <FocusLock>
      <div
        className="fixed inset-0 z-[201] size-full bg-blackAlpha-600" // overlay > header보다 위
        onClick={handleCancel}
      />
      <ModalHideContext.Provider value={handleCancel}>
        <Component {...modalProps} />
      </ModalHideContext.Provider>
    </FocusLock>
  );
}
