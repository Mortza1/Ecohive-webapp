import React from "react";

export const Divider: React.FC = () => {
  return (
    <div className="flex gap-5 justify-center items-center mt-16 text-sm max-md:mt-10 w-full">
      <div className="grow h-0.5 border border-black border-solid max-w-[186px]" />
      <span>OR</span>
      <div className="grow h-0.5 border border-black border-solid max-w-[186px]" />
    </div>
  );
};