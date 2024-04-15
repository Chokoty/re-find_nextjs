'use client';

import { QuestionIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react';

import { darkMode, lightMode } from '@/lib/theme';

type Prop = {
  description: string;
};

export default function HelpPopOver({ description }: Prop) {
  const popoverBg = useColorModeValue(lightMode.bg2, darkMode.bg3);
  const color7 = useColorModeValue(lightMode.color7, darkMode.color7);
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          // colorScheme="#01BFA2"
          aria-label="question button"
          bg="none"
          color={color7}
          variant={'ghost'}
          borderRadius="50%"
          icon={<QuestionIcon />}
        />
      </PopoverTrigger>
      <PopoverContent bg={popoverBg}>
        <PopoverArrow bg={popoverBg} />
        <PopoverCloseButton />
        <PopoverHeader>검색 도움말</PopoverHeader>
        <PopoverBody textAlign="start">{description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
