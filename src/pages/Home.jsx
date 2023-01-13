import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

import { DisplayCampaigns } from "../components";

const Home = ({ searchInput }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns, getSearchCampaigns } =
    useStateContext();

  const fetchCampaigns = async (searchInput) => {
    let data = [];
    setIsLoading(true);
    if (!searchInput) {
      data = await getCampaigns();
    } else {
      data = await getSearchCampaigns(searchInput);
    }
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns(searchInput);
  }, [address, contract, searchInput]);

  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Home;
