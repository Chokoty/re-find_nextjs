import { DifferenceHashBuilder } from 'browser-image-hash';
import { useState } from 'react';

export const useImageHash = () => {
  const [hash, setHash] = useState(null);

  const generateHashForImage = async (imageFile) => {
    // console.log('generateHashForImage');
    const builder = new DifferenceHashBuilder();
    const objectURL = URL.createObjectURL(imageFile);
    const imageHash = await builder.build(new URL(objectURL));
    // console.log('Generated Hash:', imageHash.toString());
    URL.revokeObjectURL(objectURL); // Release the object URL
    setHash(imageHash.toString());
    return imageHash;
  };

  return { hash, generateHashForImage };
};
