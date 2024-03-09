import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import { darkMode, lightMode } from '@/styles/theme';

type Prop = { onOpen: () => void };

export default function BackButton({ onOpen }: Prop) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const handleInputClick = () => {
    // console.log('handleInputClick');
    // if (router.pathname !== '/search') {
    //   router.push('/search');
    // }
    onOpen();
  };

  return (
    <InputGroup m="0 " w="70%">
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
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
  );
}
