import {
  Badge,
  Box,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

import { getCounters } from '@/lib/service/client/home';
import { darkMode, lightMode } from '@/styles/theme';

const Counter = ({ data }) => {
  const [counter, setCounter] = useState(null);
  const [counterLoading, setCounterLoading] = useState(false);
  const badge = useColorModeValue(lightMode.badge, darkMode.badge);

  // counter 가져오기
  const fetchCounter = async () => {
    try {
      setCounterLoading(true);
      const ccounter = await getCounters();
      setCounter(ccounter);
      setCounterLoading(false);
    } catch (err) {
      setCounterLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, [data]);

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
      <Skeleton isLoaded={!counterLoading} display="flex">
        {counter === null ? (
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
              <CountUp end={counter.total_counter} />
            </Text>
            <Badge style={{ backgroundColor: badge }} fontSize="1rem">
              +
              <CountUp end={counter.today_counter} duration={5} />
            </Badge>
            <Text fontSize={['0.8rem', '0.9rem', '1rem', '1.1rem']}>
              개의 출처를 찾았습니다.
            </Text>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
};

export default Counter;
