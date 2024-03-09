import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import IsegyeFestivalFanart from './IsegyeFestivalFanart';
import KiddingFanart from './KiddingFanart';

type Prop = {
  initialFanart: EventFanart | null;
};

export default function EventFanarts({ initialFanart }: Prop) {
  // const highlightColor = useColorModeValue(
  //   lightMode.highlight,
  //   darkMode.highlight
  // );

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
      <Text
        fontSize="xl"
        fontWeight="bold"
        // color={highlightColor}
        textAlign="center"
        mb={4}
      >
        특집 팬아트 랜덤 가챠
      </Text>
      <Accordion allowToggle defaultIndex={[1]} style={{ width: '100%' }}>
        <AccordionItem mb={1}>
          <Text>
            <AccordionButton
              // background="#FE78BB"
              // background="#166938"
              background="linear-gradient(90deg, rgba(57,155,55,1) 0%, rgba(121,197,36,1) 5%, rgba(121,197,36,1) 15%, rgba(57,155,55,1) 25%, rgba(37,98,45,1) 35%, rgba(31,50,36,1) 45%, rgba(31,50,36,1) 55%, rgba(37,98,45,1) 65%, rgba(57,155,55,1) 75%, rgba(121,197,36,1) 85%, rgba(121,197,36,1) 95%, rgba(57,155,55,1) 100%)"
              // #166938 #8FDF2F # #15231F #ec355b
              // border="1.5px solid #FE78BB"
              _hover={{
                background: '#b3e971',
                // background: '#fbd9ea',
              }}
              sx={{
                '&:hover': {
                  '> *': {
                    color: '#000',
                  },
                },
              }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="#ec355b"
                // color="#FFF"
              >
                Kidding
              </Box>
              <AccordionIcon color="#ec355b" />
            </AccordionButton>
          </Text>
          <AccordionPanel
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#FFFAE8"
            pb={4}
            borderRadius="
              0 0 0.2rem 0.5rem
            "
          >
            <Box border="1.5px solid #FE78BB" borderRadius="0.2rem" w="100%">
              <KiddingFanart />
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Text>
            <AccordionButton
              // background="#374079"
              // border="1.5px solid #374079"
              // border="1.5px solid #14532D"
              // background="#9BCC95"
              background="linear-gradient(90deg, rgba(27,11,31,1) 3%, rgba(61,69,101,1) 10%, rgba(104,53,178,1) 15%, rgba(237,176,138,1) 18%, rgba(108,60,116,1) 20%, rgba(212,122,201,1) 25%, rgba(212,122,201,1) 75%, rgba(108,60,116,1) 80%, rgba(237,176,138,1) 82%, rgba(104,53,178,1) 85%, rgba(61,69,101,1) 90%, rgba(27,11,31,1) 97%)"
              _hover={{
                background: '#fbd9ea',
              }}
              sx={{
                '&:hover': {
                  '> *': {
                    color: '#000',
                  },
                },
              }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="#fdce28"
              >
                이세계 페스티벌
              </Box>
              <AccordionIcon color="#fdce28" />
            </AccordionButton>
          </Text>
          <AccordionPanel
            pb={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="#EEECE8"
            borderRadius="
              0 0 0.2rem 0.5rem
            "
          >
            <Box
              border="1.5px solid #374079"
              borderRadius="0.2rem"
              padding="1.5rem"
              w="100%"
            >
              <IsegyeFestivalFanart />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
