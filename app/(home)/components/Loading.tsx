import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <p className="mb-4 text-center text-xl font-bold">검색중</p>
      <ClipLoader color="var(--green-500)" />
    </div>
  );
}
