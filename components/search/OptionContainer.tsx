import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { CgOptions } from 'react-icons/cg';

import { darkMode, lightMode } from '@/styles/theme';

import MainOptions from './MainOptions';

export default function OptionContainer() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isSearchPage = usePathname() === '/search';
  return (
    <Accordion allowMultiple w="100%" p="1.5rem 1rem 0">
      <AccordionItem
        border="none"
        _focus={{ boxShadow: 'none' }}
        _hover={{ boxShadow: 'none' }}
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton
              justifyContent="flex-end"
              gap="0.3rem"
              p="0.5rem"
              borderRadius="0.5rem"
              _hover={{
                backgroundColor: bg2,
                borderColor: '#01BFA2',
                color: '#01BFA2',
              }}
            >
              {isExpanded ? (
                <>
                  <AccordionIcon />
                  <Text>필터 접기</Text>
                </>
              ) : (
                <>
                  {isSearchPage ? (
                    <CgOptions fontSize="1rem" />
                  ) : (
                    <AccordionIcon />
                  )}
                  <Text>필터 더보기</Text>
                </>
              )}
            </AccordionButton>
            <MainOptions />
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
