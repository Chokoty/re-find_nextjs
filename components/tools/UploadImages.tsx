import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import UploadComponent from '@/components/tools/UploadComponent';
import { useUpload } from '@/hook/useUpload';
import { darkMode, lightMode } from '@/styles/theme';

interface UploadImagesProps {
  getDataFromChild: (files: File[]) => void;
  getHashFromChild: (hashes: string[]) => void;
}
const UploadImages: React.FC<UploadImagesProps> = ({
  getDataFromChild,
  getHashFromChild,
}) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const { getRootProps, getInputProps, isDragActive } = useUpload({
    getDataFromChild,
    getHashFromChild,
  });
  return (
    <UploadComponent
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      highlightColor={highlightColor}
    />
  );
};
export default UploadImages;
