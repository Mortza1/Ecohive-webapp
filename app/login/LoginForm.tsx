"use client";

import React, { useState, useEffect } from "react";
import { PasswordInput } from "./PasswordInput";
import { Divider } from "./Divider";
import { GoogleSignIn } from "./GoogleSignIn";
import { useRouter, useSearchParams } from "next/navigation"; // Import router & search params
import { useAuth } from "../contexts/AuthContext";

export const LoginForm: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Extract hub_id from URL and store it locally
  useEffect(() => {
    const hubId = searchParams.get("hub_id");
    if (hubId) {
      localStorage.setItem("hub_id", hubId);
      console.log("Hub ID stored:", hubId);
    }
  }, [searchParams]);

  const handleAuth = async () => {
    if (isRegistering && name.trim() === "") {
      setError("Name is required for registration.");
      return;
    }
  
    setError(""); // Reset any previous errors
    setLoading(true); // Start loading
    var res = null;
    try {
      if (isRegistering) {
        const hubId = localStorage.getItem("hub_id"); // Retrieve stored hub_id
        res = await register(name, email, password, hubId??''); 

      } else {
        res = await login(email, password);
      }
      if (res == null || res == false) {
        setError("Authentication failed. Please check your credentials.");
        return;
      } else {
        router.replace('/homes-page-components')
      }
    } catch (error) {
      setError("Authentication failed. Please check your credentials.");
      console.error("Auth error:", error);
    } finally {
      setLoading(false); // Stop loading after auth attempt
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col px-20 py-44 mx-auto w-full text-base font-semibold text-black bg-amber-50 rounded-xl">
      <img src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/f1efaed77249ff9f91e62b82f8efe9f3ca6902a3accdf6a3ce66efc8c3f3b23e?placeholderIfAbsent=true" 
        alt="Login Icon" className="object-contain self-center w-[89px]" />

      {isRegistering && (
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="px-3.5 py-3.5 mt-6 bg-amber-50 rounded-xl border border-black border-opacity-70" required />
      )}

      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3.5 py-3.5 mt-6 bg-amber-50 rounded-xl border border-black border-opacity-70" required />

      <PasswordInput value={password} onChange={(value) => setPassword(value)} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {loading && (
        <div className="self-center mt-4">
          <div className="loader"></div> {/* Add your loader styling here */}
        </div>
      )}

      <button type="button" className="self-start mt-3.5 text-sm underline cursor-pointer">
        Forgot Password
      </button>

      <button type="submit" onClick={handleAuth} className="self-center px-16 py-5 mt-7 max-w-full text-amber-50 rounded-xl w-[238px] bg-[#9CAD88] cursor-pointer" disabled={loading}>
        {isRegistering ? "Sign Up" : "Sign In"}
      </button>

      <Divider />

      <GoogleSignIn />

      <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="self-center mt-4 text-sm underline cursor-pointer">
        {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </form>
  );
};
