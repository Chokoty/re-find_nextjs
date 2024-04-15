import { Box } from '@chakra-ui/react';

import UpdateBoard from './UpdateBoard';
import UploadImages from './UploadImages';

// const UploadImages = dynamic(() => import('@/components/common/UploadImages'), {
//   ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
//   loading: () => <UploadImageSkeleton />,
// });

export default function BeforeUpload() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      {/* 이미지 업로드 */}
      <UploadImages />
      {/* 게시판 업데이트 현황 */}
      <UpdateBoard />
    </Box>
  );
}
