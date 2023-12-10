import { Box, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaBug } from 'react-icons/fa';

import MoreLayout from '@/components/layout/more-layout';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

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

const Support = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const color = useColorModeValue(lightMode.color, darkMode.color);

  useEffect(() => {
    setIsOpen(false);
  }, []);

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
            width="144px"
            height="128px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <FaBug size="60px" />
          </Button>
          <Text fontSize="2xl" mt="10px">
            {data[0].title}
          </Text>
        </Box>
        <Box className="area" mt="5rem">
          <Button
            href={data[1].url}
            as="a"
            target="_blank"
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="144px"
            height="128px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <BsChatDots size="60px" />
          </Button>
          <Text fontSize="2xl" mt="10px">
            {data[1].title}
          </Text>
        </Box>
      </Box>
    </MoreLayout>
  );
};

export default Support;
