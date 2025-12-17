// MyPieChart.js
"use client";
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function MyPieChart({ pieData } : any) {
  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={400}
      height={250}
    />
  );
}