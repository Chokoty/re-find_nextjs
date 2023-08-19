import React, { useEffect } from 'react';
import { Text, Box, Button, Image } from '@chakra-ui/react';

import { useColorModeValue } from '@chakra-ui/react';
import { BsChatDots } from 'react-icons/bs';

import { lightMode, darkMode } from '@/styles/theme';
import OtherLayout from '../../components/layout/other-layout';
import { useStore } from '../../store/store';
// import AuthorProfileCard from "./AuthorProfileCard";

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const color = useColorModeValue(lightMode.color, darkMode.color);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="Support">
      <div className="toLink">search</div>
    </OtherLayout>
  );
};

export default Search;
