import { Box, Spinner, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box
      className="loading"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="2rem"
    >
      <Text fontSize="lg" textAlign="center" fontWeight="bold" mb="1rem">
        검색중
      </Text>
      &nbsp;
      <Spinner size="md" />
    </Box>
  );
}
