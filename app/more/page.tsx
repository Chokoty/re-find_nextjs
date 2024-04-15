'use client';

import { Flex, Link, Text } from '@chakra-ui/react';
import { AiFillExperiment } from 'react-icons/ai';

import MoreLayout from '@/app/more/components/MoreLayout';
import MoreButtons from '@/components/Button/MoreButtons';
import UpdateLogBoard from '@/components/UpdateLogBoard';

import { SOURCE_URL } from './lib/const';

export default function More() {
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
      <Link
        href={SOURCE_URL}
        isExternal
        style={{
          margin: '0 auto',
          maxWidth: '343px',
          display: 'inline-flex',
          alignItems: 'center',
          background: '#805ad5', // hover: #6b46c1 (600) else, #805ad5 (500) ,transition-duration: 200ms
          paddingRight: '1rem',
          paddingLeft: '1rem',
          borderRadius: '6px',
          height: '40px',
          textDecoration: 'none',
        }}
      >
        <AiFillExperiment
          color="white"
          className="icon"
          style={{
            width: '20px',
            height: '20px',
            padding: '0',
            marginRight: '0.5rem',
          }}
        />
        <Text color="white" fontSize="1rem">
          (beta)이세돌 팬아트를 키워드로 찾아주는 AI
        </Text>
      </Link>
      <UpdateLogBoard width={'90%'} />
    </MoreLayout>
  );
}
