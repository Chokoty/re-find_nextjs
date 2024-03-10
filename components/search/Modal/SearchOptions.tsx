import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Text,
} from '@chakra-ui/react';
import MainOptions from '../MainOptions';

export default function SearchOptions() {
  return (
    <Accordion allowMultiple w="100%">
      <AccordionItem
        border="none"
        _focus={{ boxShadow: 'none' }}
        _hover={{ boxShadow: 'none' }}
      >
        <AccordionButton p="1rem 0">
          <AccordionIcon />
          <Box as="span" flex="1" textAlign="left">
            <Text>검색옵션</Text>
          </Box>
        </AccordionButton>
        <MainOptions />
      </AccordionItem>
    </Accordion>
  );
}
