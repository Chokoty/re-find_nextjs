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
    <Box className="mx-auto min-h-[240vh] w-full" background={bg}>
      <EventHeader title={title} />
      <Box w="100%" mt="1rem">
        {children}
      </Box>
    </Box>
  );
}
