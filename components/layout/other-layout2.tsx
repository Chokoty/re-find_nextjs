import { Button, Divider, Heading, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

import { MobileHeader } from '@/components/layout/MobileHeader';
import Title from '@/components/title/Title';
import { darkMode, lightMode } from '@/styles/theme';

interface OtherLayoutProps {
  children: ReactNode;
  title: string;
}

const OtherLayout2: React.FC<OtherLayoutProps> = ({ children, title }) => {
  const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <div className="body">
      <MobileHeader />
      <Heading
        className="page-title"
        as="h1"
        size="lg"
        noOfLines={1}
        color={color}
      >
        {title}
      </Heading>
      <Divider
        mt="5"
        className="divider"
        style={{
          margin: '48px auto',
          maxWidth: '10rem',
          backgroundColor: bgColor,
          height: '5px',
        }}
      />
      <div className="layout">{children}</div>
    </div>
  );
};

export default OtherLayout2;
