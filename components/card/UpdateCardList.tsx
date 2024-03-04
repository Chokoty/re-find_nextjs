import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';

import UpdateCard from './UpdateCard';

type Prop = {
  updates: RecentBoardData[] | null;
};

export default function UpdateCardList({ updates }: Prop) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      placeItems="center"
      w="100%"
      // p="1em"
    >
      {updates?.map((update, index) => (
        <UpdateCard key={index} update={update} />
      ))}
      {updates === null ||
        (updates.length === 0 && (
          <Alert status="error" w="90%" borderRadius="1rem">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>
              현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
              빠른 시일 내에 해결하겠습니다.
            </AlertDescription>
          </Alert>
        ))}
    </Box>
  );
}
