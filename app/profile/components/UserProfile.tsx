'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
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
  세균이1,
  세균이2,
  이파리1,
  이파리2,
  주폭도1,
  주폭도2,
  팬치1,
  팬치2,
} from '@/lib/images';
import queryOptions from '@/service/client/queries';
import { useMyInfo, useUpdateMyInfo } from '@/service/client/useCommonService';

// 아이콘 이름과 이미지 매핑
const iconMap: Record<ProfImgType, StaticImageData> = {
  똥강아지1,
  똥강아지2,
  뚤기1,
  뚤기2,
  라니1,
  라니2,
  박쥐1,
  박쥐2,
  세균이1,
  세균이2,
  이파리1,
  이파리2,
  주폭도1,
  주폭도2,
  팬치1,
  팬치2,
  '': 이파리1,
};

// 선택 가능한 아이콘 리스트
const icons = Object.entries(iconMap)
  .filter(([name]) => name.endsWith('1'))
  .map(([name, img]) => ({ name, img }));

// 현재 프로필 이미지 가져오기
const getUserImage = (profImgType: ProfImgType | undefined) =>
  iconMap[profImgType || '이파리1'] || 이파리1;

// 아이콘 선택 모달
const IconSelectionModal = ({
  selectedIcon,
  setSelectedIcon,
  onClose,
  onSave,
  isSaving,
}: {
  selectedIcon: ProfImgType | null;
  setSelectedIcon: (icon: ProfImgType) => void;
  onClose: () => void;
  onSave: () => void;
  isSaving: boolean;
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<ProfImgType | null>(null);

  function getHoverImage(iconName: ProfImgType): StaticImageData {
    if (iconName.endsWith('1')) {
      const hoverName = `${iconName.slice(0, -1)}2` as ProfImgType;
      return iconMap[hoverName] || iconMap[iconName];
    }
    return iconMap[iconName];
  }

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <h2 className="mb-4 text-xl font-bold">프로필 아이콘 선택</h2>
        <div className="grid grid-cols-4 gap-4">
          {icons.map((icon) => (
            <div
              key={icon.name}
              className="relative cursor-pointer transition"
              onClick={() => setSelectedIcon(icon.name as ProfImgType)}
              onMouseEnter={() => setHoveredIcon(icon.name as ProfImgType)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="relative">
                <Image
                  src={
                    hoveredIcon === icon.name
                      ? getHoverImage(icon.name as ProfImgType)
                      : icon.img
                  }
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
            onClick={onSave}
            disabled={!selectedIcon || isSaving}
          >
            {isSaving ? '저장 중...' : '저장'}
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
  const [selectedIcon, setSelectedIcon] = useState<ProfImgType | null>(null);

  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.myInfo();

  const handleOnSuccess = () => {
    setIsModalOpen(false);
    setSelectedIcon(null);
    queryClient.invalidateQueries({ queryKey });
    toast.success('프로필 이미지가 변경되었습니다.');
  };

  const { mutate: updateMyInfo, isPending } = useUpdateMyInfo({
    nick: userData?.nick || '',
    profImgType: selectedIcon || '',
    handleOnSuccess,
  });

  const handleImageClick = () => {
    setIsModalOpen(true);
    setSelectedIcon(null);
  };

  const handleSave = () => {
    if (!selectedIcon) return;
    updateMyInfo();
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
              src={getUserImage(userData?.profimg as ProfImgType)}
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
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          isSaving={isPending}
        />
      )}
    </div>
  );
}
