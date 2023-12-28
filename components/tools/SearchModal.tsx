import {
  Box,
  Checkbox,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

import SearchOptions from '@/components/search/SearchOptions';
import { darkMode, lightMode } from '@/styles/theme';

const SearchModal = ({ isOpen, onClose }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const nickname = e.target.value; // 입력된 값
      window.location.href = `/artists/${nickname}`;
      onClose();
    }
  };

  // modal
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // color
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const searchBgColor = useColorModeValue('#E1E1E1', '#303134');

  const handleInputClick = () => {
    document.querySelector('input').focus();
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay zIndex={150} />
      <ModalContent
        maxW={['100%', '80%', '70%']}
        // maxW={['100%', '66%']}
        mt={0}
        boxShadow="none"
        border={`1px solid ${color7}`}
        borderRadius="1rem"
        background={bg2}
        p="0 0.5rem"
      >
        <ModalHeader
          display="flex"
          justifyContent="center"
          alignItems="center"
          pl={1}
          pr={1}
        >
          <InputGroup m="0 " w={['100%', '90%', '90%']}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <span
                style={{
                  width: '1px',
                  height: '16px',
                  marginLeft: '8px',
                  background: color7,
                  position: 'absolute',
                  top: '25%',
                  right: '10%',
                }}
              ></span>
            </InputLeftElement>

            <Input
              placeholder="키워드 검색"
              h="2.25rem"
              pl="3rem"
              borderRadius="2rem"
              bg={bg3}
              alignItems="center"
              onClick={handleInputClick}
              focusBorderColor="#01BFA2"
              size="md"
              // value={nickname}
              // onChange={handleSearch}
              _hover={{
                backgroundColor: bg2,
                borderColor: '#01BFA2',
              }}
              _focus={{ backgroundColor: bg2 }}
              sx={{
                'input::placeholder': {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                },
              }}
            />
            <InputRightElement
              pointerEvents="none"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="0.5rem"
            >
              <FaSearch
                style={{
                  position: 'relative',
                  top: '-0.1rem',
                  right: '1rem',
                  width: '1.2rem',
                  height: '1.2rem',
                  color: color7,
                }}
              />
            </InputRightElement>
          </InputGroup>
        </ModalHeader>
        <ModalBody
          pb={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            mb="1rem"
            gap="0.5rem"
          >
            <Text>검색에 포함할 대상을 선택하세요.</Text>
            <Stack spacing={5} direction="row">
              <Checkbox defaultChecked>작품</Checkbox>
              <Checkbox defaultChecked>작가</Checkbox>
            </Stack>
          </Box>
          <SearchOptions />
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          현재 작가닉네임 검색만 가능합니다!
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
