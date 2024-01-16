import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import {
  FaBookmark,
  FaComment,
  FaEye,
  FaImage,
  FaThumbsUp,
} from 'react-icons/fa';

import { formatArtistValue } from '@/hook/useFormatArtistValue';

// const formatArtistValue = (value) => {
//   if (value >= 10000) {
//     return `${(value / 10000).toFixed(1)}만`;
//   }
//   if (value >= 1000) {
//     // return `${(value / 1000).toFixed(1)}천`;
//     return value.toLocaleString();
//   }
//   return value;
// };

const iconStyle = {
  width: '1rem',
  height: '1rem',
};

const IconComponent = ({ sortTypeName }) => {
  switch (sortTypeName) {
    case '총 작품':
      return <FaImage style={iconStyle} />;
    case '총 조회':
      return <FaEye style={iconStyle} />;
    case '총 댓글':
      return <FaComment style={iconStyle} />;
    case '총 좋아요':
      return <FaThumbsUp style={iconStyle} />;
    case '총 구독':
      return <FaBookmark style={iconStyle} />;
    default:
      return null;
  }
};

const SortTypeIcons = ({ sortCriteria, sortTypes, artist, component }) => {
  let align = ['center', 'center', 'center'];
  if (component === 'inIndex') {
    align = ['center', 'center', 'flex-start'];
  }

  return (
    <Box
      display="flex"
      flexDirection={['column', 'row', 'row']}
      alignItems="center"
      gap="0.5rem"
    >
      <Box
        display="flex"
        flexDirection="row"
        // justifyContent={align}
        // // pl={['2.2rem', '0', '0']}
        // alignItems="center"
        // flexWrap="wrap"
        gap="1rem"
        mr="0.5em"
        // // w="100%"
        // minW={['200px', '312px', '312px']}
      >
        {sortTypes.slice(0, 3).map(
          (sortType, index2) =>
            artist[sortType.value] !== 0 && (
              <Text
                key={index2}
                color={
                  sortCriteria?.field === sortType.value
                    ? 'pink.500'
                    : 'gray.500'
                }
                size="sm"
                display="flex"
                flexDirection="row"
                gap="0.5rem"
              >
                <IconComponent sortTypeName={sortType.name} />
                <Text fontSize="xs">
                  {formatArtistValue(artist[sortType.value])}
                </Text>
              </Text>
            )
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {artist[sortTypes[3].value] !== 0 && (
          <Text
            color={
              sortCriteria?.field === sortTypes[3].value
                ? 'pink.500'
                : 'gray.500'
            }
            size="sm"
            display="flex"
            flexDirection="row"
            gap="0.5rem"
          >
            <IconComponent sortTypeName={sortTypes[3].name} />
            <Text fontSize="xs">
              {formatArtistValue(artist[sortTypes[3].value])}
            </Text>
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SortTypeIcons;
