'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import GALLERY_LIST from '@/app/gallery/lib/const';
import { useGalleryArtworks } from '@/app/gallery/service/client/useGalleryService';
import { useFanartTotalCountStore } from '@/app/gallery/store/fanartTotalCountStore';
import Alert from '@/components/Alert';
import ViewSkeleton from '@/components/Skeleton/ViewSkeleton';
import MasonryView from '@/components/View/MasonryView';
import SimpleView from '@/components/View/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';
import { useResponsive } from '@/hooks/useResponsive';
import {
  useDeleteCustomAlbum,
  useEditCustomAlbum,
} from '@/app/myLibrary/service/client/useMyService';
import { useMyInfo } from '@/service/client/useCommonService';
import useModal from '@/hooks/useModal';
import DeleteCustomAlbumModal from '@/app/album/components/Modal/DeleteCustomAlbumModal';

type Props = {
  value: string;
};
// TODO: 4번 렌더링되는 문제 해결 필요
export default function DetailedGallery({ value: galleryType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const viewTypeInit = searchParams.get('viewType') ?? '';
  const memberInit = searchParams.get('member') ?? '';

  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
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

  // -----------커스텀 앨범일 경우(start)------------
  const { data: user } = useMyInfo();
  const customAlbumInfo = user?.albums.find((album) => album.id === albumName);
  const isMyCustomAlbum = customAlbumInfo !== undefined;
  const { show: showDeleteCustomAlbumModal } = useModal(DeleteCustomAlbumModal);
  const { mutate: editCustomAlbumInfo, status: editStatus } =
    useEditCustomAlbum('user--3635', {
      name: 'test',
      is_public: true,
    });
  const handleEditCustomAlbumInfo = () => {
    editCustomAlbumInfo();
  };
  const handleDeleteCustomAlbum = () => {
    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      title: customAlbumInfo?.name,
    });
  };
  // -----------커스텀 앨범일 경우(end)------------

  // // infinite scroll을 위한 옵저버
  const isMobile = useResponsive();
  // const isIsdPick = value === 'isdPick';
  const option = isMobile ? { rootMargin: '1000px 0px' } : undefined;
  const { ref, inView } = useInView(option);
  // 멤버 선택 > isdPick일 경우
  const [selected, setSelected] = useState(
    memberInit !== '' ? memberInit : 'isd'
  );
  // 뷰 선택 메뉴
  // TODO: 추후 URL 쿼리스트링으로 받아오는 값에 따라 초기 뷰와 상태 설정
  const [activeView, setActiveView] = useState(
    viewTypeInit !== '' ? viewTypeInit : 'masonry'
  ); // 초기 뷰 설정
  const [sortType, setSortType] = useState(() => {
    if (sortTypeInit !== '') {
      return sortTypeInit;
    }
    return 'alzaltak';
  }); // 초기 상태 설정'

  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 / 가리기
  const { total, status, artworks, fetchNextPage, isFetchingNextPage } =
    useGalleryArtworks({ sortType, galleryType });
  const { setTotal } = useFanartTotalCountStore((state) => ({
    setTotal: state.setTotal,
  }));

  const updateURL = (SortType: string, ViewType: string, member?: string) => {
    const params = new URLSearchParams();
    params.append('viewType', ViewType);
    params.append('sortType', SortType);
    // URL에 query string 추가
    const queryString = params.toString();
    router.push(`/gallery/${albumName}?${queryString}`);
  };

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      if (menuText === sortType) return;
      setSortType(menuText);

      updateURL(menuText, activeView, selected);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = (view: string) => {
    setActiveView(view);
    updateURL(sortType, view, selected);
  };

  // value가 isd일 경우, 멤버 선택하기
  const handleMemberClick = (member: string) => {
    setSelected(member);
    updateURL(sortType, activeView, member);
  };

  // 삭제된 게시글 보이기
  const handleShowDeleted = () => {
    setIsDeletedVisible((prev) => !prev);
  };

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (!total) return;
    setTotal(total);
  }, [total]);

  return (
    <>
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        selectedMember={selected}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        onMemberClick={handleMemberClick}
        isMyCustomAlbum={isMyCustomAlbum}
        handleEditAlbum={handleEditCustomAlbumInfo}
        handleDeleteAlbum={handleDeleteCustomAlbum}
        topOffset={59}
        hasTotalCounter={!shouldHideTotalCounter(albumName) && !!total}
        // isIsdPick={isIsdPick}
      />
      {status === 'pending' ? (
        <ViewSkeleton view={activeView} />
      ) : status === 'error' ? (
        <Alert />
      ) : (
        artworks && (
          <div className="w-full overflow-hidden px-2 py-0 2xs:p-6 2xs:py-0">
            {activeView === 'masonry' && (
              <MasonryView
                artworks={
                  isDeletedVisible && GALLERY_LIST !== null
                    ? artworks
                    : artworks.filter((artwork) => artwork?.is_hyum === false)
                }
                // isIsdPick={isIsdPick}
                isDeletedVisible={isDeletedVisible}
              />
            )}
            {activeView === 'grid' && (
              <SimpleView
                artworks={
                  isDeletedVisible && GALLERY_LIST !== null
                    ? artworks
                    : artworks.filter((artwork) => artwork?.is_hyum === false)
                }
                isDeletedVisible={isDeletedVisible}
                // handleLoading={handleLoading}
              />
            )}
            {isFetchingNextPage ? (
              <div className="my-6 flex w-full items-center justify-center">
                <HashLoader color="#01BFA2" />
              </div>
            ) : (
              // Observer를 위한 div
              <div ref={ref} className="h-20 w-full" />
            )}
          </div>
        )
      )}
    </>
  );
}
