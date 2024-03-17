import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import CountUp from 'react-countup';

import { viewTypes } from '@/data/artists';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  total?: number;
  selectedView: keyof AuthorCommon | null;
  handleViewSelect: (value: keyof AuthorCommon) => void;
};

export default function ViewTypeButtonGroup({
  total,
  selectedView,
  handleViewSelect,
}: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // m="1rem"
      p="1rem"
      // p={['0.5rem', '1rem', '1rem']}
      w="100%"
      maxW="1024px"
      backgroundColor={bg2}
      borderRadius="1rem"
    >
      <Text mb="1rem">
        총 {total ? <CountUp end={total ?? 0} /> : ''}명의 작가님들이 있어요.
      </Text>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {viewTypes.map((viewType, index) => (
          <li key={index}>
            <Button
              size="md"
              onClick={() => handleViewSelect(viewType.value)}
              colorScheme={
                selectedView === viewType.value ? viewType.colorScheme : 'gray'
              }
            >
              {viewType.name}
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
}
