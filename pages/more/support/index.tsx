import { Box, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsChatDots } from 'react-icons/bs';

import MoreLayout from '@/components/layout/more-layout';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const data = [
  {
    title: '버그 제보',
    imgAlt: '버그 아이콘',
    imgUrl: './static/icons/bugFind.png',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScK_i8O9QnhfZswreRX7VYROWzG3Kte6bVxjf28VSK0Fcu23g/viewform',
  },
  {
    title: '기타 문의',
    imgAlt: '',
    imgUrl: '',
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
      <div className="toLink">
        {data.map((item, index) => (
          <Box className="area" key={index}>
            <Button
              href={item.url}
              as="a"
              target="_blank"
              boxShadow="md"
              borderWidth="1px"
              borderRadius="lg"
              width="200px"
              height="200px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {item.imgUrl === '' ? (
                <BsChatDots size="120px" />
              ) : (
                <Image
                  src={item.imgUrl}
                  alt="버그 아이콘"
                  width={120}
                  height={120}
                  mx="auto"
                  my={4}
                  filter={color === '#1B1642' ? '' : 'invert(1)'}
                />
              )}
            </Button>
            <Text fontSize="2xl" mt="10px">
              {item.title}
            </Text>
          </Box>
        ))}
      </div>
    </MoreLayout>
  );
};

export default Support;
