'use client';

import TabBarComponent from '@/components/TabBar/TabBarComponent';
import useTabBar from '@/components/TabBar/useTabBar';
import { useResponsive } from '@/hook/useResponsive';

export default function TabBar() {
  const { tab, setTab } = useTabBar();
  const isMobile = useResponsive(); // 모바일 환경인지 체크
  if (!isMobile) return null;
  return <TabBarComponent tab={tab} setTab={setTab} />;
}
