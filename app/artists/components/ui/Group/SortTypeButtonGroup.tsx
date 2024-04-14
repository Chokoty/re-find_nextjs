import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';

import { sortTypes } from '@/data/artists';
import { darkMode, lightMode } from '@/lib/theme';
import type { SortCriteria } from '@/types';

type Props = {
  sortCriteria: SortCriteria;
  handleChangeSortCriteria: (field: keyof AuthorCommon) => void;
};

export default function SortTypeButtonGroup({
  sortCriteria,
  handleChangeSortCriteria,
}: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="100%"
      maxW="1024px"
      backgroundColor={bg2}
      borderRadius="1rem"
      p="0 1rem"
    >
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          margin: '1rem 0',
        }}
      >
        {sortTypes.map((sortType, index) => (
          <li key={index}>
            <Button
              size="md"
              onClick={() => handleChangeSortCriteria(sortType.value)}
              backgroundColor={
                sortCriteria.field === sortType.value ? highlight : bg3
              }
              _hover={{
                backgroundColor:
                  sortCriteria.field === sortType.value ? highlight : bg3,
              }}
            >
              <Text>{sortType.name}</Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                style={{
                  transform:
                    sortCriteria.field === sortType.value && sortCriteria.active
                      ? 'rotate(0deg)'
                      : 'rotate(180deg)',
                  transition: 'transform 0.1s ease-in-out',
                }}
              >
                <path d="M480-360 280-560h400L480-360Z" fill={color}></path>
              </svg>
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
}
