import { Button, Divider, Heading, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

import Title from '@/components/title/Title';
import { darkMode, lightMode } from '@/styles/theme';

interface OtherLayoutProps {
  children: ReactNode;
  title: string;
}

export default function OtherLayout({ children, title }: OtherLayoutProps) {
  const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <div className="body">
      {/* TODO: NextLink와 Button이 직접 연결되면 클릭에 문제 */}
      <NextLink href="/" legacyBehavior>
        <Button
          variant="ghost"
          height="80px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="48px"
        >
          <Title />
        </Button>
      </NextLink>
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
}
