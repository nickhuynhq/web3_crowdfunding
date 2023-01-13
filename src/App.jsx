import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  CampaignDetails,
  ComingSoon,
  CreateCampaign,
  Home,
  NoPageFound,
  Profile,
} from "./pages";
import { Sidebar, Navbar } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10">
        <Sidebar />
        <Toaster />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
        <Routes>
          <Route
            path="/"
            element={
              <Home searchInput={searchInput}/>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
