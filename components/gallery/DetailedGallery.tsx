'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import PageTitle from '@/components/common/PageTitle';
import ShareLinkButton from '@/components/common/ShareLinkButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import DetailedGalleryLayout from '@/components/layout/gallery-layout';
import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { useGalleryArtworks } from '@/service/client/gallery/useGalleryService';

type Props = {
  value: string;
  query: string;
};

export default function DetailedGallery({ value, query }: Props) {
  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const album = gallery.find((item) => item.value === value);
  const member = members.find((item) => item.value === value);

  // 뷰 선택 메뉴
  // TODO: 추후 URL 쿼리스트링으로 받아오는 값에 따라 초기 뷰와 상태 설정
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('alzaltak'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false); // 혐잘딱 보이기 / 가리기
  const {
    fetchNextPage,
    total,
    artworks,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useGalleryArtworks({ query, sortType });

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      if (menuText === sortType) return;
      setSortType(menuText);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = (view: string) => {
    setActiveView(view);
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
  }, [inView]);

  const topTitle = {
    title: album?.subTitle || `${member?.name ?? ''} 팬아트`,
    description: album?.description ?? '',
  };

  const content = () => {
    if (isLoading) {
      return <ViewSkeleton view={activeView} />;
    }

    if (isError) {
      return (
        <Alert
          status="error"
          w="100%"
          borderRadius="1rem"
          justifyContent="center"
        >
          <AlertIcon />
          <AlertTitle>서버 에러</AlertTitle>
          <AlertDescription>
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
            빠른 시일 내에 해결하겠습니다.
          </AlertDescription>
        </Alert>
      );
    }

    if (!artworks || artworks.length === 0) return;

    return (
      <Box
        w="100%"
        overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
      >
        {activeView === 'masonry' && (
          <MasonryView
            nickname={''}
            // artworks={artworks}
            artworks={
              isDeletedVisible && gallery !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
            isDeletedVisible={isDeletedVisible}
            // loadingImage={loadingImage}
            // handleLoading={handleLoading}
            isGallery={true}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView
            artworks={
              isDeletedVisible && gallery !== null
                ? artworks
                : artworks.filter((artwork) => artwork?.is_hyum === false)
            }
            isDeletedVisible={isDeletedVisible}
            // handleLoading={handleLoading}
          />
        )}
        {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
        {isFetchingNextPage ? (
          <Box
            w="100%"
            mt="1.5rem"
            mb="1.5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        ) : (
          // Observer를 위한 div
          <Box ref={ref} w="100%" h="5rem" />
        )}
      </Box>
    );
  };

  return (
    <DetailedGalleryLayout title="팬아트 갤러리">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // m=" 3rem"
        m="1.5rem 1rem"
        mt="1rem"
        p="1rem"
        // background={bg2}
        // borderRadius="1rem"
      >
        {/* {router.query?.subTitle ? (
            <Text  m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'>{router.query.subTitle}</Text>
          ) : (
            album?.subTitle
          )} */}
        {/* {member?.name ? (
          <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
            {member.name} 팬아트
          </Text>
        ) : (
          <Text m="0 auto" as="h1" fontFamily={'ONE-Mobile-POP'}>
            {album?.subTitle}
          </Text>
        )} */}
        <PageTitle topTitle={topTitle} />
        {album?.description && <Text m="0 auto">{album.description}</Text>}
        {
          // member는 팬아트 개수 안 보이게
          album && (
            <Text>
              총 <CountUp end={total ?? 0} />
              개의 팬아트가 있습니다.
            </Text>
          )
        }
        {/* <Text>총 {total}개의 팬아트가 있습니다.</Text> */}
        {/* <Tooltip label="프로필 공유">
            <Button
              w="3rem"
              h="3rem"
              variant="ghost"
              borderRadius="full"
              p="0"
              onClick={handleCopyLink}
            >
              <ImLink />
            </Button>
          </Tooltip> */}
        <ShareLinkButton />
      </Box>
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        topOffset={47}
        isdPick={false}
      />
      {content()}
    </DetailedGalleryLayout>
  );
}

// <Head>
//   <title>{`${
//     album?.subTitle ? album.subTitle : `${member?.name} 팬아트`
//   } - RE:FIND`}</title>
//   <meta
//     property='og:title'
//     content={`팬아트 - Gallery | RE:FIND `}
//     // content={`${profile?.author_nickname}- Profile | RE:FIND `}
//   />
//   <meta
//     property='og:description'
//     content='리파인드 - 왁타버스 이세계아이돌 팬아트 출처 찾기'
//   />
//   <meta property='og:type' content='website' />
//
//   {/* <meta property="og:image" content={profile?.author_prof_url} /> */}
//   <meta property='og:url' content={`https://re-find.xyz/gallery/${value}`} />
// </Head>;
