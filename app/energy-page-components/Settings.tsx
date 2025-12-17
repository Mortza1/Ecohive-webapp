// Settings.js
"use client";
import * as React from "react";
import { Sidebar } from "../Sidebar";
import { MyScatterChart } from "./scatter";
import { MyPieChart } from "./pie";
import { DwellerAMonthlyChart, DwellerAWeeklyChart, DwellerBMonthlyChart, DwellerBWeeklyChart, MonthlyEnergyChart } from "./line_chart";
import BasicBars from "./bar_chart";

export default function Settings() {
  // Sample data for various charts and metrics
  const lineData = [2, 5.5, 2, 8.5, 1.5, 5];
  const xAxisData = [1, 2, 3, 5, 8, 10];
  const pieData = [
    { id: 0, value: 10, label: 'Lighting' },
    { id: 1, value: 15, label: 'HVAC' },
    { id: 2, value: 20, label: 'Appliances' },
  ];
  const scatterData = [
    { id: 0, x1: 1, y1: 5, y2: 10 },
    { id: 1, x1: 2, y1: 8, y2: 12 },
    { id: 2, x1: 3, y1: 6, y2: 9 },
    { id: 3, x1: 4, y1: 9, y2: 11 },
    { id: 5, x1: 5, y1: 7, y2: 13 },
  ];

  const scatterDataA = scatterData.map((v) => ({ x: v.x1, y: v.y1, id: v.id }));
  const scatterDataB = scatterData.map((v) => ({ x: v.x1, y: v.y2, id: v.id }));

  // Sample data for IoT application metrics
  const deviceData = {
    totalDevices: 50,
    activeDevices: 42,
    deviceTypes: {
      lights: 15,
      thermostats: 10,
      appliances: 25,
    },
  };

  const energyUsage = {
    monthly: [120, 150, 180, 160, 140, 170], // kWh
    weekly: [30, 35, 40, 38, 32, 39], // kWh
    total: 1500, // kWh
  };

  const dwellerUsage = {
    dwellerA: { monthly: 100, weekly: 25, total: 800, savings: 50 }, // kWh
    dwellerB: { monthly: 80, weekly: 20, total: 700, savings: 30 }, // kWh
  };

  

  return (
    <div className="h-screen overflow-hidden px-12 pt-6 pb-4 rounded-xl bg-[#EEECDE]">
      <div className="flex gap-3 h-full">
        <div className="w-[18%]">
          <Sidebar />
        </div>
        <main className="w-[82%] flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-white">
                <MyPieChart pieData={pieData} title="Energy Consumption by Category"/>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <MyScatterChart scatterDataA={scatterDataA} scatterDataB={scatterDataB} title="Device Performance"/>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <BasicBars/>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <MonthlyEnergyChart />
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <DwellerAMonthlyChart />
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <DwellerAWeeklyChart />
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <DwellerBMonthlyChart />
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <DwellerBWeeklyChart />
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}