import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

type Props = {
  containerClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  buttonClassName: string;
};

export default function ThemeToggleButton({
  containerClassName,
  iconWrapperClassName,
  iconClassName,
  buttonClassName,
}: Props) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button className={containerClassName} onClick={toggleTheme}>
      <div className={iconWrapperClassName}>
        {isDarkMode ? (
          <FiSun className={iconClassName} />
        ) : (
          <FiMoon className={iconClassName} />
        )}
      </div>
      <p className={buttonClassName}>화면 스타일</p>
    </button>
  );
}
