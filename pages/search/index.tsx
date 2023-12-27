import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [query, setQuery] = useState('');

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.badge);

  const [sliderValue, setSliderValue] = useState([10, 30]);
  const [showTooltip, setShowTooltip] = useState([false, false]);

  // useEffect(() => {
  //   alert('준비중입니다!');
  // }, []);

  const handleSearch = () => {
    if (query) {
      // router.push(`/artists/${query}`);
    }
    // alert('준비중입니다!');
  };
  const handleKeyPress2 = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchNickname = () => {
    if (nickname) {
      router.push(`/artists/${nickname}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchNickname();
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <Box mb="10px" p="1rem" textAlign="center" w="100%">
      <Box
        m="0 auto"
        maxW="1024px"
        w="100%"
        background={bg2}
        p="1rem"
        mb="1rem"
        borderRadius="1rem"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          mb="4rem"
        >
          <Text as="h1" size="2xl">
            검색
          </Text>
          <Input
            placeholder="작가 닉네임, 작품 제목, 키워드 "
            maxW="400px"
            size="md"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button colorScheme="blue" size="md" onClick={handleSearchNickname}>
            Search
          </Button>
          <Accordion allowMultiple w="100%">
            {/* <AccordionItem
              border="none"
              _focus={{ boxShadow: 'none' }}
              _hover={{ boxShadow: 'none' }}
            >
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box as="span" flex="1" textAlign="left">
                    멤버 별
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  gap="0.5rem"
                >
                  {members.map((member) => (
                    <Button
                      key={member.id}
                      variant="outline"
                      borderRadius="2rem"
                    >
                      {member.name}
                    </Button>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem
              border="none"
              _focus={{ boxShadow: 'none' }}
              _hover={{ boxShadow: 'none' }}
            >
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box as="span" flex="1" textAlign="left">
                    <Text>전체 기간</Text>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <RangeSlider
                  aria-label={['min', 'max']}
                  defaultValue={[10, 30]}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </AccordionPanel>
            </AccordionItem> */}
            <AccordionItem
              border="none"
              _focus={{ boxShadow: 'none' }}
              _hover={{ boxShadow: 'none' }}
            >
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box as="span" flex="1" textAlign="left">
                    <Text>검색옵션</Text>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Divider />
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  gap="1rem"
                  m="1rem"
                >
                  <Box>
                    <Select placeholder="전체기간">
                      <option value="option1">전체기간</option>
                      <option value="option2">1일</option>
                      <option value="option3">1주</option>
                      <option value="option3">1개월</option>
                      <option value="option3">6개월</option>
                      <option value="option3">1년</option>
                    </Select>
                  </Box>
                  <Box>
                    <Select placeholder="전체 게시판">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </Box>
                  <Box>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </Box>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  flexWrap="wrap"
                  gap="1rem"
                  m="1rem"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Checkbox>조</Checkbox>
                    <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text>~</Text>
                    <NumberInput
                      w="5rem"
                      defaultValue={500}
                      min={500}
                      max={999}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Checkbox>좋</Checkbox>
                    <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text>~</Text>
                    <NumberInput
                      w="5rem"
                      defaultValue={500}
                      min={500}
                      max={999}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Checkbox>댓</Checkbox>
                    <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text>~</Text>
                    <NumberInput
                      w="5rem"
                      defaultValue={500}
                      min={500}
                      max={999}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
      <Box
        m="0 auto"
        maxW="1024px"
        w="100%"
        background={bg2}
        p="1rem"
        mb="1rem"
        borderRadius="1rem"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
      >
        <Text
          pl="1rem"
          m="1rem 0"
          as="h3"
          fontSize="1.5rem"
          fontWeight="bold"
          textAlign="left"
          // w="500px"
        >
          &apos;모시깽이&apos; 에 대한 검색 결과입니다. 총 700
        </Text>
        <Tabs>
          <TabList>
            <Tab>전체(700)</Tab>
            <Tab>작가(20)</Tab>
            <Tab>작품(680)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box></Box>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* <Box
        m="0 auto"
        mt="3rem"
        w="94%"
        mb="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SimpleGrid
          w={['100%', '90%']}
          minChildWidth={['150px', '200px']} // 모바일에서는 150px, 그 외에서는 200px
          spacing={['0.5rem', '0.75rem']}
          justifyContent="center"
          alignItems="center"
          placeItems="center"
          m="0 auto"
        >
          {data
            .slice()
            .reverse()
            .map((item, index) => (
              <NextLink
                key={index}
                href={`/artworks/${encodeURIComponent(item.key)}`}
              >
                <Box
                  key={index}
                  p="1rem"
                  m={['0', '0.5rem']}
                  mb=" 1rem"
                  w={['158px', '200px']}
                  h={['158px', '200px']}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background={bg2}
                  borderRadius="1rem"
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="bold" textAlign="left">
                    {item.title}
                  </Text>
                </Box>
              </NextLink>
            ))}
        </SimpleGrid>
      </Box> */}
    </Box>
  );
};

export default Search;
