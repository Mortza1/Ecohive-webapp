"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homes } from "./data/homes";

export const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(homes[0]);
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Update path matching logic
    const pathMap: { [key: string]: string } = {
      'dashboard': 'dashboard-components',
      'devices': 'devices-page-components',
      'user': 'dwellers-page-components',
      'energy': 'energy-page-components',
      'notifications': 'notification-page-components',
      'settings': 'settings-page-components'
    };
    
    const mappedPath = pathMap[path] || path;
    const active = pathname.includes(mappedPath);
    return active ? "bg-stone-200 text-black" : "hover:bg-[#8b9b78] text-gray-100";
  };

  const getIconClass = (path: string) => {
    const pathMap: { [key: string]: string } = {
      'dashboard': 'dashboard-components',
      'devices': 'devices-page-components',
      'user': 'dwellers-page-components',
      'energy': 'energy-page-components',
      'notifications': 'notification-page-components',
      'settings': 'settings-page-components'
    };
    
    const mappedPath = pathMap[path] || path;
    const active = pathname.includes(mappedPath);
    return `w-6 ${active ? 'brightness-0 sepia hue-rotate-70 saturate-500' : 'brightness-0 invert'}`;
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="hidden max-md:flex max-md:flex-col max-md:justify-center max-md:gap-1.5 fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#9CAD88] hover:bg-[#8b9b78] w-10 h-10"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="w-6 h-0.5 bg-white rounded-full transition-all"></div>
        <div className="w-6 h-0.5 bg-white rounded-full transition-all"></div>
        <div className="w-6 h-0.5 bg-white rounded-full transition-all"></div>
      </button>


      {/* Sidebar */}
      <nav className={`
        flex flex-col py-14 px-5 w-[250px] h-full text-xl font-bold bg-[#9CAD88]
        fixed top-0 left-0 transition-transform duration-300 ease-in-out
        max-md:w-64 max-md:h-screen max-md:rounded-none max-md:z-40
        ${isMobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
      `}>
        <Link href="/dashboard-components" className="mb-16">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/f1efaed77249ff9f91e62b82f8efe9f3ca6902a3accdf6a3ce66efc8c3f3b23e"
            className="w-[89px]"
            alt="Logo"
          />
        </Link>

        <div className="flex flex-col gap-4">
          <Link 
            href="/dashboard-components" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full ${isActive('dashboard')}`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/d41784b79e7ec73bc5778380ee492ce9ec450d557085e658eb4c6ca352f95747"
              className={getIconClass('dashboard')}
              alt="Dashboard icon"
            />
            <span>Dashboard</span>
          </Link>

          <Link href="/devices-page-components"   
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full ${isActive('devices')}`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/2c7541631d065854511c3a6bfe1d2270a755e61b8e8718bfd56f86e199441f65"
              className={getIconClass('devices')}
              alt="Devices icon"
            />
            <span>Devices</span>
          </Link>

          <Link href="/dwellers-page-components"   
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full ${isActive('user')}`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/c5884c6b2cbe81931ed2268cdd982770a65d1bfefa2a667e000b3ff1b1507845"
              className={getIconClass('user')}
              alt="Users icon"
            />
            <span>Users</span>
          </Link>

          <Link href="/energy-page-components" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full ${isActive('energy')}`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/87c3745440a29a2520438413124fd0cb8e5dd81b94f5d6ba7d2cd2759c263ca2"
              className={getIconClass('energy')}
              alt="Energy monitoring icon"
            />
            <span>Energy Monitoring</span>
          </Link>

          <Link href="/notification-page-components" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full ${isActive('notifications')}`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/f9835c6e57f79a07df6e18bdc14a7b1910a250a28737364b4a84f1bcf69919b1"
              className={getIconClass('notifications')}
              alt="Notifications icon"
            />
            <span>Notifications</span>
          </Link>

         
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 hidden max-md:block"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};