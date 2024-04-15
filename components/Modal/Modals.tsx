'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Modal from '@/components/Modal';
import useModalState, { MODAL_COMPONENTS } from '@/store/modalStore';

export default function Modals() {
  const { modals, hideModal } = useModalState((state) => state);

  const [mountElement, setMountElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mE = document.getElementById('modal-root');
    setMountElement(mE);
  }, []);

  if (!mountElement) return null;

  return createPortal(
    <>
      {modals.map((modalId) => (
        <Modal
          hide={() => hideModal(modalId)}
          key={modalId}
          Component={MODAL_COMPONENTS[modalId].Component}
          modalProps={MODAL_COMPONENTS[modalId].props}
        />
      ))}
    </>,
    mountElement
  );
}
