import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import NoticeCard from '@/components/card/NoticeCard';
// import TMI from '@/data/tmi';
import updateLog from '@/data/updateLog';
import { darkMode, lightMode } from '@/styles/theme';

const UpdateLog = ({ count }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap="0.5rem"
      margin="0 auto"
      // width={['90%', '100%']}
    >
      {updateLog
        .slice(count === 0 ? undefined : -count) // 배열의 마지막 count 개의 항목만 가져옵니다.
        .reverse()
        .map((item, index) => (
          <NoticeCard
            key={index}
            date={item.date}
            type={item.type}
            content={item.content}
            directLink={item.directLink}
          />
        ))}
    </Flex>
  );
};

export default UpdateLog;
