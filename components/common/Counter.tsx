import {
  Badge,
  Box,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CountUp from 'react-countup';

import { useCounts } from '@/service/client/home/useHomeService';
import { darkMode, lightMode } from '@/styles/theme';

export default function Counter() {
  const badge = useColorModeValue(lightMode.badge, darkMode.badge);
  // TODO: 에러 처리 필요?
  const { data: counts, isLoading } = useCounts();
  return (
    <Box
      maxW="360px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="2.5rem"
      p="1rem"
      borderRadius="3rem"
      border="2px solid #ccc"
      mb="0.5rem"
    >
      <Skeleton isLoaded={!isLoading} display="flex">
        {counts === undefined ? (
          <Text fontSize={['0.8rem', '0.9rem', '1rem', '1.1rem']}>
            현재 서버와의 연결이 불안정합니다.
          </Text>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="0.2rem"
          >
            <Text fontSize={['0.8rem', '0.9rem', '1rem', '1.1rem']}>
              <CountUp end={parseInt(counts.total_counter)} />
            </Text>
            <Badge style={{ backgroundColor: badge }} fontSize="1rem">
              +
              <CountUp end={parseInt(counts.today_counter)} duration={5} />
            </Badge>
            <Text fontSize={['0.8rem', '0.9rem', '1rem', '1.1rem']}>
              개의 출처를 찾았습니다.
            </Text>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
}
