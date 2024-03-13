import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
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
        <AccordionButton p="1rem 2rem" justifyContent="flex-end">
          <AccordionIcon />
          <Text>검색옵션</Text>
        </AccordionButton>
        <MainOptions />
      </AccordionItem>
    </Accordion>
  );
}
