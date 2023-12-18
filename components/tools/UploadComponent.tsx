import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { SlCloudUpload } from 'react-icons/sl';

import { darkMode, lightMode } from '@/styles/theme';

interface UploadComponentProps {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
}) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  return (
    <Box
      backgroundColor={bgColor2}
      borderRadius="1rem"
      m="1rem 0"
      p="1rem 0"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      maxW="700px"
    >
      <Box
        className={`uploader ${isDragActive ? 'active' : ''} ${
          highlightColor === '#01bda1' ? 'light' : 'dark'
        }`}
        border="0.25rem dashed #6d6d6d"
        borderRadius="1rem"
        cursor="pointer"
        p="1rem"
        maxW="500px"
        w="100%"
      >
        <Box
          {...getRootProps()}
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
        >
          <input {...getInputProps()} />
          <SlCloudUpload className="logo" />
          <Box>
            {isDragActive ? (
              <Text>이미지를 여기에 드롭하세요!</Text>
            ) : (
              <Text maxW="300px" textAlign="center">
                이미지를 여기로 드래그하거나 화면을 클릭하여 파일을&nbsp;
                <span
                  className="underline"
                  style={{
                    color: highlightColor,
                  }}
                >
                  업로드
                </span>
                하세요.
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadComponent;
