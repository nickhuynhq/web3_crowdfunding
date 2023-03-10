import React from "react";
import { useNavigate } from "react-router-dom";
import { daysLeft } from "../utils";
import { loader } from "../assets";
import FundCard from "./FundCard";
import Loader from "./Loader";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const naviagte = useNavigate();

  const handleNavigate = (campaign) => {
    naviagte(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Loader text={""} />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns.
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => {
              return (
              <FundCard
                key={campaign.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            )
          }

          )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
