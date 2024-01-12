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
      // width={width}
      width="100%"
      marginBottom={30}
    >
      <Image
        alt={file.name}
        width={500}
        height={500}
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
