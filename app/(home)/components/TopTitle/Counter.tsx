import {
  Badge,
  Box,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import CountUp from 'react-countup';

import { useCounts } from '@/app/(home)/service/client/useHomeService';
import { darkMode, lightMode } from '@/lib/theme';

export default function Counter() {
  const badge = useColorModeValue(lightMode.badge, darkMode.badge);
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
              <CountUp end={parseInt(counts.total_counter)} duration={2} />
            </Text>
            <Tooltip
              hasArrow
              label="오늘 발견한 이미지 출처 수"
              bg="gray.300"
              color="black"
            >
              <Badge style={{ backgroundColor: badge }} fontSize="1rem">
                +
                <CountUp end={parseInt(counts.today_counter)} duration={5} />
              </Badge>
            </Tooltip>
            <Text fontSize={['0.8rem', '0.9rem', '1rem', '1.1rem']}>
              개의 출처를 찾았습니다.
            </Text>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
}
