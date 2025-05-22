'use client';

import dynamic from 'next/dynamic';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheck, FaUserEdit } from 'react-icons/fa';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import {
  똥강아지1,
  똥강아지2,
  뚤기1,
  뚤기2,
  라니1,
  라니2,
  박쥐1,
  박쥐2,
  세균단1,
  세균단2,
  이파리1,
  이파리2,
  주폭도1,
  주폭도2,
  팬치1,
  팬치2,
} from '@/lib/images';
import { useLogout, useMyInfo } from '@/service/client/useCommonService';

// Profile image selection function
const getUserImage = (
  nick: string | undefined,
  profimg: string | null,
  isHovered: boolean
): string | StaticImageData => {
  if (profimg) return profimg;

  const userImages: Record<
    string,
    { default: StaticImageData; hover: StaticImageData }
  > = {
    똥강아지: { default: 똥강아지1, hover: 똥강아지2 },
    뚤기: { default: 뚤기1, hover: 뚤기2 },
    라니: { default: 라니1, hover: 라니2 },
    박쥐: { default: 박쥐1, hover: 박쥐2 },
    세균단: { default: 세균단1, hover: 세균단2 },
    이파리: { default: 이파리1, hover: 이파리2 },
    주폭도: { default: 주폭도1, hover: 주폭도2 },
    팬치: { default: 팬치1, hover: 팬치2 },
  };
  return (
    userImages[nick || '이파리']?.[isHovered ? 'hover' : 'default'] || 이파리1
  );
};

// Modal component for icon selection
const IconSelectionModal = ({
  onSelect,
  onClose,
}: {
  onSelect: (img: StaticImageData) => void;
  onClose: () => void;
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const icons = [
    { name: '이파리', default: 이파리1, hover: 이파리2 },
    { name: '뚤기', default: 뚤기1, hover: 뚤기2 },
    { name: '똥강아지', default: 똥강아지1, hover: 똥강아지2 },
    { name: '박쥐', default: 박쥐1, hover: 박쥐2 },
    { name: '팬치', default: 팬치1, hover: 팬치2 },
    { name: '세균단', default: 세균단1, hover: 세균단2 },
    { name: '주폭도', default: 주폭도1, hover: 주폭도2 },
    { name: '라니', default: 라니1, hover: 라니2 },
  ];

  const handleSave = () => {
    if (selectedIcon) {
      const selected = icons.find((icon) => icon.name === selectedIcon);
      if (selected) {
        onSelect(selected.default);
      }
    }
    onClose();
  };

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <h2 className="mb-4 text-xl font-bold">프로필 아이콘 선택</h2>
        <div className="grid grid-cols-4 gap-4">
          {icons.map((icon) => (
            <div
              key={icon.name}
              className="relative cursor-pointer transition"
              onClick={() => setSelectedIcon(icon.name)}
              onMouseEnter={() => setHoveredIcon(icon.name)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="relative">
                <Image
                  src={hoveredIcon === icon.name ? icon.hover : icon.default}
                  alt={`${icon.name} 아이콘`}
                  width={48}
                  height={48}
                  className={`rounded-full transition ${
                    selectedIcon === icon.name ? 'brightness-50' : ''
                  }`}
                />
                {selectedIcon === icon.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black flex size-8 items-center justify-center rounded-full bg-opacity-50">
                      <FaCheck className="text-xl text-white drop-shadow-md" />
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-1 text-center text-sm text-white">{icon.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="w-[48%] rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSave}
            disabled={!selectedIcon}
          >
            저장
          </button>
          <button
            className="w-[48%] rounded bg-gray-200 p-2 dark:bg-gray-700"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default function UserProfile() {
  const { data: userData } = useMyInfo();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | StaticImageData | null
  >(null);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleIconSelect = (image: StaticImageData) => {
    setSelectedImage(image);
    // Here you would typically update the user's profile image via an API call
    console.log('Selected image:', image);
    // Placeholder for API call to update profimg
  };

  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <div className="mb-2 flex w-full content-end justify-between gap-4 pl-2 pr-1 md:mb-4 md:pl-8 md:pr-2">
        <div className="flex items-center gap-6">
          <div
            className="group relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleImageClick}
          >
            <Image
              width={120}
              height={120}
              className="rounded-full object-cover transition group-hover:brightness-50"
              src={
                selectedImage ||
                (getUserImage(
                  userData?.nick,
                  userData?.profimg || null,
                  isHovered
                ) as string)
              }
              alt={userData?.nick || '프로필 이미지'}
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-opacity-0 transition group-hover:bg-opacity-50">
              <MdOutlineModeEditOutline className="size-10 text-white opacity-0 transition group-hover:opacity-100" />
            </div>
          </div>
          <p className="text-left text-xl font-extrabold md:text-2xl">
            {userData?.nick}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <IconSelectionModal
          onSelect={handleIconSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
