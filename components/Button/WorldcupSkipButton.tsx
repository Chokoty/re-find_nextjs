import { useEventStore } from '@/app/events/store/eventStore';
import Button from '@/components/Button';

export default function WorldcupSkipButton() {
  const { isSkipped, toggleSkip } = useEventStore();

  return (
    <Button
      size="lg"
      intent="ghost-gray"
      additionalClass="rounded-full pe-3 ps-3 dark:text-gray-50 text-gray-900"
      onClick={toggleSkip}
    >
      {isSkipped ? '스킵 취소' : '크레딧'}
    </Button>
  );
}
