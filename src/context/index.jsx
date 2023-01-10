import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Connect with smart contract
  const { contract } = useContract(`${import.meta.env.VITE_CONTRACT_ADDRESS}`);

  // Call write function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();

  // Connect to smart wallet
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description,
        form.target,
        new Date(form.deadline).getTime(), // deadline
        form.image,
      ]);

      console.log("Contract Call Success");
    } catch (error) {
      console.log("Contract Call Failure", error);
    }
  };


  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }))

    return parsedCampaigns;
  }
  

  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);