import { Box } from '@chakra-ui/react';

import Artwork from '@/components/gallery/Artwork';
import RecommendArtworks from '@/components/gallery/RecommendArtworks';
import { getArtworkDetail } from '@/service/server/gallery';

import { Modal } from './modal';

type Params = { params: { id: string } };

// 기존 모달 시스템과 달리 page용 모달을 return해줘야하므로 따로 작성
export default async function ArtworkModal({ params: { id } }: Params) {
  const artwork = await getArtworkDetail(parseInt(id));
  return (
    <Modal>
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDir="column"
        px="20px"
        py="50px"
      >
        {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
        <Box
          w="100%"
          minH="40vh"
          display="flex"
          flexDir={['column', 'column', 'row']}
          gap="1rem"
          justifyContent="center"
          alignItems={['center', 'center', 'flex-start']}
          padding={['1rem', '0']}
        >
          <Artwork data={artwork} />
        </Box>
        {/* 하단(유사이미지 추천) */}
        <RecommendArtworks />
      </Box>
    </Modal>
  );
}
