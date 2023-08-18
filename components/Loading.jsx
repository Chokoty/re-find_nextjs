import React from 'react';
import { Spinner } from '@chakra-ui/react';
const Loading = () => {
  return (
    <div className="loading">
      <div>검색중</div>
      &nbsp;
      <Spinner size="sm" />
    </div>
  );
};

export default Loading;
