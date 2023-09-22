import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Checkbox,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { lightMode, darkMode } from '@/styles/theme';
import { FaSearch } from 'react-icons/fa';

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
  const searchBgColor = useColorModeValue('#E1E1E1', '#303134');

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW={['100%', '70%']}>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          <InputGroup m="0">
            <InputLeftElement
              pointerEvents="none"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="0.5rem"
            >
              <FaSearch
                style={{
                  marginTop: '0.3rem',
                  width: '1.2rem',
                  height: '1.2rem',
                  color: color,
                }}
              />
            </InputLeftElement>
            <Input
              placeholder="검색"
              h="3rem"
              borderRadius="3rem"
              border="none"
              bg={searchBgColor}
              alignItems="center"
              onKeyDown={handleKeyPress}
            />
          </InputGroup>
        </ModalHeader>
        <ModalBody
          pb={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text>포함할 검색어를 선택해주세요</Text>
          <Stack spacing={5} direction="row">
            <Checkbox defaultChecked isDisabled>
              작가닉네임
            </Checkbox>
            <Checkbox isDisabled>제목</Checkbox>
            <Checkbox isDisabled>키워드</Checkbox>
          </Stack>
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
