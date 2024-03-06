import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

import Counter from '@/components/common/Counter';
import SubTitle from '@/components/title/SubTitle';
import Title from '@/components/title/Title';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  data: Source | null;
  resetFiles: () => void;
};

export default function TopTitle({ data, resetFiles }: Props) {
  const bgColor = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      w={width}
      p="1rem 0"
      // h="20rem"
      // maxW="850px"
      maxW="700px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      background={bgColor}
      // p="1.5rem"
      borderRadius="1rem"
      // mt="1rem"
    >
      <Counter data={data} />
      <Title onTitleClick={resetFiles} />
      <SubTitle />
    </Box>
  );
}
