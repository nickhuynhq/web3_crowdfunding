import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sun, logout, crowded } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] hover:bg-[#2c2f32] transition duration-300 ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund-logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund-logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { disconnect, address } = useStateContext();

  return (
    <div className="flex justify-between flex-col sticky top-5 h-[93vh]">
      <Link
        className="flex items-center gap-5 ml-4 hover:scale-105 transition duration-300"
        to="/"
        onClick={() => {window.location.href="/"}}
      >
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={crowded} />
        <h1 className="font-epilogue font-bold text-[22px] text-white">
          Crowd3D
        </h1>
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 ml-2 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
          {address && (
            <Icon
              key={logout}
              imgUrl={logout}
              isActive={isActive}
              handleClick={() => disconnect()}
            />
          )}
        </div>

        <Icon styles="bg=[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
