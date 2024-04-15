import { Flex } from '@chakra-ui/react';

import NoticeCard from '@/app/more/components/Card/NoticeCard';
import { UPDATE_LOGS } from '@/app/more/lib/const';

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
      {UPDATE_LOGS.slice(count === 0 ? undefined : -count) // 배열의 마지막 count 개의 항목만 가져옵니다.
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
