'use client';

import React, { useEffect, useRef } from 'react';

interface FlourishChartProps {
  id: string;
}

export default function FlourishChart({ id }: FlourishChartProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;
    document.body.appendChild(script);

    const resizeChart = () => {
      if (chartRef.current) {
        chartRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    resizeChart();
    window.addEventListener('resize', resizeChart);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <div
      className="flourish-embed mt-4 w-full"
      data-src={`visualisation/${id}`}
    ></div>
  );
}
