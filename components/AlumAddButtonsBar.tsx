import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import Button from '@/components/Button';
import AddCheckedFanartsToCustomAlbumModal from '@/components/Modal/AddCheckedFanartsToCustomAlbumModal';
import AddFanartToAlbumFinderModal from '@/components/Modal/AddFanartToAlbumFinderModal';
import useModal from '@/hooks/useModal';

type Props = {
  isMyCustomAlbum: boolean;
  user: any;
  isCheckable: boolean;
  setIsCheckable: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AlbumAddButtonsBar({
  isMyCustomAlbum,
  user,
  isCheckable,
  setIsCheckable,
}: Props) {
  // 체크된 팬아트 상태는 store에서 관리 (여기서 직접 접근)
  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );

  // 모달 오픈 함수들
  const { show: showAddFanartToAlbumFinderModal } = useModal(
    AddFanartToAlbumFinderModal
  );
  const { show: showAddFanartsToCustomAlbumModal } = useModal(
    AddCheckedFanartsToCustomAlbumModal
  );

  // 핸들러들
  const handleOpenAddFanartToAlbumFinderModal = () => {
    showAddFanartToAlbumFinderModal({ applyCustomMaxWidth: true });
  };

  const handleToggleCheckable = () => {
    setIsCheckable((prev) => !prev);
    // 체크 모드 종료 시 선택 해제
    if (isCheckable) setFanarts([]);
  };

  const handleShowAddFanartsModal = () => {
    showAddFanartsToCustomAlbumModal({ fanarts, animateDir: 'bottom' });
  };

  const handleClearFanarts = () => {
    setFanarts([]);
  };

  return (
    <>
      {isMyCustomAlbum && (
        <div className="w-full px-8 py-2">
          <Button onClick={handleOpenAddFanartToAlbumFinderModal}>
            앨범에 팬아트 추가하기
          </Button>
        </div>
      )}
      {!!user && (
        <div className="flex w-full justify-between px-8 py-2">
          <Button onClick={handleToggleCheckable}>
            앨범 선택 모드 {isCheckable ? '끄기' : '켜기'}
          </Button>
          <div className="flex gap-2">
            {isCheckable && fanarts.length > 0 && (
              <Button onClick={handleClearFanarts}>전체 선택 해제</Button>
            )}
            {fanarts.length > 0 && (
              <Button onClick={handleShowAddFanartsModal}>
                선택한 앨범 저장({fanarts.length})
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
