import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import useModal from '@/hooks/useModal';
import { darkMode, lightMode } from '@/styles/theme';

import SearchModal from './SearchModal';

export default function SearchModalOpener() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color7, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const handleInputClick = () => {
    show();
  };
  const { show } = useModal(SearchModal);

  return (
    <>
      <InputGroup m="0 " w="70%" onClick={handleInputClick}>
        <InputLeftElement pointerEvents="none" color={color7} fontSize="1.2em">
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
          cursor="pointer"
          placeholder="키워드 검색"
          h="2.25rem"
          pl="3rem"
          pr={['0px', '3rem']}
          borderRadius="2rem"
          bg={bg3}
          alignItems="center"
          focusBorderColor="#01BFA2"
          size="md"
          _hover={{
            backgroundColor: bg2,
            borderColor: '#01BFA2',
          }}
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
          display={['none', 'flex']}
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
    </>
  );
}
