import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image exists
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        // Call smart contract
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });

        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col h-[80%] rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      {address ? (
        <>
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] leading-[38px] text-white">
              Start Campaign
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Your Name *"
                placeholder="John Doe"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange("name", e)}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange("title", e)}
              />
            </div>

            <FormField
              labelName="Category *"
              placeholder="ie. Education"
              inputType="text"
              value={form.category}
              handleChange={(e) => handleFormFieldChange("category", e)}
            />

            <FormField
              labelName="Story"
              placeholder="Write your story"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />

            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Goal *"
                placeholder="ETH 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange("target", e)}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange("deadline", e)}
              />

              <FormField
                labelName="Campaign Image *"
                placeholder="Place image URL of your campaign"
                inputType="url"
                value={form.image}
                handleChange={(e) => handleFormFieldChange("image", e)}
              />
            </div>
            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit New Campaign"
                styles="bg-[#1dc071] hover:bg-[#008946]"
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className="font-epilogue font-bold sm:text-[25px] md:text-3xl text-white mb-6">
            Please Connect your Wallet to create a Campaign
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
        </>
      )}
    </div>
  );
};

export default CreateCampaign;
