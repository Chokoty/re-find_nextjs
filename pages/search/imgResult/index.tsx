// import { Box, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

// import { BsChatDots } from 'react-icons/bs';
// import { darkMode, lightMode } from '@/styles/theme';
import OtherLayout from '@/components/layout/other-layout';
import { useStore } from '@/store/store';
// import AuthorProfileCard from "./AuthorProfileCard";

const Result = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  // const color = useColorModeValue(lightMode.color, darkMode.color);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="Support">
      <div className="toLink">result</div>
    </OtherLayout>
  );
};

export default Result;
