"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useAuth } from "./contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, logout, login } = useAuth(); // Added logout and login

  useEffect(() => {
    const hubId = searchParams.get("hub_id");

    if (hubId && isAuthenticated) {
      // If hub_id is present and user is authenticated, log out
      logout();
    }
    if (isAuthenticated){
      router.push("/homes-page-components");
    } else {
      router.push(hubId ? `/login?hub_id=${hubId}` : "/login");
    }

  }, [isAuthenticated, router, searchParams, logout]);

  return null; 
}
