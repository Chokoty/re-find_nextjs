import { Flex } from '@chakra-ui/react';
import React from 'react';

import NoticeCard from '@/components/card/NoticeCard';
import updateLog from '@/data/updateLog';

type Prop = {
  count: number;
};

export default function UpdateLog({ count }: Prop) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap="0.5rem"
      margin="0 auto"
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
}
