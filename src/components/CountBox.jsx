import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold p-3 text-[30px] text-white bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-nomral text-[16px] text-center text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px]">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
