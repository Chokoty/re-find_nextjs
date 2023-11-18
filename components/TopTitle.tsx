import { Box } from '@chakra-ui/react';
import React from 'react';

import Banner2 from '@/components/Banner/Banner2';
// import HalloweenBtn from '@/components/events/HalloweenBtn';
import SubTitle from '@/components/title/SubTitle';
import Title from '@/components/title/Title';
import Counter from '@/components/tools/Counter';

const TopTitle = ({ data, resetFiles }) => {
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt="1rem"
    >
      <Banner2 />
      {/* <HalloweenBtn /> */}

      <Counter data={data} />
      <Title onTitleClick={resetFiles} />
      <SubTitle />
    </Box>
  );
};

export default TopTitle;
