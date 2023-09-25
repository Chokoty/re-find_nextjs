import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
} from '@chakra-ui/react';

import KiddingFanart from './KiddingFanart';
import IsegyeFestivalFanart from './IsegyeFestivalFanart';

const EventFanarts = ({ initialFanart }) => {
  return (
    <Box
      mt={10}
      maxW="540px"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Accordion allowToggle defaultIndex={[1]} style={{ width: '100%' }}>
        <AccordionItem mb={1}>
          <Text>
            <AccordionButton border="1.5px solid #FE78BB" background="#fbd9ea">
              <Box
                as="span"
                flex="1"
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="#000"
              >
                3집 Kidding 특집 팬아트
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#FFFAE8"
            pb={4}
            borderRadius="lg"
          >
            <Box
              border="1.5px solid #FE78BB"
              borderRadius="0.2rem"
              // padding="1.5rem"
              w="100%"
            >
              <KiddingFanart initialFanart={null} />
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Text>
            <AccordionButton
              border="1.5px solid #14532D"
              background="#374079"
              // border="1.5px solid #14532D"
              // background="#9BCC95"
            >
              <Box
                as="span"
                flex="1"
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="#fff"
                _hover={{
                  color: '#000',
                }}
              >
                이세계 페스티벌 특집 팬아트
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel
            pb={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#EEECE8"
            borderRadius="lg"
          >
            <Box
              border="1.5px solid #374079"
              borderRadius="0.2rem"
              padding="1.5rem"
              w="100%"
            >
              <IsegyeFestivalFanart initialFanart={initialFanart} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default EventFanarts;
