import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaComment, FaEye, FaImage, FaThumbsUp } from 'react-icons/fa';

const SearchOptionsComponent = () => {
  // const getButtonColor = (buttonName) => {
  //   return tab === buttonName ? '#FFFFFF' : '#828282';
  // };

  const iconStyle = {
    width: '1rem',
    height: '1rem',
  };

  return (
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
        <AccordionButton p="1rem 0">
          <AccordionIcon />
          <Box as="span" flex="1" textAlign="left">
            <Text>검색옵션</Text>
          </Box>
        </AccordionButton>
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
              <Select placeholder="알잘딱순">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="1rem"
            m="1rem"
          >
            <Input w="16rem" placeholder="말머리" />
            <Input w="16rem" placeholder="태그" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="1rem"
            m="1rem"
          >
            <Tag
              size="md"
              // key={size}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>징버거</TagLabel>
              <TagCloseButton />
            </Tag>
            <Tag
              size="md"
              // key={size}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>산타</TagLabel>
              <TagCloseButton />
            </Tag>
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
              <Checkbox>
                <FaEye style={iconStyle} />
              </Checkbox>
              <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>~</Text>
              <NumberInput w="5rem" defaultValue={500} min={500} max={999}>
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
              <Checkbox>
                <FaThumbsUp style={iconStyle} />
              </Checkbox>
              <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>~</Text>
              <NumberInput w="5rem" defaultValue={500} min={500} max={999}>
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
              <Checkbox>
                <FaComment style={iconStyle} />
              </Checkbox>
              <NumberInput w="5rem" defaultValue={0} min={0} max={500}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>~</Text>
              <NumberInput w="5rem" defaultValue={500} min={500} max={999}>
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
  );
};

export default SearchOptionsComponent;
