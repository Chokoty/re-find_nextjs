'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import Footer from '@/app/(home)/components/Footer';
import HomeMobile from '@/app/(home)/components/HomeMobile';
import RefindRecapNotificationModal from '@/app/(home)/components/RefindRecapNotificationModal';
import BoardList from '@/app/album/components/BoardList';
import GalleryTitle from '@/app/album/components/GalleryTitle';
import MemberAlbum from '@/app/album/components/MemberAlbum';
import RefindPick from '@/app/album/components/RefindPick';
import LeftSection from '@/components/LeftSection';
import AppInstallModal from '@/components/Modal/AppInstallModal';
import PageContent from '@/components/PageContent';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useResponsive } from '@/hooks/useResponsive';

export default function Home() {
  const [value, setValue] = useLocalStorage({
    key: 'showAppInstallModal',
    initialValue: false,
  });

  const [isOpenAuthorRecapModal, setIsOpenAuthorRecapModal] = useLocalStorage({
    key: 'showRefindRecapModal',
    initialValue: false,
  });
  const { show } = useModal(AppInstallModal);
  const { show: showRefindRecapNotification } = useModal(
    RefindRecapNotificationModal
  );
  const isMobile = useResponsive();
  const openPwaInstallModal = () => {
    show({ animateDir: 'bottom', position: 'bottom', setStorage: setValue });
  };
  const BannerSlider = dynamic(
    () => import('@/app/(home)/components/BannerSlider'),
    {
      ssr: false,
      loading: () => <BannerSkeleton />,
    }
  );
  useEffect(() => {
    const isDisPlayModeFullScreen = window.matchMedia(
      '(display-mode: fullscreen)'
    ).matches;
    if (!value && isMobile && !isDisPlayModeFullScreen) {
      openPwaInstallModal();
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isOpenAuthorRecapModal) {
      showRefindRecapNotification({
        animateDir: 'bottom',
        setStorage: setIsOpenAuthorRecapModal,
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {/* /** 모바일 레이아웃 */}
      <HomeMobile />
      {/* /** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-2 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <PageContent>
          <GalleryTitle
            pageType="galleryHome"
            title="팬아트 갤러리"
            description="왁물원에 올라온 모든 팬아트들을 한 곳에서!"
          />
          <RefindPick />
          <BoardList />
          <MemberAlbum />
          <BannerSlider />
          <Footer />
        </PageContent>
      </div>
    </div>
  );
}
