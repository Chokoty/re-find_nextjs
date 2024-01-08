import { Box, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Preview = ({ files }) => {
  const file = files[0];
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  const img = {
    display: 'flex',
    height: '100%',
    borderRadius: '1rem',
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={width}
      marginBottom={30}
      className="preview"
    >
      <Image
        alt={file.name}
        width={475}
        height={475}
        style={img}
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        unoptimized
      />
    </Box>
  );
};

export default Preview;
