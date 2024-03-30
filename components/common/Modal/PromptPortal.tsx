import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';

import { usePromptStore } from '@/store/promptStore';

export default function PromptPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mountElement, setMountElement] = useState<HTMLElement | null>(null);
  const { isOpen } = usePromptStore(
    useShallow((state) => ({ isOpen: state.isOpen }))
  );

  useEffect(() => {
    const mE = document.getElementById('promptOverlays');
    setMountElement(mE);
  }, []);

  if (!mountElement) return null;

  return createPortal(<>{isOpen && children}</>, mountElement);
}
