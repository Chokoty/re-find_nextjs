import { Box } from '@chakra-ui/react';
import React from 'react';

import Banner2 from '@/components/banner/Banner2';
import HalloweenBtn from '@/components/events/HalloweenBtn';
import MelonVoteModal from '@/components/events/MelonVoteModal';
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
    >
      <Banner2 />
      {/* <MelonVoteModal /> */}
      <HalloweenBtn />

      <Counter data={data} />
      <Title onTitleClick={resetFiles} />
      <SubTitle />
    </Box>
  );
};

export default TopTitle;
