import { Box, Text } from '@chakra-ui/react';

const PageTitle = ({ topTitle }) => {
  return (
    <Box>
      {/* <Text as="h2" fontSize="3xl" fontWeight="bold"> */}
      <Text
        m="0 auto"
        as="h1"
        fontSize={['3xl', '5xl']}
        fontFamily={'ONE-Mobile-POP'}
      >
        {topTitle.title}
      </Text>
      <Text fontSize="md">{topTitle?.description}</Text>
    </Box>
  );
};

export default PageTitle;
