import SubTitle from '@/app/(home)/components/TopTitle//SubTitle';
import Counter from '@/app/(home)/components/TopTitle/Counter';
import Title from '@/app/(home)/components/TopTitle/Title';

export default function TopTitle() {
  return (
    <div
      className={
        'mt-2 flex w-full flex-col items-center justify-center rounded-lg bg-white py-4 dark:bg-dark-card'
      }
    >
      <Counter />
      <Title />
      <SubTitle />
    </div>
  );
}
