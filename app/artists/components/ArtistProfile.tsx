'use client';

import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';
import { ImLink } from 'react-icons/im';
import { useShallow } from 'zustand/react/shallow';

import NotFound from '@/app/artists/components/NotFound';
import SubscribeConfirmModal from '@/app/artists/components/SubscribeConfirmModal';
import { useArtistInfo } from '@/app/artists/service/client/useArtistService';
import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import Alert from '@/components/Alert';
import Button, { type CustomVariantProps } from '@/components/Button';
import SortTypeIcons from '@/components/Icons/SortTypeIcons';
import ViewTypeIcons from '@/components/Icons/ViewTypeIcons';
import Popover, { PopoverTrigger } from '@/components/Popover';
import Tooltip from '@/components/Tooltip';
import useModal from '@/hooks/useModal';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

interface Props {
  nickname: string;
}

export default function ArtistProfile({ nickname }: Props) {
  const { rankCriteria, sortRankCriteria } = useArtistSearchInfoStore(
    useShallow((state) => ({
      rankCriteria: state.rankCriteria,
      sortRankCriteria: state.sortRankCriteria,
    }))
  );
  const { data: artistInfo, isError, isLoading } = useArtistInfo(nickname);
  const { show } = useModal(SubscribeConfirmModal);

  const openSubscribeConfirmModal = () => {
    if (!artistInfo) return;
    show({
      nickname,
      isSubscribed: artistInfo.following,
    });
  };

  const member_link = useResponsiveLink(
    (artistInfo?.author_url ?? '').split('/').pop() ?? '',
    'member'
  );
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/artists/${encodeURIComponent(
    //   profile?.author_nickname
    // )}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('링크를 클립보드에 복사했어요.');
    });
  };

  if (isLoading) {
    return <div>아티스트 정보를 가져오고 있습니다...</div>;
  }
  if (!artistInfo || artistInfo.author_nickname === '') {
    return <NotFound nickname={nickname} />;
  }

  const {
    author_url,
    author_nickname,
    author_prof_url,
    best_cnt,
    goldhand_cnt,
    wak_cnt,
    isd_cnt,
    gomem_cnt,
  } = artistInfo;

  if (isError) {
    return <Alert />;
  }

  const total = best_cnt + goldhand_cnt + wak_cnt + isd_cnt + gomem_cnt;
  return (
    <div className="mt-2.5 flex flex-col items-center">
      <Popover openAtFirstTime>
        <PopoverTrigger size="9xl">
          <Image
            src={author_prof_url}
            alt={author_nickname}
            className="my-2 rounded-full object-cover"
            width={130}
            height={130}
            unoptimized
            priority
            referrerPolicy="no-referrer" // 네이버 리소스 서버에서 요청 오리진 검증 우회
          />
        </PopoverTrigger>
      </Popover>
      <div className="my-2 flex items-center justify-center gap-1">
        <div className="size-10" />
        <p className="text-4xl font-bold">{nickname}</p>
        <Tooltip label="프로필 공유">
          <button
            className="flex size-10 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400"
            onClick={handleCopyLink}
          >
            <ImLink />
          </button>
        </Tooltip>
      </div>
      {/* 작품 수, 팔로워, 팔로잉 */}
      <div className="mx-2 mt-4 flex flex-col items-center justify-center gap-4">
        <p className="dark:text-whiteAlpha-900">
          총 작품 수&nbsp;
          {<CountUp end={total ?? 0} className="text-green-highlight" />}개
        </p>
        <SortTypeIcons artist={artistInfo} />
        <ViewTypeIcons
          artist={artistInfo}
          rankCriteria={rankCriteria}
          sortRankCriteria={sortRankCriteria}
        />
      </div>
      {/* 왁물원, 팔로우 버튼 */}
      <div className="my-4 flex w-full items-center justify-center gap-4">
        <Link
          href={member_link}
          target="_blank"
          className="link-to-wakzoo_detail"
        >
          <Button
            intent={`solid-secondary` as CustomVariantProps['intent']}
            additionalClass=" flex rounded-full text-whiteAlpha-900 font-semibold h-[48px] p-4"
          >
            <p className="text-white">왁물원</p>
          </Button>
        </Link>
        {artistInfo && (
          <Button
            size="lg"
            additionalClass="rounded-full max-w-[73px] text-base font-semibold "
            onClick={openSubscribeConfirmModal}
          >
            <p className="">{artistInfo.following ? '구독 중' : '+ 구독'}</p>
          </Button>
        )}
      </div>
    </div>
  );
}
