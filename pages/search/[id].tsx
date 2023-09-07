import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>Search {id}</div>;
};
