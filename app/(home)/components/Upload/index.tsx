import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import BeforeUpload from '@/app/(home)/components/Upload/BeforeUpload';
import ImageViewer from '@/app/(home)/components/Upload/ImageViewer';
import { useImageUploadStore } from '@/app/(home)/store/imageUploadStore';

type Props = {
  scrollToTop: () => void;
};
export default function Upload({ scrollToTop }: Props) {
  const { hashs, uploadedfiles, resetFiles } = useImageUploadStore(
    useShallow((state) => ({
      hashs: state.hashs,
      uploadedfiles: state.uploadedfiles,
      resetFiles: state.resetFiles,
    }))
  );

  // 다른 페이지로 이동할 때 초기화 (해당 페이지로 돌아왔을 때 초기화 되어있어야 함)
  useEffect(() => {
    // scrollToTop(); // 스크롤 맨 위로 이동
    resetFiles();
  }, []);

  return (
    <>
      {uploadedfiles && uploadedfiles.length !== 0 && hashs !== null ? (
        <ImageViewer hashs={hashs} scrollToTop={scrollToTop} />
      ) : (
        <BeforeUpload />
      )}
    </>
  );
}
