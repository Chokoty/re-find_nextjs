import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FaComment, FaEye, FaImage, FaThumbsUp } from 'react-icons/fa';

const formatArtistValue = (value) => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}만`;
  }
  if (value >= 1000) {
    // return `${(value / 1000).toFixed(1)}천`;
    return value.toLocaleString();
  }
  return value;
};

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
    default:
      return null;
  }
};

const SortTypeIcons = ({ sortCriteria, sortTypes, artist }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      pl={['2.2rem', '0', '0']}
      alignItems="center"
      flexWrap="wrap"
      gap="0.5rem"
      w={['200px', '260px', '260px']}
    >
      {sortTypes.map(
        (sortType, index2) =>
          artist[sortType.value] !== 0 && (
            <Text
              key={index2}
              color={
                sortCriteria.field === sortType.value ? 'pink.500' : 'gray.500'
              }
              size="sm"
              mr="1rem"
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
  );
};

export default SortTypeIcons;
