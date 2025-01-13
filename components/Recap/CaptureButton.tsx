'use client';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { MdOutlineSaveAlt } from 'react-icons/md';

import Button from '@/components/Button';

export function CaptureButton({
  sectionId,
  fileName,
}: {
  sectionId: string;
  fileName: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const captureSection = async () => {
    const section = document.getElementById(sectionId);
    const button = document.querySelector(`#${sectionId} .capture-button`);
    if (section) {
      // 캡처 버튼 숨기기
      if (button) {
        (button as HTMLElement).style.display = 'none';
      }
      setIsLoading(true);
      const { fonts } = document;
      // 캡처 실행
      const canvas = await html2canvas(section, {
        backgroundColor: null,
        useCORS: true, // CORS사용한 서버로부터 이미지를 로드할 것인지
        // proxy: '', // proxy를 통해 받아온 url을 원본 이미지 로드하는데 사용.
        onclone: (document) => {
          fonts.forEach((font) => {
            document.fonts.add(font);
          });
        },
      });

      // 캡처 버튼 다시 보이게
      if (button) {
        (button as HTMLElement).style.display = 'block';
      }
      canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, fileName);
        }
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      additionalClass=" hidden rounded-xl  text-base font-semibold md:flex items-center justify-center gap-2 "
      onClick={captureSection}
    >
      <MdOutlineSaveAlt className="inline-block size-6 lg:size-8 " />
      <p className="inline-block font-semibold lg:text-lg ">
        {isLoading ? '처리중...' : '사진저장'}
      </p>
    </Button>
  );
}
