//  1/30/2024 fix margin top for profile container

import React, { useContext, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import AccDetails from "./AccDetails";

//arrow back icon
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

import { ProfileContext } from "../context/ProfileContext";
import PersonalEdit from "./PersonalEdit";
import Nav from "../NavBar/Nav";

const Profile = () => {
  //use navigate to back
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  

  //destructure profile context
  const { showPersonalInfo, showAccDetails, showPInfo, showADetails } =
    useContext(ProfileContext);

  return (
    <>
      <Nav />
      <div className="h-[100vh] mt-[65px]">
        <div>
          {/* Use react icon instead of word back */}
          <div
            className="flex items-center mt-3 cursor-pointer px-5 w-[10%]"
            onClick={goBack}>
            <span className="text-[2.5rem]">
              <IoArrowBackCircle />
            </span>
           
          </div>
        </div>
        {/* 1/11/2024 fix nav */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-5 lg:mt-1 ">
          <div className="lg:w-[20%] xl:w-[449px] xl:h-[440px] lg:h-[35vh] lg:shadow-lg bg-[#BCE8B1] lg:flex lg:items-center lg:flex-col lg:rounded-md">
            <p className="lg:p-5 lg:text-[1.2rem] xl:text-[32px] font-bold text-[#4D4141] opacity-[80%]">
              Profile Management
            </p>

            <div className="hidden lg:flex lg:border-b-2 lg:border-black w-[90%]"></div>
            {/* Make Personal Information & Acc Details clickable */}
            {/* When element Personal Info clicked, must navigate to Personal Info Component same as Acc Details */}
            {/* Use react icon instead of plain text for better UI in mobile and desktop */}
            {/* In desktop mode when hovered a text Personal Information must show, same as Account Details */}
            <p
              className={
                showPersonalInfo
                  ? "cursor-pointer lg:mt-2 lg:p-2 lg:text-[1.2rem] xl:text-[32px] text-[#000000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%] "
                  : "cursor-pointer lg:mt-2 lg:p-2 lg:text-[1.2rem] xl:text-[32px] text-[#4D4141] hover:text-[#000000] opacity-[53%] lg:w-[100%] lg:text-center "
              }
              onClick={showPInfo}>
              Personal Information
            </p>
            <p
              className={
                showAccDetails
                  ? "cursor-pointer lg:text-[1.2rem] xl:text-[32px] lg:p-2 text-[#000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%]"
                  : "cursor-pointer lg:text-[1.2rem] xl:text-[32px] lg:p-2 text-[#4D4141] hover:text-[#000] opacity-[53%]  lg:w-[100%] lg:text-center "
              }
              onClick={showADetails}>
              Account Details
            </p>
          </div>
          <div>
            {/* Place your Component here */}
            {showPersonalInfo && <PersonalInfo/>}
            {showAccDetails && <AccDetails />}
            {/* /* Place AccDetails Component here */}
            {/* <AccDetails/> */}
          </div>
        </div>
        <div className="pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;

//1/17/2024
