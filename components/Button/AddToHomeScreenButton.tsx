import { useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';

import AppInstallModal from '@/components/Modal/AppInstallModal';
import useModal from '@/hooks/useModal';

type Props = {
  containerClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  buttonClassName: string;
};

export default function AddToHomeScreenButton({
  containerClassName,
  iconWrapperClassName,
  iconClassName,
  buttonClassName,
}: Props) {
  const { show } = useModal(AppInstallModal);
  const [isVisible, setIsVisible] = useState(false);
  const openPwaInstallPopup = () => {
    show({ animateDir: 'bottom', position: 'bottom' });
  };

  useEffect(() => {
    const isDisPlayModeFullScreen = window.matchMedia(
      '(display-mode: fullscreen)'
    ).matches;
    if (isDisPlayModeFullScreen) {
      return;
    }
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={`md:hidden ${containerClassName}`}
      onClick={openPwaInstallPopup}
    >
      <div className={iconWrapperClassName}>
        <IoMdDownload className={iconClassName} />
      </div>
      <p className={buttonClassName}>바로가기 추가</p>
    </button>
  );
}
