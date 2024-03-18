'use client';

import {
  background,
  Box,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { darkMode, lightMode } from '@/styles/theme';

const btnList = ['전체', '이세돌', '고멤', '우왁굳', '금손 작가들의 방'];

type Props = {
  type: string;
  range: { start: number; end: number };
  selected: string | null;
  setSelected: ((value: string) => void) | null;
  isdPick: boolean;
};
export default function ThisWeekBtnList({
  type,
  range,
  selected,
  setSelected,
}: Props) {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

  const onClick = (value: string) => {
    if (setSelected) {
      setSelected(value);
    }
  };

  return (
    <Box
      w="100%"
      mb="1rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      maxW="680px"
      overflowX="scroll"
      gap="0.5rem"
      as="ul"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
    >
      {btnList.slice(range.start, range.end).map((item, index) => (
        <Box key={index}>
          <Button
            h="36px"
            borderRadius="2rem"
            border={selected === item ? 'none' : `0.3px solid ${color}`}
            onClick={() => onClick(item)}
            variant={selected === item ? 'solid' : 'outline'}
            bg={selected === item ? highlight : 'transparent'}
            color={selected === item ? 'white' : 'black'}
            _hover={{
              background: selected === item ? highlight : 'transparent',
            }}
          >
            <Text
              fontSize="md"
              fontWeight="bold"
              textAlign="left"
              color={color}
            >
              {item}
            </Text>
          </Button>
        </Box>
      ))}
    </Box>
  );
}
