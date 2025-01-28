'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import Footer from '@/app/(home)/components/Footer';
import RefindRecapNotificationModal from '@/app/(home)/components/RefindRecapNotificationModal';
import BoardList from '@/app/gallery/components/BoardList';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
import RefindPick from '@/app/gallery/components/RefindPick';
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
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 ">
      <LeftSection />
      <PageContent>
        <BannerSlider />
        <RefindPick />
        <BoardList />
        <MemberAlbum />
        <Footer />
      </PageContent>
    </div>
  );
}
