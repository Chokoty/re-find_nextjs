'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import Footer from '@/app/(home)/components/Footer';
import RandomGacha from '@/app/(home)/components/RandomGacha';
import RefindRecapNotificationModal from '@/app/(home)/components/RefindRecapNotificationModal';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import BoardList from '@/app/gallery/components/BoardList';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
// import { useRouter } from 'next/navigation';
import RefindPick from '@/app/gallery/components/RefindPick';
import MoreButtons from '@/components/Button/MoreButtons';
import AppInstallModal from '@/components/Modal/AppInstallModal';
import UpdateLogBoard from '@/components/UpdateLogBoard';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useResponsive } from '@/hooks/useResponsive';

const BannerSlider = dynamic(
  () => import('@/app/(home)/components/BannerSlider'),
  {
    ssr: false,
    loading: () => <BannerSkeleton />,
  }
);

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
    <div className="mx-auto  flex w-full items-start justify-center gap-2 px-2 pb-[60px]">
      {/* desktop: left / mobile: top */}
      <section className="flex w-[360px] flex-col items-center justify-center overflow-y-auto rounded-2xl dark:bg-dark-card">
        <TopTitle />
        <Upload />
        <RandomGacha />
      </section>
      {/* desktop: right / mobile: bottom */}
      <section className="flex w-2/3 grow flex-col items-center justify-center overflow-y-auto rounded-2xl">
        <div className="mb-2 w-full rounded-xl border-[1px] border-dark-myText bg-white py-6 shadow-sm dark:border-0 dark:bg-dark-card">
          {/* <ThisWeekTop /> */}

          <RefindPick />
          <BoardList />
          <MemberAlbum />
        </div>
        <BannerSlider />

        <Footer />
      </section>
    </div>
  );
}
