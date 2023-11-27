import { Button, Divider, Heading, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React from 'react';

import { MoreHeader } from '@/components/layout/MoreHeader';
import { darkMode, lightMode } from '@/styles/theme';

interface OtherLayoutProps {
  children: ReactNode;
  title: string;
}

const MoreLayout: React.FC<OtherLayoutProps> = ({ children, title }) => {
  const router = useRouter(); // useRouter 사용
  const isIndex = router.asPath.endsWith('/more'); // 현재 경로가 '/more'로 끝나는지 확인

  const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <div className="body">
      <MoreHeader title={title} isIndex={isIndex} />
      <Divider
        className="divider"
        style={{
          margin: '2rem auto',
          maxWidth: '10rem',
          backgroundColor: bgColor,
          height: '5px',
        }}
      />
      <div className="layout">{children}</div>
    </div>
  );
};

export default MoreLayout;
