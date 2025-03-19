"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { users } from "../data/users";

// Assuming first user is the logged in user
const currentUser = users[0];

const data = [
  { name: "Lights", value: 30, color: "#99f6e4" },   // teal-200
  { name: "Cooling", value: 45, color: "#fdba74" },  // orange-300
  { name: "Appliances", value: 35, color: "#818cf8" }, // indigo-400
  { name: "Security", value: 25, color: "#86efac" },  // green-300
];

interface ProfileSectionProps {
  managerData: {
    name: string;
    image: string;
    role: string;
    energySaved: string;
  };
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ managerData }) => {
  console.log("Manager data:", managerData);
  return (
    <section className="flex flex-col grow items-center px-6 pt-8 pb-4 w-full bg-[#FFFDEE] rounded-[50px]">
      <img
        src={currentUser.image}
        className="object-contain rounded-full aspect-[1.1] w-[65px]"
        alt={`${currentUser.name}'s profile picture`}
      />
      <h2 className="mt-4 text-lg font-semibold text-black">
        Welcome {managerData.name.split(' ')[0]}!
      </h2>

      <div className="flex flex-col self-stretch px-3 py-5 mt-5 bg-[#EEECDE] rounded-[53px]">
        <div className="flex justify-between items-center ml-3 mr-3">
          <h3 className="text-lg font-semibold text-stone-600">
            Energy this week
          </h3>
          <span className="text-sm font-medium text-stone-600">
            Role: {currentUser.role}
          </span>
        </div>

        <div className="flex overflow-hidden flex-col px-8 pt-6 mt-1 w-full bg-[#EEECDE] bg-opacity-70">
          <div className="flex gap-2 items-start text-[10px] font-bold text-black whitespace-nowrap">
            {data.map((item) => (
              <div key={item.name} className="flex gap-1">
                <div 
                  className="flex shrink-0 rounded-md h-[12px] w-[12px]" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="flex self-center mt-8 max-w-full w-[200px]">
            <div className="relative">
              <PieChart width={160} height={160}>
                <Pie
                  data={data}
                  cx={80}
                  cy={80}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="flex z-10 gap-2 font-semibold leading-snug text-zinc-600">
              <div className="flex flex-col items-center self-start mt-2">
                <p className="self-stretch text-xs">
                  Total usages{" "}
                  <span className="font-extrabold">This Week</span>
                </p>
                <p className="text-lg">136.99 kWh</p>
                <p className="mt-2 text-xs text-green-500">
                  Saved {currentUser.energySaved}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};