// MyScatterChart.js
"use client";
import * as React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

export function MyScatterChart({ scatterDataA, scatterDataB } : any) {
  return (
    <ScatterChart
      width={400}
      height={250}
      series={[
        {
          label: 'Series A',
          data: scatterDataA,
        },
        {
          label: 'Series B',
          data: scatterDataB,
        },
      ]}
    />
  );
}