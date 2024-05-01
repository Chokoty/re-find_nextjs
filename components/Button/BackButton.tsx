import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

import Button from '@/components/Button';

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <Button
      size="lg"
      intent="ghost-gray"
      additionalClass="rounded-full pe-3 ps-3 dark:text-gray-50 text-gray-900"
      onClick={goBack}
    >
      <FaArrowLeftLong className="size-6" />
    </Button>
  );
}
