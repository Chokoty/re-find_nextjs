import Link from 'next/link';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';

const BackToLibraryLink = () => (
  <Link
    href="/myLibrary"
    className="mb-4 flex w-max items-center text-blackAlpha-700 dark:text-whiteAlpha-700"
  >
    <FaAngleLeft className="mr-1" />
    <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
      내 라이브러리
    </span>
  </Link>
);

export default BackToLibraryLink;
