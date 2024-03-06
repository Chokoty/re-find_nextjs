import {
  Box,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import UpdateCardList from '@/components/card/UpdateCardList';
import { getRecentUpdateInfos } from '@/service/client/home';
import { darkMode, lightMode } from '@/styles/theme';

export default function UpdateBoard() {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const width = useBreakpointValue({ base: '100%', md: '100%' });

  const [lastUpdateInfo, setLastUpdateInfo] = useState<
    RecentBoardData[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLastUpdateInfo = async () => {
      try {
        setIsLoading(true);
        const result = await getRecentUpdateInfos();
        setLastUpdateInfo(result);
      } catch (error) {
        console.log('Error fetching last update info:', error);
        // 오류 처리 로직
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastUpdateInfo();
  }, []);

  return (
    <Box
      className="update-info"
      m="0 auto"
      mt="3rem"
      mb="1rem"
      display="grid"
      alignItems="center"
      placeItems="center"
      w={width}
      maxW="700px"
      background={bg2}
      borderRadius="1rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
        p="1em 0"
        borderBottom="1px solid"
        borderColor={bg}
      >
        <Heading
          as="h2"
          size="md"
          color={color}
          textAlign="left"
          w="100%"
          pl="1em"
        >
          게시판 업데이트 현황
        </Heading>
      </Box>
      {!isLoading ? (
        <UpdateCardList updates={lastUpdateInfo} />
      ) : (
        <Box
          maxW="700px"
          mb="1rem"
          w={width}
          background="gray.700"
          borderRadius="1rem"
        >
          <Skeleton height="600px" />
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        placeItems="center"
        w="100%"
        p="1em"
      >
        <Text whiteSpace="normal">
          명시된 게시판에 있는 원본만 찾을 수 있습니다.
        </Text>
      </Box>
    </Box>
  );
}
