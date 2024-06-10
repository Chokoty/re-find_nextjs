import type { RefObject } from 'react';
import { useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

// 데스크탑과 모바일 기기 모두에서 element 외부 클릭 이벤트를 감지합니다.
// 이벤트가 발생하면 element 외부에서 발생한 것인지 확인하고, 외부에서 발생한 경우 핸들러를 호출합니다.
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    // handle click outside
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      // ref element 외부일 경우
      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
