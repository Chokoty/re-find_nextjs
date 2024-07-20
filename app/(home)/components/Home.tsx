'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import Footer from '@/app/(home)/components/Footer';
import RandomGacha from '@/app/(home)/components/RandomGacha';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
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
  const { show } = useModal(AppInstallModal);
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
    <div className="mx-auto flex w-full max-w-[1208px] flex-wrap items-start justify-center gap-6 px-2.5 md:px-4">
      {/* desktop: left / mobile: top */}
      <section className="flex w-full max-w-[700px] flex-col items-center justify-center">
        <BannerSlider />
        <TopTitle />
        <Upload />
      </section>
      {/* desktop: right / mobile: bottom */}
      <section className="flex max-w-[360px] flex-col items-center justify-center">
        <div className="hidden w-full flex-col items-center rounded-2xl bg-white px-6 pb-4 pt-6 shadow-cardBox dark:bg-dark-card md:flex">
          <h2 className="w-full text-start text-xl font-bold leading-5">
            좀 더!
          </h2>
          <MoreButtons />
        </div>
        <RandomGacha />
        <UpdateLogBoard />
        <Footer />
      </section>
    </div>
  );
}
