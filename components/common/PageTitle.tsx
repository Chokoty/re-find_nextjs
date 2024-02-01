import { Box, Text } from '@chakra-ui/react';

const PageTitle = ({ topTitle }) => {
  return (
    <Box w="100%" h="1040px">
      {/* <Text as="h2" fontSize="3xl" fontWeight="bold"> */}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        textAlign="center"
        w="90%"
        m="6rem auto"
      >
        <Text fontSize={['sm', 'md', 'xl']}>{topTitle?.description}</Text>
        <Text
          // m="0 auto"
          m="0"
          as="h1"
          fontSize={['3xl', '5xl', '80px']}
          fontFamily={'ONE-Mobile-POP'}
        >
          {topTitle.title}
        </Text>
      </Box>
    </Box>
  );
};

export default PageTitle;
