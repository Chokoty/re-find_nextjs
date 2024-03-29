import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import gallery from '@/data/gallery';
import { darkMode, lightMode } from '@/styles/theme';

export default function AlbumGrid() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const highlight2 = useColorModeValue(lightMode.highlight, darkMode.highlight);

  return (
    <Box
      m="0 auto"
      mt="1rem"
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
        {gallery
          .slice()
          .reverse()
          .map((item, index) => (
            <Link href={`/gallery/${item.value}`} key={index}>
              <Box
                p="1rem"
                m={['0', '0.5rem']}
                mb=" 1rem"
                w={['158px', '200px']}
                h={['158px', '200px']}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                background={item.type === 'special' ? highlight2 : bg2}
                borderRadius="1rem"
                boxShadow="md"
                _hover={{
                  background: '#ffffff29',
                }}
                transition="all 0.2s ease-in-out"
              >
                <Text
                  fontSize={['md', 'xl']}
                  fontWeight="bold"
                  textAlign="left"
                >
                  {item.title}
                </Text>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  );
}
