"use client";
import React, { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-5 justify-between px-3.5 py-3.5 mt-2.5 bg-amber-50 rounded-xl border border-solid border-black border-opacity-10 max-md:max-w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none outline-none w-full"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
      </button>
    </div>
  );
};