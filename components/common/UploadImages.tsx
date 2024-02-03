import React from 'react';

import UploadComponent from '@/components/common/UploadComponent';
import { useUpload } from '@/hook/useUpload';

interface UploadImagesProps {
  getDataFromChild: (files: File[]) => void;
  getHashFromChild: (hashes: string[]) => void;
}
const UploadImages: React.FC<UploadImagesProps> = ({
  getDataFromChild,
  getHashFromChild,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useUpload({
    getDataFromChild,
    getHashFromChild,
  });
  return (
    <UploadComponent
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
    />
  );
};
export default UploadImages;
