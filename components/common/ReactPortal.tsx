import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';

import SearchModal from '@/components/search/Modal';
import { useModalStore } from '@/store/modalStore';

export default function ReactPortal() {
  const [mountElement, setMountElement] = useState<HTMLElement | null>(null);
  const { isOpen } = useModalStore(
    useShallow((state) => ({ isOpen: state.isOpen }))
  );
  useEffect(() => {
    const mE = document.getElementById('overlays');
    setMountElement(mE);
  }, []);

  if (!mountElement) return null;

  return createPortal(<>{isOpen && <SearchModal />}</>, mountElement);
}
