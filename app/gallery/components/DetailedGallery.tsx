'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import GALLERY_LIST from '@/app/gallery/lib/const';
import { useArtworks } from '@/app/gallery/service/client/useGalleryService';
import { useFanartTotalCountStore } from '@/app/gallery/store/fanartTotalCountStore';
import Alert from '@/components/Alert';
import ViewSkeleton from '@/components/Skeleton/ViewSkeleton';
import MasonryView from '@/components/View/MasonryView';
import SimpleView from '@/components/View/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  value: string;
  endpoint: string;
};
// TODO: 4번 렌더링되는 문제 해결 필요
export default function DetailedGallery({ value, endpoint }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const viewTypeInit = searchParams.get('viewType') ?? '';
  const memberInit = searchParams.get('member') ?? '';

  const pathNameParts = window.location.pathname.split('/');
  const name = pathNameParts[pathNameParts.length - 1];
  console.log(name);
  // infinite scroll을 위한 옵저버
  const isMobile = useResponsive();
  const isIsdPick = value === 'isdPick';
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
  const [sortType, setSortType] = useState(
    sortTypeInit !== '' ? sortTypeInit : isIsdPick ? 'latest' : 'alzaltak'
  ); // 초기 상태 설정

  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 / 가리기
  const { total, status, artworks, fetchNextPage, isFetchingNextPage } =
    useArtworks({ endpoint, sortType, isIsdPick, selected });
  const { setTotal } = useFanartTotalCountStore((state) => ({
    setTotal: state.setTotal,
  }));

  const buildQueryString = (obj: any) => {
    const queryString = Object.keys(obj)
      .filter(
        (key) => obj[key] !== '' && obj[key] !== undefined && obj[key] !== null
      )
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join('&');

    return queryString;
  };
  // const updateURL = (params: Record<string, string>) => {
  //   const allSearchParams: Record<string, string> = {};

  //   searchParams.forEach((v, key) => {
  //     allSearchParams[key] = v;
  //   });

  //   Object.assign(allSearchParams, params);

  //   return allSearchParams;

  //   // const queryString = buildQueryString(allSearchParams);
  //   // console.log(queryString);
  //   // return queryString;
  //   // router.push(`/gallery/${name}?${queryString}`);
  // };

  // const updateURLWithMember = (
  //   params: Record<string, string>,
  //   includeMember: boolean
  // ) => {
  //   const updatedParams = { ...params };
  //   if (includeMember) {
  //     updatedParams.member = selected;
  //   }
  //   // updateURL(updatedParams);
  //   return updateURL(updatedParams);
  // };

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      if (menuText === sortType) return;
      setSortType(menuText);

      // updateURL({ viewType: activeView, sortType: menuText, member: selected });
      // const params = updateURLWithMember(
      //   { viewType: activeView, sortType: menuText },
      //   isIsdPick
      // );
      // router.push(`/gallery/${name}?${buildQueryString(params)}`);

      const allSearchParams: { [anyProp: string]: string } = {};

      searchParams.forEach((v, key) => {
        allSearchParams[key] = v;
      });
      allSearchParams.member = selected;
      allSearchParams.sortType = menuText; // 현재 sortType 상태를 추가
      allSearchParams.viewType = activeView;
      console.log(buildQueryString(allSearchParams));
      router.push(`/gallery/${name}?${buildQueryString(allSearchParams)}`);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = (view: string) => {
    setActiveView(view);

    // const params = updateURLWithMember({ viewType: view, sortType }, isIsdPick);
    // router.push(`/gallery/${name}?${buildQueryString(params)}`);

    // updateURLWithMember({ viewType: view, sortType }, isIsdPick);

    // updateURL({ viewType: view, sortType, member: selected });
    const allSearchParams: { [anyProp: string]: string } = {};

    searchParams.forEach((v, key) => {
      allSearchParams[key] = v;
    });
    allSearchParams.sortType = sortType; // 현재 sortType 상태를 추가
    allSearchParams.viewType = view;
    if (isIsdPick) {
      allSearchParams.member = selected;
    }
    console.log(buildQueryString(allSearchParams));
    router.push(`/gallery/${name}?${buildQueryString(allSearchParams)}`);
  };

  // 삭제된 게시글 보이기
  const handleShowDeleted = () => {
    setIsDeletedVisible((prev) => !prev);
  };

  // value가 isd일 경우, 멤버 선택하기
  const handleMemberClick = (member: string) => {
    setSelected(member);

    // updateURL({ viewType: activeView, sortType, member });
    // updateURLWithMember({ viewType: activeView, sortType, member }, true);
    // const params = updateURLWithMember(
    //   { viewType: activeView, sortType, member },
    //   true
    // );
    // router.push(`/gallery/${name}?${buildQueryString(params)}`);

    const allSearchParams: { [anyProp: string]: string } = {};

    searchParams.forEach((v, key) => {
      allSearchParams[key] = v;
    });
    allSearchParams.sortType = sortType; // 현재 sortType 상태를 추가
    allSearchParams.viewType = activeView;
    if (isIsdPick) {
      allSearchParams.member = member;
    }
    console.log(buildQueryString(allSearchParams));
    router.push(`/gallery/${name}?${buildQueryString(allSearchParams)}`);
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
        topOffset={59}
        hasTotalCounter={!!total}
        isIsdPick={isIsdPick}
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
                isIsdPick={isIsdPick}
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
