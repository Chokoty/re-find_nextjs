'use client';

import React from 'react';

import TabBarComponent from '@/components/TabBar/TabBarComponent';
import useTabBar from '@/components/TabBar/useTabBar';

export const TabBar = () => {
  const { tab, setTab } = useTabBar();

  return <TabBarComponent tab={tab} setTab={setTab} />;
};
