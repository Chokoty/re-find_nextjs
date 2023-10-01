import React, { useCallback, useState } from 'react';

import { useColorModeValue } from '@chakra-ui/react';
import { DifferenceHashBuilder, Hash } from 'browser-image-hash';
import { useDropzone } from 'react-dropzone';
import { SlCloudUpload } from 'react-icons/sl';
import { lightMode, darkMode } from '@/styles/theme';

const UploadImages = ({ getDataFromChild, getHashFromChild }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // 이미지 파일만 받기
  const acceptedFiles = useCallback((files) => {
    const images = files.filter((file) => file.type.startsWith('image/')); // files 배열에서 type이 image인 것만 필터링합니다.
    console.log(images);
  }, []);

  // 이미지 해시 생성
  async function generateHashForImage(imageFile) {
    console.log('generateHashForImage');
    const builder = new DifferenceHashBuilder();
    const objectURL = URL.createObjectURL(imageFile);
    const imageHash = await builder.build(new URL(objectURL));
    console.log('Generated Hash:', imageHash.toString());
    URL.revokeObjectURL(objectURL); // 오브젝트 URL 해제
    return imageHash;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      // maxSize: 1048576, // 1MB
    },
    onDrop: async (acceptedFiles) => {
      // console.log(acceptedFiles);
      getDataFromChild(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // 업로드한 각 이미지에 대한 해시 생성
      const hashes = [];
      for (const file of acceptedFiles) {
        const hash = await generateHashForImage(file);
        hashes.push(hash.toString());
      }
      // 생성된 해시 배열을 부모 컴포넌트로 전송
      getHashFromChild(hashes); 
    },
  });

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  return (
    <div
      className={`uploader ${isDragActive ? 'active' : ''} ${
        highlightColor === '#01bda1' ? 'light' : 'dark'
      }`}
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
