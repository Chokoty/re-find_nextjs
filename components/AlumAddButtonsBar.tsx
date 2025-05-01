import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import Button from '@/components/Button';
import AddFanartToAlbumFinderModal from '@/components/Modal/AddFanartToAlbumFinderModal';
import useModal from '@/hooks/useModal';

type Props = {
  isMyCustomAlbum: boolean;
  user: any;
};

export default function AlbumAddButtonsBar({ isMyCustomAlbum, user }: Props) {
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

  // 핸들러들
  const handleOpenAddFanartToAlbumFinderModal = () => {
    showAddFanartToAlbumFinderModal({ applyCustomMaxWidth: true });
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
    </>
  );
}
