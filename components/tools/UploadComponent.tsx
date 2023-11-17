import { Box } from '@chakra-ui/react';
import React from 'react';
import { SlCloudUpload } from 'react-icons/sl';

interface UploadComponentProps {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  highlightColor: string;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  highlightColor,
}) => {
  return (
    <Box
      className={`uploader ${isDragActive ? 'active' : ''} ${
        highlightColor === '#01bda1' ? 'light' : 'dark'
      }`}
      w="50%"
      maxW="550px"
      h="250px"
      mt="3rem"
      mb="3rem"
      p="5px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      border="4px dashed #6d6d6d"
      borderRadius="20px"
      cursor="pointer"
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
  );
};

export default UploadComponent;
