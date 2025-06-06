'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { MdAdd, MdClose, MdDelete } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import ShareLinkButton from '@/app/album/components/Button/ShareLinkButton';
import TotalCounter from '@/app/album/components/TotalCounter';
import queryOptions from '@/app/album/service/client/queries';
import { useGalleryPageInfo } from '@/app/album/service/client/useGalleryService';
import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import Button from '@/components/Button';
import SelectionModeButton from '@/components/Button/SelectionModeButton';
import AddFanartToAlbumFinderModal from '@/components/Modal/AddFanartToAlbumFinderModal';
import EditCustomAlbumInfoModal from '@/components/Modal/EditCustomAlbumInfoModal';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
  const { data: userInfo } = useMyInfo();
  // TODO: link URL 서버에서 데이터 요청
  const { data: pageInfo } = useGalleryPageInfo(pageName);
  const { isDeleteMode, setIsDeleteMode } = useDeleteModeStore(
    useShallow((state) => ({
      isDeleteMode: state.isDeleteMode,
      setIsDeleteMode: state.setIsDeleteMode,
    }))
  );

  const { show: showAddFanartToAlbumFinderModal } = useModal(
    AddFanartToAlbumFinderModal
  );
  const { show: showEditCustomAlbumInfoModal } = useModal(
    EditCustomAlbumInfoModal
  );
  const { queryKey } = queryOptions.galleryArtworks({
    sortType: sortTypeInit === '' ? 'alzaltak' : sortTypeInit,
    galleryType: pageName,
  });
  const queryClient = useQueryClient();
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  const handleOpenAddFanartToAlbumFinderModal = () => {
    if (isDeleteMode) {
      setIsDeleteMode(false);
    }
    showAddFanartToAlbumFinderModal({
      applyCustomMaxWidth: true,
      id: albumName,
      refreshAlbumArtworks,
    });
  };

  const setFanarts = useCheckFanartStore((state) => state.setFanarts);

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

  const handleDeleteButtonClick = () => {
    if (isDeleteMode) {
      setIsDeleteMode(false); // 삭제 모드 취소
      setFanarts([]);
    } else {
      setIsDeleteMode(true);
    }
  };
  // 페이지 벗어날 때 편집 모드 초기화
  useEffect(() => {
    return () => {
      setIsDeleteMode(false);
      setFanarts([]);
    };
  }, []);
  if (!pageInfo) return null;
  const {
    id: pageType,
    title,
    description,
    linkTitle,
    linkUrl,
    owned,
    is_public,
  } = pageInfo;

  const showEditModal = () => {
    showEditCustomAlbumInfoModal({
      animateDir: 'bottom',
      albumName: pageName,
      initialTitle: title,
      initialDescription: description,
      isBackdropClick: true,
    });
  };

  if (!owned && is_public === false) {
    return (
      <div className="my-6 w-full text-center text-sm text-gray-500 dark:text-gray-400">
        이 앨범은 현재 <strong>비공개</strong> 상태입니다. 본인에게만 보입니다.
      </div>
    );
  }

  return (
    <div className="my-6 flex w-full flex-col items-start justify-start pl-2 md:pl-8">
      <>
        {userInfo &&
          (owned ? (
            <div className="flex w-full items-center justify-between">
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
                  팬아트 추가
                </span>
              </Button>
              <Button
                intent="ghost-gray"
                onClick={handleDeleteButtonClick}
                additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
              >
                {isDeleteMode ? (
                  <>
                    <MdClose className="mr-1 text-red-300" size={16} />
                    <span className="text-red-300">삭제취소</span>
                  </>
                ) : (
                  <>
                    <MdDelete
                      className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700"
                      size={20}
                    />
                    <span className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700">
                      삭제
                    </span>
                  </>
                )}
              </Button>
            </div>
          ) : (
            <SelectionModeButton />
          ))}
        <div className="w-full">
          {/* <h1 className={titleClassName}>{title}</h1> */}
          {owned ? (
            <button
              type="button"
              className={`m-0 mt-1.5 cursor-pointer break-keep p-0 font-pop text-4xl sm:text-5xl`}
              onClick={showEditModal}
              style={{ outline: 'none' }}
            >
              {title}
            </button>
          ) : (
            <h1 className={titleClassName}>{title}</h1>
          )}
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
          <ShareLinkButton
            owned={owned}
            isAlbumPublic={is_public}
            albumName={pageName}
          />
          <div className="2md:hidden">
            {!shouldHideTotalCounter(albumName) && <TotalCounter />}
          </div>
        </div>
      </>
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
