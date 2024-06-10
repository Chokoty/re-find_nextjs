import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RE:FIND 왁타버스 팬아트 집합소',
    short_name: 'RE:FIND (리파인드)',
    description:
      '왁물원과 연동된 왁타버스 팬아트를 한 곳에서 확인할 수 있는 집합소입니다.',
    start_url: '/',
    scope: '/',
    display: 'fullscreen',
    theme_color: '#000000',
    background_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png',
        type: 'image/png',
        sizes: '640x1136',
      },
      {
        src: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png',
        type: 'image/png',
        sizes: '1136x640',
      },
    ],
  };
}
