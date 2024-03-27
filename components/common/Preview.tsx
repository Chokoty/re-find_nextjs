import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import { useImageUploadStore } from '@/store/imageUploadStore';

type Props = {
  data: any;
  isLoading: boolean;
};

export default function Preview({ data, isLoading }: Props) {
  const { files } = useImageUploadStore(
    useShallow((state) => ({
      files: state.uploadedfiles,
    }))
  );
  // const width = useBreakpointValue({ base: '90%', md: '100%' });

  const imgLoading = {
    display: 'flex',
    height: '100%',
    borderRadius: '1rem',
  };
  const img = {
    display: 'flex',
    height: '100%',
    borderRadius: '1rem 1rem 0 0',
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      // width={width}
      width="100%"
    >
      {files ? (
        <Image
          alt={files[0].name}
          width={500}
          height={500}
          style={
            (files && isLoading) || (files && data?.ids?.length === 0)
              ? imgLoading
              : img
          }
          src={files[0].preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(files[0].preview);
          }}
          unoptimized
        />
      ) : null}
    </Box>
  );
}
