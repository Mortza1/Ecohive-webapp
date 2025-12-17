"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";

import { UserCard } from "./UserCard";
import { AddUserButton } from "./AddUserButton";
import { User } from "../types/user";
import { getHomes, getHomeUsers } from "../api/actions";

export default function Dwellers() {
  const [dwellers, setDwellers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [managerId, setManagerId] = useState<string>(''); 
  const [houseId, setHouseId] = useState<string>(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manager_id = localStorage.getItem("authToken"); // Get manager ID from localStorage
        if (!manager_id) {
          console.error("No manager ID found in localStorage");
          return;
        }
        setManagerId(manager_id);
        // Fetch homes data
        const homes = await getHomes({ manager_id: manager_id ?? '' });
        if (homes) {
          setHouseId(homes['homes'][0]['_id']);
          const hub_id = homes['homes'][0]['hub_id']; 
          // Extract user IDs from homes
          const users = homes['homes'][0]['dwellers'] || []; // Ensure `homes` is an array
          console.log("Users:", users);

          const user_ids = users.map((home: any) => home.user_id);
          console.log("User IDs:", user_ids); // Log the user IDs

          // Ensure `getHomeUsers` is called with the correct data
          if (user_ids.length > 0) {
            const users = await getHomeUsers({ 'user_ids': user_ids });
            console.log("Fetched users:", users);
            setDwellers(users['users']);
            console.log("Dwellers:", users['users']);
          } else {
            console.warn("No user IDs found");
            setDwellers([]); // No users found, set an empty array
          }
        }
      } catch (error) {
        console.error("Error fetching homes:", error);
        setDwellers([]); // In case of error, also set an empty array
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const homeManagers = dwellers.filter(user => user.role === "Home Manager");
  const residents = dwellers.filter(user => user.role !== "Home Manager");

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-screen overflow-hidden px-12 pt-6 pb-4 rounded-xl bg-[#EEECDE]">
      <div className="flex gap-3 h-full">
        <aside className="w-[18%]">
          <Sidebar />
        </aside>

        <section className="w-[82%] flex flex-col h-full">
          <div className="flex justify-between w-full mb-6 mt-4">
            <h1 className="text-2xl font-semibold text-black">Users</h1>
          </div>

          {/* Bottom Section - Residents */}
          <section className="flex-1 mt-6">
            <h2 className="text-xl font-bold text-stone-600 mb-4">
              Residents
            </h2>
            {/* Check if there are no residents */}
            {residents.length === 0 ? (
              <p>No residents found.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4 w-full">
                {residents.map(user => (
                  <UserCard key={user._id} {...user} />
                ))}
              </div>
            )}
          </section>

          <div className="flex justify-end mt-auto pb-4">
            <AddUserButton manager_id={managerId} house_id={houseId} />
          </div>
        </section>
      </div>
    </main>
  );
}
