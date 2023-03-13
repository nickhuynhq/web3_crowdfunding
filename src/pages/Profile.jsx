import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

import { CustomButton, DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns, connect} = useStateContext();
  const userAddress = address;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns(userAddress);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="h-full w-full">
      {address ? (<DisplayCampaigns
        title="My Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />) : (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col h-3/4 rounded-[10px] sm:p-10 p-4">
           <h1 className="font-epilogue font-bold sm:text-[25px] md:text-3xl text-white mb-6">
            Please Connect your Wallet to view your Profile
          </h1>
          <CustomButton
            btnType="button"
            title={address ? "Create a campaign" : "Connect"}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connect();
            }}
          />
        </div>
      )}
      
    </div>
  );
};

export default Profile;
