import { Box, useColorModeValue } from '@chakra-ui/react';
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
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="20rem"
      maxW="700px"
    >
      <Box
        className={`uploader ${isDragActive ? 'active' : ''} ${
          highlightColor === '#01bda1' ? 'light' : 'dark'
        }`}
        border="0.25rem dashed #6d6d6d"
        borderRadius="1rem"
        cursor="pointer"
        // w="50%"
        maxW="550px"
        h="250px"
        m="2rem 0"
        p="5px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          {...getRootProps()}
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <input {...getInputProps()} />
          <SlCloudUpload className="logo" />
          <Box mt="1rem">
            {isDragActive ? (
              <p>이미지를 여기에 드롭하세요!</p>
            ) : (
              <p>
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
              </p>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadComponent;
