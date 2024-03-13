import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { CgOptions } from 'react-icons/cg';

import { darkMode, lightMode } from '@/styles/theme';

import MainOptions from './MainOptions';
import SearchBar from './SearchBar';

type Props = {
  total: number;
};

export default function SearchHeader({ total }: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  return (
    <>
      <SearchBar />
      <Box p="1.7rem 1rem 1rem">
        <Accordion allowMultiple flex="1">
          <AccordionItem
            border="none"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          >
            {({ isExpanded }) => (
              <>
                <Box
                  display="flex"
                  flexDir={['column', 'row', 'row']}
                  justifyContent="space-between"
                  alignItems={['flex-end', 'center', 'center']}
                >
                  {total > 0 && (
                    <HStack w="100%">
                      <Heading as="h4" size="md" color="#01BFA2">
                        {q}
                      </Heading>
                      <Heading as="h4" size="md">
                        에 대한 검색 결과입니다. 총{total}개
                      </Heading>
                    </HStack>
                  )}
                  <AccordionButton
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="0.5rem"
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
                        <Text>필터 접기</Text>
                        <AccordionIcon />
                      </>
                    ) : (
                      <>
                        <Text>필터 더보기</Text>
                        <CgOptions fontSize="1rem" />
                      </>
                    )}
                  </AccordionButton>
                </Box>
                <MainOptions />
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}
