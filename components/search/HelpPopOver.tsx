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
} from '@chakra-ui/react';

type Prop = {
  description: string;
};

export default function HelpPopOver({ description }: Prop) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          // colorScheme="#01BFA2"
          aria-label="question button"
          bg="none"
          color="gray.500"
          variant={'ghost'}
          borderRadius="50%"
          icon={<QuestionIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>검색 도움말</PopoverHeader>
        <PopoverBody textAlign="start">{description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
