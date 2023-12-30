import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { AiFillExperiment } from 'react-icons/ai';

import MoreLayout from '@/components/layout/more-layout';
import MoreButtons from '@/components/common/MoreButtons';
import UpdateLogBoard from '@/components/common/UpdateLogBoard';
import { useStore } from '@/store/store';

const More = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <MoreLayout title="좀 더!">
      <Flex
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        flexWrap="wrap"
        mt="1rem"
        mb="1rem"
      >
        <MoreButtons />
      </Flex>
      <Link href="https://cafe.naver.com/steamindiegame/9524252" isExternal>
        <Button colorScheme="purple">
          <AiFillExperiment
            className="icon"
            style={{
              width: '20px',
              height: '20px',
              padding: '0',
              marginRight: '0.5rem',
            }}
          />
          (beta)이세돌 팬아트를 키워드로 찾아주는 AI
        </Button>
      </Link>
      <UpdateLogBoard width={'100%'} />
    </MoreLayout>
  );
};

export default More;
