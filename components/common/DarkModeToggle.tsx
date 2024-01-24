import { SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMoon } from 'react-icons/fi';

type DarkModeToggleProps = {
  className?: string;
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className }) => {
  // const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FiMoon, SunIcon);

  return (
    <IconButton
      className={className}
      flexShrink={0}
      // onClick={toggleColorMode}
      bg="none"
      variant={'ghost'}
      borderRadius="50%"
      aria-label="Toggle dark mode"
      icon={
        <Icon
          style={{
            width: '2rem',
            height: '2rem',
          }}
        />
      }
      w="3rem"
      h="3rem"
      p="0.5rem"
    />
  );
};

export default DarkModeToggle;
