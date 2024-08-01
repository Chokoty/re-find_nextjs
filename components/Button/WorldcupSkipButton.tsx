import Link from 'next/link';

import Button from '@/components/Button';

export default function WorldcupSkipButton() {
  return (
    <Button
      size="lg"
      intent="ghost-gray"
      additionalClass="rounded-full pe-3 ps-3 dark:text-gray-50 text-gray-900"
    >
      <Link href={'/events/fanartWorldCup/credit'}>스킵&크레딧</Link>
    </Button>
  );
}
