import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

export default function MoreButton() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Link
        href="/gallery/weekRanking"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <CiCirclePlus size="100" />
        <Text>더보기</Text>
      </Link>
    </Box>
  );
}
