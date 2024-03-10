import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
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
  const keyword = searchParams.get('keyword') ?? '';

  return (
    <>
      <SearchBar />
      <Accordion allowMultiple>
        <AccordionItem
          border="none"
          _focus={{ boxShadow: 'none' }}
          _hover={{ boxShadow: 'none' }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  display="flex"
                  flexDir={['column', 'row', 'row']}
                  justifyContent="space-between"
                  alignItems={['flex-end', 'center', 'center']}
                  p="0 1rem"
                >
                  <Text
                    m="1rem 0"
                    as="h3"
                    fontSize="1.5rem"
                    fontWeight="bold"
                    textAlign="left"
                    // w="500px"
                  >
                    {keyword}에 대한 검색 결과입니다. 총{total}개
                  </Text>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="0.5rem"
                    p="1rem 0"
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
                  </Box>
                </AccordionButton>
              </h2>
              <MainOptions />
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}
