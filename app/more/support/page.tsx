'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { BsChatDots } from 'react-icons/bs';
import { FaBug } from 'react-icons/fa';

import MoreLayout from '@/components/layout/more-layout';

const data = [
  {
    title: '버그 제보',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScK_i8O9QnhfZswreRX7VYROWzG3Kte6bVxjf28VSK0Fcu23g/viewform',
  },
  {
    title: '기타 문의',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf0WGZnnlZahRLoinXe1n0GmPCdryKXEFlPznqyLrsjBKpnZw/viewform',
  },
];

export default function Support() {
  return (
    <MoreLayout title="Support">
      <Box className="toLink" pb="15rem">
        <Box className="area" mt="5rem">
          <Button
            href={data[0].url}
            as="a"
            target="_blank"
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="160px"
            height="144px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <FaBug size="60px" />
            <Text fontSize="2xl" mt="1.5rem">
              {data[0].title}
            </Text>
          </Button>
        </Box>
        <Box className="area" mt="5rem">
          <Button
            href={data[1].url}
            as="a"
            target="_blank"
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="160px"
            height="144px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <BsChatDots size="60px" />
            <Text fontSize="2xl" mt="1.5rem">
              {data[1].title}
            </Text>
          </Button>
        </Box>
      </Box>
    </MoreLayout>
  );
}
