'use client';

import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';
import { ImLink } from 'react-icons/im';
import { useShallow } from 'zustand/react/shallow';

import { useArtistInfo } from '@/app/artists/service/client/useArtistService';
import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import {
  useSubscribeArtist,
  useUnsubscribeArtist,
} from '@/app/myLibrary/service/client/useMyService';
import Button, { type CustomVariantProps } from '@/components/Button';
import SortTypeIcons from '@/components/Icons/SortTypeIcons';
import ViewTypeIcons from '@/components/Icons/ViewTypeIcons';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover';
import Tooltip from '@/components/Tooltip';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

interface Props {
  nickname: string;
  profile: AuthorOverview;
}

export default function ArtistProfile({ nickname, profile }: Props) {
  const {
    author_url,
    author_nickname,
    author_prof_url,
    best_cnt,
    goldhand_cnt,
    wak_cnt,
    isd_cnt,
    gomem_cnt,
    following = false, // 추후 따로 빼달라고 하기(?) 아니면 클라에서 처리하기
  } = profile;
  const { rankCriteria, sortRankCriteria } = useArtistSearchInfoStore(
    useShallow((state) => ({
      rankCriteria: state.rankCriteria,
      sortRankCriteria: state.sortRankCriteria,
    }))
  );
  const { data: clientArtistInfo } = useArtistInfo(nickname);
  const { mutate: subscribeArtist } = useSubscribeArtist(nickname);
  const { mutate: unSubscribeArtist } = useUnsubscribeArtist(nickname);
  const handleSubscribe = () => {
    if (following) {
      unSubscribeArtist();
      return;
    }
    subscribeArtist();
  };

  const member_link = useResponsiveLink(
    author_url.split('/').pop() ?? '',
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
        <PopoverContent position="bottom-center">
          <PopoverBody>
            <p className="my-2 text-center text-lg font-bold">
              작가님들의 2024 활동 돌아보기
              {/* 좋아요, 댓글 부탁드려요! */}
            </p>
            <p className="text-center text-base font-light">
              아래 2024 리캡 버튼을 눌러서 확인해보세요!
            </p>
          </PopoverBody>
        </PopoverContent>
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
        <SortTypeIcons artist={profile} />
        <ViewTypeIcons
          artist={profile}
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
        <Link
          href={`/artists/${nickname}/recap2024`}
          className="link-to-wakzoo_detail"
        >
          <Button
            intent={`solid-purple` as CustomVariantProps['intent']}
            additionalClass="rounded-full text-whiteAlpha-900 font-semibold dark:text-blackAlpha-900   text-base h-[48px] p-4"
          >
            <p className="">2024 리캡</p>
          </Button>
        </Link>
        {clientArtistInfo && (
          <Button
            size="lg"
            additionalClass="rounded-full max-w-[73px] text-base font-semibold "
            onClick={handleSubscribe}
          >
            <p className="">
              {clientArtistInfo.following ? '구독 중' : '+ 구독'}
            </p>
          </Button>
        )}
      </div>
    </div>
  );
}
