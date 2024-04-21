import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import MoreHeader from '@/app/more/components/MoreHeader';
import { darkMode, lightMode } from '@/lib/theme';

interface Props {
  children: ReactNode;
  title: string;
}

export default function MoreLayout({ children, title }: Props) {
  // const isIndex = router.asPath.endsWith('/more'); // 현재 경로가 '/more'로 끝나는지 확인
  const isIndex = false;
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  return (
    <Box m="0 auto" background={bg}>
      <MoreHeader title={title} isIndex={isIndex} />
      <Divider
        style={{
          margin: '2rem auto',
          maxWidth: '10rem',
          backgroundColor: highlight,
          height: '5px',
          borderRadius: '5px',
        }}
      />
      <div>{children}</div>
    </Box>
  );
}
