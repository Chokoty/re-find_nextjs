import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useRecentUpdates } from '@/service/client/home/useHomeService';

import UpdateCard from './UpdateCard';

export default function UpdateCardList() {
  // TODO: 에러 처리 필요? (length가 0인 경우 다른 처리 필요?)
  const { data: updates, isLoading } = useRecentUpdates();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      placeItems="center"
      w="100%"
      // p="1em"
    >
      {updates === undefined || updates.length === 0 ? (
        <Alert status="error" w="90%" borderRadius="1rem">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription>
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
            빠른 시일 내에 해결하겠습니다.
          </AlertDescription>
        </Alert>
      ) : (
        updates.map((update, index) => (
          <UpdateCard key={index} update={update} />
        ))
      )}
    </Box>
  );
}

const Loading = () => {
  const width = useBreakpointValue({ base: '100%', md: '100%' });
  return (
    <Box
      maxW="700px"
      mb="1rem"
      w={width}
      background="gray.700"
      borderRadius="1rem"
    >
      <Skeleton height="600px" />
    </Box>
  );
};
