'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import type { FileWithPreview } from '@/types';

import { useImageHash } from './useImageHash';

interface UseUploadProps {
  getDataFromChild: (files: FileWithPreview[]) => void;
  getHashFromChild: (hashes: string[]) => void;
}

export const useUpload = ({
  getDataFromChild,
  getHashFromChild,
}: UseUploadProps) => {
  const { generateHashForImage } = useImageHash();

  const onDrop = useCallback(
    async (droppedFiles: File[]) => {
      const filesWithPreview = droppedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })) as FileWithPreview[];
      getDataFromChild(filesWithPreview);

      const hashes = await Promise.all(
        droppedFiles.map(async (file) => {
          const hash = await generateHashForImage(file);
          return hash.toString();
        })
      );
      getHashFromChild(hashes);
    },
    [getDataFromChild, getHashFromChild, generateHashForImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
  });

  return { getRootProps, getInputProps, isDragActive };
};
