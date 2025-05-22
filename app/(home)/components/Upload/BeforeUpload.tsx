// import UpdateBoard from '@/app/(home)/components/Upload/UpdateBoard';
import UploadImages from '@/app/(home)/components/Upload/UploadImages';

// const UploadImages = dynamic(() => import('@/components/common/UploadImages'), {
//   ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
//   loading: () => <UploadImageSkeleton />,
// });

export default function BeforeUpload() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* 이미지 업로드 */}
      <UploadImages />
      {/* 게시판 업데이트 현황 */}
      {/* <UpdateBoard /> */}
    </div>
  );
}
