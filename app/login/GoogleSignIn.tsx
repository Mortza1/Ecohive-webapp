import React from "react";

export const GoogleSignIn: React.FC = () => {
  return (
    <button
      type="button"
      className="flex gap-4 self-center mt-12 ml-3 max-w-full text-base w-[216px] max-md:mt-10 cursor-pointer"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/0b816942ca5ab43d7b60e37c884cb2f3919a7d0287dc411f7bb0d634e03f41ce?placeholderIfAbsent=true"
        alt="Google logo"
        className="object-contain shrink-0 w-10 aspect-square"
      />
      <span className="grow shrink my-auto w-[152px]">Sign in with Google</span>
    </button>
  );
};