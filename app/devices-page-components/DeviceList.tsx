"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { DeviceTableHeader } from "./DeviceTableHeader";
import { DeviceTableRow } from "./DeviceTableRow";
import { getDevices, getHomes, getHomeUsers } from "../api/actions";



export const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]); // State for storing devices
  const [searchTerm, setSearchTerm] = useState(""); // Search term for devices
  const [filteredDevices, setFilteredDevices] = useState<any[]>([]); // Filtered devices based on search term
  const [managerId, setManagerId] = useState<string>(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manager_id = localStorage.getItem("authToken"); // Get manager ID from localStorage
        if (!manager_id) {
          console.error("No manager ID found in localStorage");
          return;
        }
  
        setManagerId(manager_id); // Set manager ID in state
  
        // Fetch homes data
        const homes = await getHomes({ manager_id: manager_id ?? '' });
        if (!homes || !homes.homes || homes.homes.length === 0) {
          console.error("No homes found");
          return;
        }
  
        const hub_id = homes.homes[0].hub_id;
        if (!hub_id) {
          console.error("No hub ID found in home data");
          return;
        }
  
        // Fetch devices
        const devicesResponse = await getDevices({ user_id: manager_id, hub_id: hub_id });
        if (!devicesResponse || !devicesResponse.devices) {
          console.warn("Devices response is invalid or empty");
          setDevices([]); // Set devices to an empty array
          return;
        }
  
        console.log("Fetched devices:", devicesResponse);
        setDevices(devicesResponse.devices || []);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setDevices([]); // Fail-safe: Ensure devices is always an array
      }
    };
  
    fetchData(); // Call the async function
  }, []);
  

  // Handle search functionality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value === "") {
      setFilteredDevices(devices);
    } else {
      const filtered = devices.filter((device) =>
        device.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredDevices(filtered);
    }
  };

  return (
    <main className="ml-5 w-[81%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-9 w-full max-md:mt-10 max-md:max-w-full">
        <header className="flex flex-wrap gap-5 justify-between w-full font-semibold max-md:max-w-full">
          <h1 className="my-auto text-2xl text-black">My Devices</h1>
          <div className="flex flex-wrap gap-10 py-3 pr-4 pl-20 text-xl text-black rounded-3xl bg-white bg-opacity-60 max-md:pl-5 max-md:max-w-full">
            <input
              type="text"
              placeholder="Search for devices"
              value={searchTerm}
              onChange={handleSearch}
              className="my-auto bg-transparent outline-none"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/29551108171387b2e4304d35741259b4fe1dcd8754496b1ee06181904b89c2ec?placeholderIfAbsent=true"
              alt="Search"
              className="object-contain shrink-0 aspect-square w-[35px]"
            />
          </div>
        </header>

        <h2 className="self-start mt-11 text-xl font-medium text-black max-md:mt-10">
          All
        </h2>

        <div className="flex flex-col items-start mt-2.5 rounded-xl bg-white bg-opacity-50 max-md:pr-5 max-md:mr-1 max-md:max-w-full">
          <div className="flex shrink-0 w-12 rounded-xl bg-[#9CAD88] h-[9px]" />
        </div>

        <DeviceTableHeader />

        {/* Map over filtered devices */}
        {devices.length > 0 ? (
          devices.map((device) => (
            <DeviceTableRow
              key={device._id}
              name={device.name}
              type={device.type}
              status={device.current_data ? "ON" : "OFF"} 
            />
          ))
        ) : (
          <p className="text-center mt-4">No devices found.</p>
        )}
      </div>
    </main>
  );
};
