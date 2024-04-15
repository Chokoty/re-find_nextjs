// import { useState } from 'react';
// import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useImageUploadStore } from '@/app/(home)/store/imageUploadStore';

import BeforeUpload from './BeforeUpload';
import ImageViewer from './ImageViewer';

export default function Upload() {
  const { hashs, uploadedfiles, resetFiles } = useImageUploadStore(
    useShallow((state) => ({
      hashs: state.hashs,
      uploadedfiles: state.uploadedfiles,
      resetFiles: state.resetFiles,
    }))
  );

  // 다른 페이지로 이동할 때 초기화 (해당 페이지로 돌아왔을 때 초기화 되어있어야 함)
  useEffect(() => {
    resetFiles();
  }, []);

  return (
    <>
      {uploadedfiles && uploadedfiles.length !== 0 && hashs !== null ? (
        <ImageViewer hashs={hashs} />
      ) : (
        <BeforeUpload />
      )}
    </>
  );
}
