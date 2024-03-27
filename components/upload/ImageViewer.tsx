import { Box, Button } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import Loading from '@/components/common/Loading';
import Preview from '@/components/common/Preview';
import ImageSearchResult from '@/components/upload/ImageSearchResult';
import { TARGET_COUNT } from '@/lib/const';
import queryOptions from '@/service/client/home/queries';
import { useImageInfo } from '@/service/client/home/useHomeService';
import { useImageUploadStore } from '@/store/imageUploadStore';

type Prop = {
  hashs: string[];
};

export default function ImageViewer({ hashs }: Prop) {
  const { data, isLoading } = useImageInfo({ hash: hashs[0] });
  const { resetFiles, setCongrat } = useImageUploadStore(
    useShallow((state) => ({
      resetFiles: state.resetFiles,
      setCongrat: state.setIsEventActive,
    }))
  );
  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.counts();

  useEffect(() => {
    if (!data) return;
    // 검색 결과가 있을 때만 count refetch
    queryClient.invalidateQueries({ queryKey });
    // react-query 특성상 stale time이 지나면 다시 toast(60초)
    const { source, elapsedTime } = data;
    if (source.ids?.length === 0) {
      toast.error(`검색 결과가 없습니다. 
      다른 이미지를 검색해보세요.`);
    } else if (source.ids[0]?.is_deleted) {
      toast.error('삭제된 게시글입니다.');
    } else {
      toast.success(`검색 성공 (${elapsedTime / 1000}s)`);
    }

    // 6만 기념 이벤트
    if (source.total_counter === TARGET_COUNT.toString()) {
      setCongrat(true); // targetCount 번째 검색 시 축하메시지
    }
  }, [data]);

  const getResult = () => {
    if (!data) {
      return (
        <Button
          onClick={resetFiles}
          size="lg"
          colorScheme="blue"
          mt="20px"
          w={200}
        >
          다른 이미지 검색
        </Button>
      );
    }
    return (
      <ImageSearchResult searchTime={data.elapsedTime} data={data.source} />
    );
  };

  return (
    <Box
      className="result-area"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="1rem"
      w={['90%', '90%', '100%']}
      m="1rem 0 10rem 0"
    >
      <Preview data={data} isLoading={isLoading} />
      {isLoading ? <Loading /> : getResult()}
    </Box>
  );
}
