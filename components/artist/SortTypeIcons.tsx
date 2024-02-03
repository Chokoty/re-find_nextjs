import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import {
  FaBookmark,
  FaComment,
  FaEye,
  FaImage,
  FaThumbsUp,
} from 'react-icons/fa';

import { sortTypes } from '@/data/artists';
import { formatArtistValue } from '@/hook/useFormatArtistValue';

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

const SortTypeIcons = ({ sortCriteria, artist, component }) => {
  let align = ['center', 'center', 'center'];
  if (component === 'inIndex') {
    align = ['center', 'center', 'flex-start'];
  }

  if (!artist) {
    // artist가 null인 경우 예외 처리
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection={['column', 'row', 'row']}
      alignItems="center"
      gap="0.5rem"
    >
      <Box display="flex" flexDirection="row" gap="1rem" mr="0.5em">
        {sortTypes.slice(0, 3).map(
          (sortType, index2) =>
            artist[sortType.value] !== 0 && (
              <Text
                key={index2}
                color={
                  !sortCriteria || sortCriteria?.field !== sortType.value
                    ? 'gray.500'
                    : 'pink.500'
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
      <Box
        display="flex"
        gap="0.5rem"
        justifyContent="center"
        alignItems="center"
      >
        {sortTypes.slice(3, 5).map(
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
    </Box>
  );
};

export default SortTypeIcons;
