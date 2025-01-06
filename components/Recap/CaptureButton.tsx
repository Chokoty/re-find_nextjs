'use client';

import html2canvas from 'html2canvas';
import { MdOutlineSaveAlt } from 'react-icons/md';

import Button from '@/components/Button';

export function CaptureButton({
  sectionId,
  fileName,
}: {
  sectionId: string;
  fileName: string;
}) {
  const captureSection = async () => {
    const section = document.getElementById(sectionId);
    const button = document.querySelector(`#${sectionId} .capture-button`);
    if (section) {
      // 캡처 버튼 숨기기
      if (button) {
        (button as HTMLElement).style.display = 'none';
      }

      // 캡처 실행
      const canvas = await html2canvas(section, {
        backgroundColor: null,
        useCORS: true,
      });

      // 캡처 버튼 다시 보이게
      if (button) {
        (button as HTMLElement).style.display = 'block';
      }
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <Button
      size="lg"
      additionalClass="rounded-full  text-base font-semibold flex items-center justify-center gap-2"
      onClick={captureSection}
    >
      <MdOutlineSaveAlt className="inline-block size-8" />
      <p className="inline-block text-lg font-semibold ">저장하기</p>
    </Button>
  );
}
