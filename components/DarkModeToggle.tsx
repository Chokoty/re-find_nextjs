import {
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { SunIcon } from '@chakra-ui/icons';
import { FiMoon } from 'react-icons/fi';

type DarkModeToggleProps = {
  className?: string;
  // 다른 props 정의
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className,
  ...props
}) => {
  // const { colorMode, toggleColorMode } = useColorMode();
  // const isDark = colorMode === 'dark';

  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FiMoon, SunIcon);

  return (
    // <Button bg="none" _hover={{ bg: '#none' }} onClick={toggleColorMode}>
    //   {isDark ? <FiMoon /> : <SunIcon />}
    // </Button>

    <IconButton
      onClick={toggleColorMode}
      bg="none"
      _hover={{ bg: '#none' }}
      // variant={'ghost'}
      aria-label="Toggle dark mode"
      icon={<Icon />}
    />
  );
};

export default DarkModeToggle;
