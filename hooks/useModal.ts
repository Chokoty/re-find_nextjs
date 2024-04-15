import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ModalHideContext } from '@/components/Modal';
import useModalState, { MODAL_COMPONENTS } from '@/store/modalStore';

type CalledByModalInner = { hide: () => void };
type CalledByModalOuter<P> = { show: (props?: P) => void; hide: () => void };

function useModal(): CalledByModalInner;
function useModal<P extends Record<string, unknown>>(
  Component?: React.ComponentType<P>
): CalledByModalOuter<P>;

function useModal<P extends Record<string, unknown>>(
  Component?: React.ComponentType<P>
): CalledByModalInner | CalledByModalOuter<P> {
  const { showModal, hideModal } = useModalState((state) => state);
  const [modalId] = useState(uuidv4()); // modal id 생성
  const hideThisModal = useContext(ModalHideContext);

  useEffect(() => {
    if (!Component) return; // Component가 없으면 등록 x (이미 내부에서 실행되므로)
    MODAL_COMPONENTS[modalId] = { Component }; // modal을 전역 객체에 등록
  }, [modalId]);

  const show = (props?: P) => {
    if (!Component) return; // Component가 없으면 호출 x
    MODAL_COMPONENTS[modalId].props = props;
    showModal(modalId);
  };

  const hide = () => {
    if (Component) {
      hideModal(modalId);
      return;
    }
    // Component가 없으면 Provider를 통해 받은 hideThisModal 호출
    hideThisModal();
  };

  if (Component) {
    return { show, hide };
  }
  return { hide };
}

export default useModal;
