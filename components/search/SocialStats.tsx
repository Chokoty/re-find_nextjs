import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import {
  FaBookmark,
  FaComment,
  FaEye,
  FaImage,
  FaThumbsUp,
} from 'react-icons/fa';

import { formatArtistValue } from '@/hook/useFormatArtistValue';
import { darkMode, lightMode } from '@/styles/theme';

const iconStyle = {
  width: '1rem',
  height: '1rem',
};

const IconComponent = {
  article: <FaImage style={iconStyle} />,
  view: <FaEye style={iconStyle} />,
  comment: <FaComment style={iconStyle} />,
  like: <FaThumbsUp style={iconStyle} />,
  subscriber: <FaBookmark style={iconStyle} />,
};

type Props = {
  view?: number;
  like?: number;
  comment?: number;
  article?: number;
  subscriber?: number;
};

// TODO: 해당 컴포넌트 AuthorList > SortTypeIcons 에서 사용되는 것과 유사하다.따라서 해당 컴포넌트를 잘 작성하여 이를 적용한다.
export default function SocialStats(props: Props) {
  const stats = Object.entries(props).filter(([_, n]) => n !== undefined);
  const color9 = useColorModeValue(lightMode.color9, darkMode.color9);

  return (
    <Box display="flex" flexDirection="row" gap="1rem" mr="0.5em">
      {stats.map(([s, n]) => (
        <Text
          key={s}
          // color={
          //   !sortCriteria || sortCriteria?.field !== sortType.value
          //     ? 'gray.500'
          //     : 'pink.500'
          // }
          color={color9}
          size="sm"
          display="flex"
          flexDirection="row"
          gap="0.5rem"
        >
          {/* <IconComponent sortTypeName={sortType.name} /> */}
          {IconComponent[s as keyof typeof IconComponent]}
          <Text fontSize="xs">{formatArtistValue(n)}</Text>
        </Text>
      ))}
    </Box>
  );
}
