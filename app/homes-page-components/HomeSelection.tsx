"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "./BackButton";
import { HomeCard } from "./HomeCard";
import { getHomes } from "../api/actions";

const HomeSelection: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState<any>(null);
  const [homes, setHomes] = useState<any[]>([]); // State to hold the list of homes

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const manager_id = localStorage.getItem("authToken");
        if (!manager_id) {
          console.error("No manager ID found in localStorage");
          return;
        }

        // Fetch homes dynamically from the API
        const homesData = await getHomes({ manager_id });
        console.log(homesData, 'pppppppp')
        if (homesData && homesData.homes) {
          setHomes(homesData.homes);
          setSelectedHome(homesData.homes[0]); // Set the first home as the default selected one
        }
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchHomes();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,800&display=swap"
        rel="stylesheet"
      />
      <main className="relative h-screen bg-amber-50 p-[5%] overflow-hidden">
        <BackButton imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/ba1c679bc4893fa5d27e1c2276cde3abfbf2d424" />
        <section className="flex flex-col items-center justify-center w-full h-[85vh] max-md:h-[95vh] bg-[#9CAD88] py-16 px-8">
          <header className="mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6daff7273a7a6570ce15f7b54d4b9205df11006b"
              alt="Logo"
              className="w-[80px]"
            />
          </header>
          <h1 className="mb-11 text-5xl italic font-extrabold text-amber-50 max-sm:text-4xl max-sm:text-center">
            Select Home
          </h1>
          
          <div className="flex flex-col items-center gap-8">
            {/* HomeCard and Dropdown side by side */}
            <div className="flex gap-8 items-center justify-center max-md:flex-col">
              {selectedHome && (
                <HomeCard
                  name={selectedHome.name}
                  address={selectedHome.address}
                  // imageUrl={selectedHome.image}
                />
              )}
              
              {/* Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-4 px-6 py-3 bg-amber-50 rounded-xl text-stone-600 hover:bg-amber-100 transition-colors"
                >
                  <span className="font-medium">{selectedHome?.name || "Select Home"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-amber-50 rounded-xl shadow-lg overflow-hidden z-10">
                    {homes.map((home) => (
                      <button
                        key={home._id}
                        onClick={() => {
                          setSelectedHome(home);
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-6 py-3 text-stone-600 hover:bg-amber-100 transition-colors"
                      >
                        {home.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enter button below */}
            <button
              onClick={() => router.push('/dashboard-components')}
              className="px-8 py-3 bg-amber-50 rounded-xl text-stone-600 font-medium hover:bg-amber-100 transition-colors transform hover:scale-105"
            >
              Enter
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeSelection;
