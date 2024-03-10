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
import { FaComment, FaEye, FaImage, FaThumbsUp } from 'react-icons/fa';

export default function MainOptions() {
    const iconStyle = {
      width: '1rem',
      height: '1rem',
    };

  return (
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
  );
}
