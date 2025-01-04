import MonthlyArtShowcase from '@/app/recap2024/components/MonthlyArtShowcase';
import TopContent from '@/app/recap2024/components/TopContent';

export default function More() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start bg-recap-pattern">
      <TopContent />
      <MonthlyArtShowcase />
      <div className="mb-4"></div>
    </div>
  );
}
