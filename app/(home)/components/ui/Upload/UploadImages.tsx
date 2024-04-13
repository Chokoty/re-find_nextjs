import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useUpload } from '@/app/(home)/hooks/useUpload';
import { useImageUploadStore } from '@/app/(home)/store/imageUploadStore';
import UploadImage from '@/public/static/images/refind-1.webp';
import UploadHoverImage from '@/public/static/images/refind-2.webp';
import { darkMode, lightMode } from '@/styles/theme';

export default function UploadImages() {
  const { setHashs, setUploadedFiles } = useImageUploadStore(
    useShallow((state) => ({
      setHashs: state.setHashs,
      setUploadedFiles: state.setUploadedFiles,
    }))
  );
  const { getRootProps, getInputProps, isDragActive } = useUpload({
    getDataFromChild: setUploadedFiles,
    getHashFromChild: setHashs,
  });
  const [hover, setHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = () => {
    setIsClick(true);
    // 마우스 클릭 풀면 다시 false로 바꾸기
    setTimeout(() => {
      setIsClick(false);
    }, 1000);
  };

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      w={width}
      maxW="700px"
      backgroundColor={bgColor2}
      borderRadius="1rem"
      m="1rem 0"
      p="1rem 0"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0 8px 20px 0 rgba(0,0,0,.08)"
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
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
          {/* <SlCloudUpload className="logo" /> */}
          {isClick ? (
            <Image
              src={UploadHoverImage}
              alt="리파인드 로고2"
              width={160}
              height={160}
              unoptimized
            />
          ) : (
            <Image
              src={hover ? UploadHoverImage : UploadImage}
              alt="리파인드 로고1"
              width={160}
              height={160}
              unoptimized
            />
          )}

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
}
