'use client';

import dynamic from 'next/dynamic';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import Footer from '@/app/(home)/components/Footer';
import RandomGacha from '@/app/(home)/components/RandomGacha';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import MoreButtons from '@/components/Button/MoreButtons';
import UpdateLogBoard from '@/components/UpdateLogBoard';

const BannerSlider = dynamic(
  () => import('@/app/(home)/components/BannerSlider'),
  {
    ssr: false,
    loading: () => <BannerSkeleton />,
  }
);

export default function Home() {
  return (
    <div className="mx-auto my-4 flex w-full max-w-[1208px] flex-wrap items-start justify-center gap-6">
      {/* desktop: left / mobile: top */}
      <section className="flex w-[90%] max-w-[700px] flex-col items-center justify-center md:w-full">
        <BannerSlider />
        <TopTitle />
        <Upload />
      </section>
      {/* desktop: right / mobile: bottom */}
      <section className="flex max-w-[400px] flex-col items-center justify-center">
        <div className="hidden w-[90%] flex-col items-center rounded-2xl bg-white px-6 pb-4 pt-6 shadow-cardBox dark:bg-dark-card md:flex">
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
