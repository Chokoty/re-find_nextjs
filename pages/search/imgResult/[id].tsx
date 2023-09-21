import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ImageResult = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>img {id}</div>;
};

export default ImageResult;
