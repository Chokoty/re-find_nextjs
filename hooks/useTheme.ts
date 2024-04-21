'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const result = localStorage.getItem('theme');
    if (result) {
      setTheme(result as Theme);
    } else {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  };

  return { theme, toggleTheme };
};
