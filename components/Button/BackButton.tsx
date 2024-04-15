import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button
      w="3rem"
      h="3rem"
      p="0.5rem"
      variant="ghost"
      borderRadius="50%"
      flexShrink={0}
      onClick={goBack} // 버튼 클릭 시 이전 페이지로 이동
    >
      <FaArrowLeftLong style={{ width: '1.5rem', height: '1.5rem' }} />
    </Button>
  );
}
