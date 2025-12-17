import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  // Sample monthly energy usage data
  const monthlyEnergyData = [
    { month: 'Jan', usage: 120 },
    { month: 'Feb', usage: 150 },
    { month: 'Mar', usage: 180 },
    { month: 'Apr', usage: 160 },
    { month: 'May', usage: 140 },
    { month: 'Jun', usage: 170 },
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: monthlyEnergyData.map((item) => item.month) }]}
      series={[{ data: monthlyEnergyData.map((item) => item.usage), label: 'Monthly Energy (kWh)' }]}
      width={500}
      height={300}
    />
  );
}