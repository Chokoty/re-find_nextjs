import { Button, useColorMode } from '@chakra-ui/react';

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
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Button bg="none" _hover={{ bg: '#none' }} onClick={toggleColorMode}>
      {isDark ? <FiMoon /> : <SunIcon />}
    </Button>
  );
};

export default DarkModeToggle;
