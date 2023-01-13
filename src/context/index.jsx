import React, { useContext, createContext } from "react";
import toast from 'react-hot-toast';

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
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

  // Disconnect to smart wallet
  const disconnect = useDisconnect();

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
      
      toast.success("Campaign published successfully! 🎉")
      console.log("Contract Call Success");
    } catch (error) {
      toast.error("Unable to process campaign. Please try again later.")
      console.log("Contract Call Failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async (userAddress) => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === userAddress
    );

    return filteredCampaigns;
  };

  const getSearchCampaigns = async (searchInput) => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.description.toLowerCase().includes(searchInput.toLowerCase()) || campaign.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {

    try {
      const data = await contract.call("donateToCampaign", pId, {
        value: ethers.utils.parseEther(amount),
      });
      toast.success("Transaction processed successfully! 🎉")
      navigate('/')
      return data;
      
    } catch (error) {
      if(error.reason.includes("insufficient")){
        toast.error("Insufficient Funds")
      } else {
        toast.error("Unable to make transaction, please try again later.")
      }
      console.log(error.reason)
      return error.reason
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    let parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations = [
        ...parsedDonations,
        {
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        },
      ];
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getSearchCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
