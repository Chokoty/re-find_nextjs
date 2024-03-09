// import { useState } from 'react';
// import { useDisclosure, useToast } from '@chakra-ui/react';
import { useShallow } from 'zustand/react/shallow';

import { useImageUploadStore } from '@/store/imageUploadStore';

import BeforeUpload from './BeforeUpload';
import ImageViewer from './ImageViewer';

export default function Upload() {
  const { hashs, uploadedfiles } = useImageUploadStore(
    useShallow((state) => ({
      hashs: state.hashs,
      uploadedfiles: state.uploadedfiles,
    }))
  );

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
