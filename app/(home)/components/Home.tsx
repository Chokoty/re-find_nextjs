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
import Button from '@/components/Button';
import MoreButtons from '@/components/Button/MoreButtons';
import AppInstallModal from '@/components/Modal/AppInstallModal';
import UpdateLogBoard from '@/components/UpdateLogBoard';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useResponsive } from '@/hooks/useResponsive';

import PageButton from './PageButton';
import PageButtonList from './PageButtonList';

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
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 ">
      {/* desktop: left / mobile: top */}
      <section className="flex h-full w-[360px] flex-col items-center justify-start  overflow-y-auto rounded-lg dark:bg-dark-card">
        <TopTitle />
        <Upload />
        <RandomGacha />
      </section>
      {/* desktop: right / mobile: bottom */}
      <section className="custom-scrollbar mb-2 flex h-full w-2/3 grow flex-col items-center justify-start overflow-y-auto rounded-lg border-[1px] border-dark-myText bg-white  pt-4 shadow-sm dark:border-0 dark:bg-dark-card">
        {/* <ThisWeekTop /> */}

        <PageButtonList />
        <RefindPick />
        <BoardList />
        <MemberAlbum />
        <BannerSlider />

        <Footer />
      </section>
    </div>
  );
}
