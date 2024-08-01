import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

import Button from '@/components/Button';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  // console.log(pathNameParts.length);

  const goBack = () => {
    if (pathNameParts[3] === 'credit') {
      router.push('/events/fanartWorldCup');
    } else if (pathNameParts[2] === 'fanartWorldCup') {
      router.push('/events');
    } else if (pathNameParts[1] === 'events') {
      router.push('/');
    } else {
      router.back();
    }
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
