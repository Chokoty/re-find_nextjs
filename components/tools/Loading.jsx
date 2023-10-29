import { Spinner } from '@chakra-ui/react';
import React from 'react';

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
