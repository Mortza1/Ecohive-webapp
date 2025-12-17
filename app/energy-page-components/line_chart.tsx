// MonthlyEnergyChart.js
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export function MonthlyEnergyChart() {
  return (
    <div>
      <h3 style={{ color: 'black' }}>Monthly Energy Usage (kWh)</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]} // Numerical x-axis
        series={[{ data: [120, 150, 180, 160, 140, 170] }]}
        width={500}
        height={300}
      />
    </div>
  );
}

export function DwellerAMonthlyChart() {
  return (
    <div>
      <h3 style={{ color: 'black' }}>Dweller A Monthly Usage (kWh)</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]} // Numerical x-axis
        series={[{ data: [100, 100, 100, 100, 100, 100] }]}
        width={500}
        height={300}
      />
    </div>
  );
}

export function DwellerAWeeklyChart() {
  return (
    <div>
      <h3 style={{ color: 'black' }}>Dweller A Weekly Usage (kWh)</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]} // Numerical x-axis
        series={[{ data: [25, 27, 23, 28, 26, 30] }]}
        width={500}
        height={300}
      />
    </div>
  );
}

export function DwellerBMonthlyChart() {
  return (
    <div>
      <h3 style={{ color: 'black' }}>Dweller B Monthly Usage (kWh)</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]} // Numerical x-axis
        series={[{ data: [80, 80, 80, 80, 80, 80] }]}
        width={500}
        height={300}
      />
    </div>
  );
}


export function DwellerBWeeklyChart() {
  return (
    <div>
      <h3 style={{ color: 'black' }}>Dweller B Weekly Usage (kWh)</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]} // Numerical x-axis
        series={[{ data: [20, 22, 18, 21, 19, 23] }]}
        width={500}
        height={300}
      />
    </div>
  );
}