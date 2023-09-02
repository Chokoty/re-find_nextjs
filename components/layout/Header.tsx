import React, { useRef, useEffect, useState } from 'react';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { lightMode, darkMode } from '@/styles/theme';

import DarkModeToggle from '../DarkModeToggle';
import MyDrawer from '../MyDrawer';
import NoticeBanner from '../NoticeBanner';
import { Sling as Hamburger } from 'hamburger-react';

import { useStore } from '../../store/store';
import { useThemeStore } from '../../store/themeStore';

export const Header = () => {
  // useStore
  // const count = useStore((state) => state.count);
  const [isOpen, setIsOpen] = useStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  // const { theme, colors, toggleTheme } = useThemeStore();

  const myDrawerRef = useRef(null);

  // const [isObserver, setIsObserver] = useState(null);
  // const [isOpen, setIsOpen] = React.useState(false);

  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  // useEffect(() => {
  //     setIsObserver(myDrawerRef);
  // }, [myDrawerRef]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (e) => {
      // console.log(e.target);
      if (
        e.target.className === 'hamburger-react' ||
        e.target.closest('.hamburger-react')
      ) {
        return;
      }
      if (e.target.tagName.toLowerCase() === 'a') {
        console.log('a');
        return; // Return early if the clicked element is an <a> tag
      }
      if (myDrawerRef.current && !myDrawerRef.current.contains(e.target)) {
        // console.log("other");
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <Box bg={colors[theme].bg} color={colors[theme].color}>
    <Box>
      <NoticeBanner />
      <header style={{ backgroundColor: bgColor, color: color }}>
        {/* <header> */}
        <DarkModeToggle className="dark-mode-toggle" />
        <MyDrawer
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          ref={myDrawerRef}
        />
        <Box className="hamburger">
          <Hamburger
            label="펼치기" // An ARIA label to improve accessibility.
            size={20}
            toggled={isOpen}
            toggle={toggleDrawer}
          />
        </Box>
      </header>
    </Box>
  );
};
