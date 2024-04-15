import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import EventHeader from '@/app/events/components/EventHeader';
import { darkMode, lightMode } from '@/lib/theme';

type Props = {
  children: ReactNode;
  title: string;
};

export default function EventLayout({ children, title }: Props) {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  return (
    <Box className="body" minH="240vh" background={bg} w="100%" m="0 auto">
      <EventHeader title={title} />
      <Box w="100%" mt="1rem" className="layout">
        {children}
      </Box>
    </Box>
  );
}
