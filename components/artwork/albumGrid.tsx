import {
  Box,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

const AlbumGrid = ({ gallary }) => {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const router = useRouter();

  const onClick = (id, subTitle, value) => {
    // const { subTitle } = gallary.find((item) => item.id === id);
    console.log(subTitle, value);

    router.push(
      {
        // pathname: `/artworks/${id}`,
        // if id === 0 -> sub
        // pathname: `/artworks/${id === 0 ? route : id}`,
        pathname: `/artworks/${value}`,
        query: { subTitle },
      },
      // `/artworks/${id === 0 ? route : id}`
      `/artworks/${value}`
    );
  };

  return (
    <Box
      m="0 auto"
      mt="3rem"
      w="94%"
      mb="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w={['100%', '90%']}
        minChildWidth={['150px', '200px']} // 모바일에서는 150px, 그 외에서는 200px
        spacing={['0.5rem', '0.75rem']}
        justifyContent="center"
        alignItems="center"
        placeItems="center"
        m="0 auto"
      >
        {gallary &&
          gallary
            .slice()
            .reverse()
            .map((item, index) => (
              // <NextLink key={index} href={`/artworks/${item.id}`}>
              <Button
                key={index}
                p="1rem"
                m={['0', '0.5rem']}
                mb=" 1rem"
                w={['158px', '200px']}
                h={['158px', '200px']}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                background={bg2}
                borderRadius="1rem"
                boxShadow="md"
                onClick={() => onClick(item.id, item.subTitle, item.value)}
              >
                <Text fontSize="xl" fontWeight="bold" textAlign="left">
                  {item.title}
                </Text>
              </Button>
              // </NextLink>
            ))}
      </SimpleGrid>
    </Box>
  );
};

export default AlbumGrid;
