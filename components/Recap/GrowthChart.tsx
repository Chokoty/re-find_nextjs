'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

// Define the data structure
interface DataPoint {
  name: string;
  value1: number;
  value2: number;
}

// Define props for the DynamicBarChart
interface DynamicBarChartProps {
  data: DataPoint[];
}

// Dynamic import to disable SSR for BarChart
const DynamicBarChart = dynamic<DynamicBarChartProps>(
  () =>
    Promise.resolve(({ data }) => (
      <BarChart
        layout="vertical"
        width={600}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={60}
        barGap={20}
      >
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" hide />
        <Bar dataKey="value1" fill="#8884d8" animationDuration={2000}>
          <LabelList dataKey="value1" content={CustomLabel} />
        </Bar>
        <Bar dataKey="value2" fill="#82ca9d" animationDuration={2000}>
          <LabelList dataKey="value2" content={CustomLabel} />
        </Bar>
      </BarChart>
    )),
  { ssr: false }
);

export default function GrowthChart({
  growth,
  data,
}: {
  growth: number;
  data: { value1: number; value2: number };
}) {
  useEffect(() => {
    // setIsClient(true);
  }, []);

  const chartData = [
    {
      name: 'Category A',
      value1: data.value1,
      value2: data.value2,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center lg:mb-10 lg:mt-20 lg:flex-row">
      <div className="flex w-full  items-center gap-4">
        <div className="flex flex-col gap-4">
          <span className="font-sbAggro text-2xl font-bold lg:text-6xl">
            2024
          </span>
          <span className="font-sbAggro text-2xl font-bold lg:text-6xl">
            2023
          </span>
        </div>
        {/* Use DynamicBarChart with data prop */}
        <DynamicBarChart data={chartData} />
      </div>
      {growth > 0 && (
        <div className="font-sbAggro font-bold">
          <p className="text-4xl lg:text-8xl">
            +{growth}
            <span>%</span>
          </p>
        </div>
      )}
    </div>
  );
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + 10}
      y={y + height / 2}
      dy={4}
      textAnchor="start"
      fill="#fff"
      className="text-xl"
    >
      {value}개
    </text>
  );
};
