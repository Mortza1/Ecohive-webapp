import React from "react";

export const HeroBanner: React.FC = () => {
  return (
    <div className="flex flex-col grow justify-center px-20 py-52 w-full font-extrabold max-md:px-5 max-md:py-24 max-md:max-w-full bg-[#9CAD88]">
      <div className="flex flex-col items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/48c747120579a828d953565f4a43939309dccea66644da6d65b7ce83d669816a?placeholderIfAbsent=true"
          alt="Eco Hive Logo"
          className="object-contain max-w-full aspect-[0.7] w-[270px]"
        />
        <h1 className="text-6xl text-amber-50 max-md:text-4xl italic">Eco Hive</h1>
        <p className="self-stretch mt-5 text-xl text-center text-stone-600 italic">
          Your Home, Smarter. Your Life, Simpler. Step into the Future Today!
        </p>
      </div>
    </div>
  );
};
