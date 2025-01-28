import SubTitle from '@/app/(home)/components/TopTitle//SubTitle';
import Counter from '@/app/(home)/components/TopTitle/Counter';
import Title from '@/app/(home)/components/TopTitle/Title';

export default function TopTitle() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-white py-4 dark:bg-dark-card">
      <Counter />
      <Title />
      <SubTitle />
    </div>
  );
}
