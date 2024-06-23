import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const useA2HS = () => {
  /**
   * prompt가 실행될 수 있는 환경인 경우에만 모달창을 나타내기 위해
   * 변경 시 리렌더링을 발생시키기 위해서 useRef가 아닌 useState를 사용하였습니다.
   */
  const [deferredPrompt, setDeferredPrompt] =
    useState<IBeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 브라우저의 userAgent를 이용해 현재 사용 중인 기기가 iOS 기반 장치인지 확인
    // + 윈도우 기반 장치에서 iOS를 모방하는 경우고려
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);

    const handler = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    // beforeinstallprompt에 이벤트 핸들러를 등록합니다.
    window.addEventListener('beforeinstallprompt', handler as any);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any);
    };
  }, []);

  const installApp = () => {
    // 설치 메서드 실행
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        clearPrompt();
      });
    } else {
      toast.error(
        `먼저 설치가 되어있는지 확인해 주세요. 
        설치되어 있지 않다면, 
        좀 더! 페이지의 설치 가이드를 참고해주세요`
      );
    }
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  return { deferredPrompt, installApp, clearPrompt, isIOS };
};
