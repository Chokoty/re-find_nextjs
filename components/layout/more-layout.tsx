import { Button, Divider, Heading, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

import { MoreHeader } from '@/components/layout/MoreHeader';
import { darkMode, lightMode } from '@/styles/theme';

interface OtherLayoutProps {
  children: ReactNode;
  title: string;
}

const MoreLayout: React.FC<OtherLayoutProps> = ({ children, title }) => {
  const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <div className="body">
      <MoreHeader title={title} />
      <Divider
        className="divider"
        style={{
          margin: '1rem auto',
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
