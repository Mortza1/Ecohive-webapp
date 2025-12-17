"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { DeviceOverview } from "./DeviceOverview";
import { ProfileSection } from "./ProfileSection";
import { RunningDevicesWidget } from "./RunningDevicesWidget";
import { getDevices, getHomes, getHomeUsers, getUser } from "../api/actions";

export const MainDashboard: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string>("DASHBOARD");
  const [dwellers, setDwellers] = useState<any[]>([]);
  const [managerData, setManagerData] = useState<any>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [houseId, setHouseId] = useState<string>("");
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manager_id = localStorage.getItem("authToken");
        if (!manager_id) {
          console.error("No manager ID found in localStorage");
          return;
        }

        // Fetch homes
        const homes = await getHomes({ manager_id });
        if (homes) {
          setHouseId(homes["homes"][0]["_id"]);
          const data = await getUser({ user_id: manager_id, home_id: homes["homes"][0]["_id"] });
          setManagerData(data['user']);
          setHomeData(homes["homes"][0]);
          console.log(homeData, 'aaaaaa')
          const hub_id = homes["homes"][0]["hub_id"];

          const users = homes["homes"][0]["dwellers"] || [];
          const user_ids = users.map((home: any) => home.user_id);

          // Fetch users
          if (user_ids.length > 0) {
            const userResponse = await getHomeUsers({ user_ids });
            setDwellers(userResponse["users"]);

            
          }

          // Fetch devices
          const devicesResponse = await getDevices({ user_id: manager_id, hub_id });
          setDevices(devicesResponse.devices || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="h-screen overflow-hidden px-12 pt-6 pb-4 rounded-xl bg-[#EEECDE]">
      <div className="flex gap-3 h-full">
        <aside className="w-[18%]">
          <Sidebar />
        </aside>

        <div className="w-[82%]">
          <div className="h-full">
            <div className="ml-4">
              <div className="flex gap-3 mb-3">
                <div className="w-[55%]">
                  <DeviceOverview home={homeData} dwellers={dwellers} devices={devices}/>
                </div>
                <div className="w-[45%]">
                  {managerData ? (
                    <ProfileSection managerData={managerData} />
                  ) : (
                    <p>Loading profile...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex gap-3">
                <div className="w-[41%]">
                  <RunningDevicesWidget />
                </div>
                <div className="w-[59%]">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainDashboard;
