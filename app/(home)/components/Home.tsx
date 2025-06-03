'use client';

import { Suspense, useEffect } from 'react';

import BannerSlider from '@/app/(home)/components/BannerSlider';
import Footer from '@/app/(home)/components/Footer';
import HomeMobile from '@/app/(home)/components/HomeMobile';
import PageButtonList from '@/app/(home)/components/PageButtonList';
import BoardList from '@/app/album/components/BoardList';
import GalleryTitle from '@/app/album/components/GalleryTitle';
import MemberAlbum from '@/app/album/components/MemberList';
import RefindPick from '@/app/album/components/RefindPick';
import CustomScrollContainer from '@/components/CustomScrollContainer';
import LeftSection from '@/components/LeftSection';
import AppInstallModal from '@/components/Modal/AppInstallModal';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useResponsive } from '@/hooks/useResponsive';

export default function Home() {
  const [value, setValue] = useLocalStorage({
    key: 'showAppInstallModal',
    initialValue: false,
  });
  const { show } = useModal(AppInstallModal);
  // const { show: showRefindRecapNotification } = useModal(
  //   RefindRecapNotificationModal
  // );
  const isMobile = useResponsive();
  const openPwaInstallModal = () => {
    show({ animateDir: 'bottom', position: 'bottom', setStorage: setValue });
  };
  useEffect(() => {
    const isDisPlayModeFullScreen = window.matchMedia(
      '(display-mode: fullscreen)'
    ).matches;
    if (!value && isMobile && !isDisPlayModeFullScreen) {
      openPwaInstallModal();
    }
  }, [isMobile]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {/* /** 모바일 레이아웃 */}
      <HomeMobile />
      {/* /** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-2 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <section className="hidden h-full w-2/3 grow flex-col items-center justify-start overflow-hidden rounded-lg border-base border-gray-200 bg-white shadow-sm dark:border-0 dark:bg-dark-card md:flex">
          <CustomScrollContainer className="flex size-full flex-col items-center justify-start bg-white shadow-sm transition-all duration-300 dark:border-0 dark:bg-dark-card">
            <PageButtonList />
            <Suspense>
              <GalleryTitle
                pageName="galleryHome"
                // title="팬아트 갤러리"
                // description="왁물원에 올라온 모든 팬아트들을 한 곳에서!"
              />
            </Suspense>
            <RefindPick />
            <BoardList />
            <MemberAlbum />
            <BannerSlider />
            <Footer />
          </CustomScrollContainer>
        </section>
      </div>
    </div>
  );
}
