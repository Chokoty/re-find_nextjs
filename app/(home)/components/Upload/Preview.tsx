import clsx from 'clsx';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import { useImageUploadStore } from '@/app/(home)/store/imageUploadStore';

type Props = {
  data: any;
  isLoading: boolean;
};

export default function Preview({ data, isLoading }: Props) {
  const { files } = useImageUploadStore(
    useShallow((state) => ({
      files: state.uploadedfiles,
    }))
  );

  const isImageLoading =
    (files && isLoading) || (files && data?.ids?.length === 0);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {files ? (
        <Image
          alt={files[0].name}
          width={500}
          height={500}
          className={clsx('flex h-full shadow-cardBox', {
            'rounded-2xl': isImageLoading,
            'rounded-t-2xl': !isImageLoading,
          })}
          src={files[0].preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(files[0].preview);
          }}
          unoptimized
        />
      ) : null}
    </div>
  );
}
