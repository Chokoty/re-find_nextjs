import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { MdLock, MdPublic, MdShare } from 'react-icons/md';

import queryOptions from '@/app/album/service/client/queries';
import { useEditCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

type Props = {
  albumName: string;
  owned?: boolean;
  isAlbumPublic?: boolean;
};

export default function ShareLinkButton({
  albumName,
  owned = false,
  isAlbumPublic,
}: Props) {
  const { queryKey } = queryOptions.galleryPageInfo(albumName);
  const queryClient = useQueryClient();

  const refreshAlbumInfo = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutate: editCustomAlbumInfo, isPending } = useEditCustomAlbum({
    albumId: albumName,
    info: {
      is_public: !isAlbumPublic, // 현재 상태의 반대로 토글
    },
    handleOnSuccess: () => {
      refreshAlbumInfo();
      const message = !isAlbumPublic
        ? '갤러리가 공개되었습니다.'
        : '갤러리가 비공개되었습니다.';
      toast.success(message);
    },
  });

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('링크를 클립보드에 복사했어요.');
    });
  };

  const handleTogglePrivacy = () => {
    editCustomAlbumInfo();
  };

  const isActuallyPublic =
    isAlbumPublic === undefined || isAlbumPublic === true;

  console.log(isActuallyPublic, isAlbumPublic);

  return (
    <div className="flex items-center gap-2">
      {/* 공개/비공개 토글 버튼 */}
      {owned && (
        <Tooltip
          // hasArrow
          label={isAlbumPublic ? '공개 상태입니다.' : '비공개 상태입니다.'}
          // bg="gray-150"
          // color="black"
        >
          <Button
            additionalClass="rounded-full transition-colors"
            intent={isAlbumPublic ? 'solid-blue' : 'solid-gray'}
            onClick={handleTogglePrivacy}
            disabled={isPending}
          >
            {isAlbumPublic ? (
              <MdPublic className="text-white dark:text-black-200" />
            ) : (
              <MdLock className="text-white dark:text-black-200" />
            )}
          </Button>
        </Tooltip>
      )}
      {/* 공유하기 버튼 */}
      <Button
        additionalClass={`rounded-full transition-colors ${
          isActuallyPublic
            ? 'bg-green-highlight dark:hover:bg-pink-400 dark:active:bg-pink-500 dark:bg-pink-highlight hover:bg-teal-500 active:bg-teal-600'
            : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 active:bg-gray-600 cursor-not-allowed dark:hover:bg-gray-400 dark:active:bg-gray-500'
        }`}
        onClick={isActuallyPublic ? handleCopyLink : undefined}
        disabled={!isActuallyPublic}
      >
        <MdShare
          className={`mr-2 ${isActuallyPublic ? 'text-white' : 'text-gray-300'}`}
        />
        <p className={isActuallyPublic ? 'text-white' : 'text-gray-300'}>
          <span className="hidden 2xs:inline-block">갤러리</span> 공유하기
        </p>
      </Button>
    </div>
  );
}
