'use client';

import MonthlyArtShowcase from '@/app/recap2024/components/MonthlyArtShowcase';
import TopContent from '@/app/recap2024/components/TopContent';

export default function RefindRecap() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col gap-4 p-8">
      <TopContent />
      <MonthlyArtShowcase />
    </div>
  );
}
