import { useRouter } from 'next/router';
import React from 'react';

const ImageResult = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>img {id}</div>;
};

export default ImageResult;
