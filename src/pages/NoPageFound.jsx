import React from "react";

const NoPageFound = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[20%]">
      <h1 className="font-epilogue font-bold sm:text-[32px] md:text-[64px] leading-[38px] text-white">
        404
      </h1>
      <h2 className="font-epilogue font-bold sm:text-[12px] md:text-[18px] mt-[16px] text-white">
        Sorry, the page you are looking for does not exist.
      </h2>
    </div>
  );
};

export default NoPageFound;
