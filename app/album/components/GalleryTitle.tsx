'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import ShareLinkButton from '@/app/album/components/Button/ShareLinkButton';
import DeleteCustomAlbumModal from '@/app/album/components/Modal/DeleteCustomAlbumModal';
import TotalCounter from '@/app/album/components/TotalCounter';
import queryOptions from '@/app/album/service/client/queries';
import { useGalleryPageInfo } from '@/app/album/service/client/useGalleryService';
import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useEditModeStore } from '@/app/album/store/editModeStore';
import { useEditCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import Button from '@/components/Button';
import AddFanartToAlbumFinderModal from '@/components/Modal/AddFanartToAlbumFinderModal';
import useModal from '@/hooks/useModal';
import { BBangTTi } from '@/lib/images';
import { useMyInfo } from '@/service/client/useCommonService';

type Props = {
  pageName: string;
};

const titleClassName = 'mt-1.5 font-pop text-4xl sm:text-5xl   break-keep';
const descriptionClassName =
  'text-base md:text-lg lg:text-xl  text-wrap max-w-[280px] md:max-w-[530px]  break-keep';

export default function GalleryTitle({ pageName }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
  // TODO: link URL 서버에서 데이터 요청
  const { data } = useGalleryPageInfo(pageName);
  const { data: user } = useMyInfo();
  const { isEdit, setIsEdit } = useEditModeStore(
    useShallow((state) => ({
      isEdit: state.isEdit,
      setIsEdit: state.setIsEdit,
    }))
  );
  const { mutate: editCustomAlbumInfo, status: editStatus } =
    useEditCustomAlbum(albumName, {
      name: 'test',
      is_public: true,
    });

  const { show: showAddFanartToAlbumFinderModal } = useModal(
    AddFanartToAlbumFinderModal
  );
  const { show: showDeleteCustomAlbumModal } = useModal(DeleteCustomAlbumModal);
  const { queryKey } = queryOptions.galleryArtworks({
    sortType: sortTypeInit === '' ? 'alzaltak' : sortTypeInit,
    galleryType: pageName,
  });
  const queryClient = useQueryClient();
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  const handleOpenAddFanartToAlbumFinderModal = () => {
    showAddFanartToAlbumFinderModal({
      applyCustomMaxWidth: true,
      id: albumName,
      refreshAlbumArtworks,
    });
  };

  const handleEditCustomAlbumInfo = () => {
    editCustomAlbumInfo();
  };

  const setFanarts = useCheckFanartStore((state) => state.setFanarts);
  const customAlbumInfo = user?.albums.find((album) => album.id === albumName);
  const isMyCustomAlbum = customAlbumInfo !== undefined;
  // 특정 이름에 대해 hasTotalCounter를 false로 설정하는 함수
  const shouldHideTotalCounter = (n: string) => {
    const hiddenNames = [
      'gosegu',
      'ine',
      'viichan',
      'jingburger',
      'lilpa',
      'jururu',
    ];
    return hiddenNames.includes(n);
  };

  const handleBackButton = () => {
    router.push('/');
  };
  // 편집/편집 취소 버튼 핸들러
  const handleEditButtonClick = () => {
    if (isEdit) {
      setIsEdit(false); // 편집 취소
      setFanarts([]); // 체크된 팬아트 초기화
    } else {
      setIsEdit(true); // 편집 시작
    }
  };
  const handleDeleteCustomAlbum = () => {
    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      title: customAlbumInfo?.name,
    });
  };
  // 페이지 벗어날 때 편집 모드 초기화
  useEffect(() => {
    return () => {
      setIsEdit(false); // 컴포넌트 언마운트 시 상태 리셋
      setFanarts([]);
    };
  }, []);

  if (!data) return null;
  const { id: pageType, title, description, linkTitle, linkUrl } = data;

  const activeColor = 'text-green-600';
  const inactiveColor = 'text-blackAlpha-700 dark:text-whiteAlpha-700';

  return (
    <div className="my-6 flex w-full flex-col items-start justify-start pl-2 md:pl-8">
      {pageType === 'galleryHome' ? (
        <>
          <p className={`font-semibold ${descriptionClassName}`}>
            {description}
          </p>
          <GalleryHomeTitle />
        </>
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <Button
              intent="link-gray"
              onClick={handleBackButton}
              additionalClass="p-0 h-7 min-h-7"
            >
              <FaAngleLeft className="mr-1" />
              <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                팬아트 갤러리로 돌아가기
              </p>
            </Button>
            {isMyCustomAlbum && (
              <div className="flex items-center gap-1">
                <Button
                  intent="ghost-gray"
                  onClick={handleOpenAddFanartToAlbumFinderModal}
                  additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
                >
                  <MdAdd
                    className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700"
                    size={20}
                  />
                  <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                    추가
                  </span>
                </Button>
                <Button
                  intent="ghost-gray"
                  onClick={handleDeleteCustomAlbum}
                  additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
                >
                  <MdDelete
                    className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700"
                    size={20}
                  />
                  <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                    삭제
                  </span>
                </Button>
                <Button
                  intent="ghost-gray"
                  onClick={handleEditButtonClick}
                  additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
                >
                  <MdEdit
                    className={`mr-1 ${isEdit ? activeColor : inactiveColor}`}
                    size={14}
                  />
                  <span className={isEdit ? activeColor : inactiveColor}>
                    편집
                  </span>
                </Button>
              </div>
            )}
          </div>
          <div className="w-full">
            <h1 className={titleClassName}>{title}</h1>
            <div className="mb-6 mt-1.5">
              <p className={`font-bold ${descriptionClassName}`}>
                {description}
                {linkUrl && (
                  <Link
                    href={linkUrl}
                    target="_blank"
                    className="link-to-wakzoo mt-1 flex items-center text-green-highlight hover:underline dark:text-pink-highlight"
                  >
                    {linkTitle}
                    <LuExternalLink className="ml-2 text-lg font-semibold 2xs:block" />
                  </Link>
                )}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <ShareLinkButton />
            <div className="2md:hidden">
              {!shouldHideTotalCounter(albumName) && <TotalCounter />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const GalleryHomeTitle = () => {
  return (
    <div className={`flex items-center justify-center gap-1 ${titleClassName}`}>
      <p>팬아트</p>
      <div className="relative h-10 w-20 overflow-hidden rounded-full bg-green-highlight px-2 dark:bg-pink-highlight 2xs:h-10 2xs:w-24">
        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
          src={BBangTTi}
          alt="애기뺑띠"
          // fill
          width={160}
          height={64}
          priority
          // sizes="(max-width: 479px) 15vw, (max-width: 500px) 40vw, 60vw"
          unoptimized
        />
      </div>
      <p className="text-green-highlight dark:text-pink-highlight">갤러리</p>
    </div>
  );
};
