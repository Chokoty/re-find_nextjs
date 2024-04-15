import { Box, Text } from '@chakra-ui/react';

type Prop = {
  topTitle: {
    title: string;
    description: string;
  };
};

export default function PageTitle({ topTitle }: Prop) {
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
}
