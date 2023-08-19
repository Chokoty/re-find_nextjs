import React, { useCallback } from 'react';

import { useColorModeValue } from '@chakra-ui/react';
import { SlCloudUpload } from 'react-icons/sl';
import { useDropzone } from 'react-dropzone';

import { lightMode, darkMode } from '@/styles/theme';

const UploadImages = ({ getDataFromChild }) => {
  const acceptedFiles = useCallback((files) => {
    // 이미지 파일만 받기 위해서는 files 배열에서 type이 image인 것만 필터링합니다.
    const images = files.filter((file) => file.type.startsWith('image/'));
    // console.log(images);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      // maxSize: 1048576, // 1MB
    },
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      getDataFromChild(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  return (
    <div
      className={`uploader ${
        // 01bda1 - 라이트, ef5a9a - 다크
        isDragActive ? 'active' : ''
      } ${highlightColor === '#01bda1' ? 'light' : 'dark'}`}
    >
      <div
        {...getRootProps({
          className: 'dropzone',
        })}
      >
        <input {...getInputProps()} />
        <SlCloudUpload className="logo" />
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
