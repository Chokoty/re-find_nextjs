import { useRouter } from 'next/navigation';

import BestOfTheYear from '@/app/recap2024/components/BestOfTheYear';
import MonthlyArtShowcase from '@/app/recap2024/components/MonthlyArtShowcase';
import TopContent from '@/app/recap2024/components/TopContent';

export default function Recap2024({
  params,
}: {
  params: { nickname: string };
}) {
  // const router = useRouter();
  // const { nickname } = router.query;
  // const artist = nickname as string | undefined;
  const { nickname } = params;
  return (
    <div className="flex h-screen w-4/5 flex-col items-center justify-start bg-recap-pattern">
      <TopContent artist={nickname} />
      <BestOfTheYear artist={nickname} />
      <MonthlyArtShowcase />
    </div>
  );
}
