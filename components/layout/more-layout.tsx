import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React from 'react';

import MoreHeader from '@/components/layout/MoreHeader';
import { darkMode, lightMode } from '@/styles/theme';

interface Props {
  children: ReactNode;
  title: string;
}

export default function MoreLayout({ children, title }: Props) {
  // const isIndex = router.asPath.endsWith('/more'); // 현재 경로가 '/more'로 끝나는지 확인
  const isIndex = false;
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  return (
    <Box className="body" m="0 auto" background={bg}>
      <MoreHeader title={title} isIndex={isIndex} />
      <Divider
        className="divider"
        style={{
          margin: '2rem auto',
          maxWidth: '10rem',
          backgroundColor: highlight,
          height: '5px',
          borderRadius: '5px',
        }}
      />
      <div className="layout">{children}</div>
    </Box>
  );
}
