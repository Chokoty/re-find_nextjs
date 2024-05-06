import NoticeCard from '@/app/more/components/Card/NoticeCard';
import { UPDATE_LOGS } from '@/app/more/lib/const';

type Prop = {
  rowCount?: number;
};

export default function UpdateLog({ rowCount = 0 }: Prop) {
  const latestUpdateLogs = UPDATE_LOGS.slice(-rowCount).reverse();
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-2">
      {latestUpdateLogs.map((item, index) => (
        <NoticeCard
          key={index}
          date={item.date}
          type={item.type}
          content={item.content}
          directLink={item.directLink}
        />
      ))}
    </div>
  );
}
