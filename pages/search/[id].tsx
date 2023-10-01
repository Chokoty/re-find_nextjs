import { useRouter } from 'next/router';
import React from 'react';

const Search = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>Search {id}</div>;
};

export default Search;
