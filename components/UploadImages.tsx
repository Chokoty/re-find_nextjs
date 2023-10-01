import { useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
// import { DifferenceHashBuilder, Hash } from 'browser-image-hash';
import { useDropzone } from 'react-dropzone';
import { SlCloudUpload } from 'react-icons/sl';

import { useImageHash } from '@/hook/useImageHash';
import { darkMode, lightMode } from '@/styles/theme';

// const DynamicImageHash = dynamic(() => import('@/components/ImageHash'), {
//   ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
//   loading: () => <p>Loading...</p>,
// });

const UploadImages = ({ getDataFromChild, getHashFromChild }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // 이미지 파일만 받기
  const acceptedFiles = useCallback((files) => {
    const images = files.filter((file) => file.type.startsWith('image/')); // files 배열에서 type이 image인 것만 필터링합니다.
    console.log(images);
  }, []);
  const { generateHashForImage } = useImageHash();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      // maxSize: 1048576, // 1MB
    },
    onDrop: async (droppedFiles) => {
      // console.log(droppedFiles);
      getDataFromChild(
        droppedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // 업로드한 각 이미지에 대한 해시 생성
      // const hashes = [];
      // for (const file of acceptedFiles) {
      //   const hash = await generateHashForImage(file);
      //   hashes.push(hash.toString());
      // }
      const hashes = await Promise.all(
        droppedFiles.map(async (file) => {
          const hash = await generateHashForImage(file);
          return hash.toString();
        })
      );
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
      {/* <DynamicImageHash /> */}
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
