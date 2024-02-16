/* eslint-disable react/prop-types */
//2/3/2024 junite, fix course title and search bar width
//2/13/2024 junite, API Functionalities

import React, { useState } from "react";

//import search icon
import { IoSearchSharp } from "react-icons/io5";

import CourseOverviewById from "./CourseOverviewById";
import Nav from "../NavBar/Nav";
import { useNavigate } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";

const CourseOverviewCard = ({ courseTitle }) => {
  const [chapter, setChapter] = useState({
    // chapter_id: "",
    chapter_title: "",
  });
  /*January 17 2023 API connection from backend to front end displaying data */

  //mockdata chapter

  //back function
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //react hook for edit and save chapter title
  const [showSave, setShowSave] = useState(false);
  const [showEdit, setShowEdit] = useState(true);

  const handleEdit = () => {
    setShowSave(true);
    setShowEdit(false);
  };
  const handleSave = () => {
    setShowEdit(true);
    setShowSave(false);
  };

  return (
    <>
      {/*January 19 2024 -gem modify responsiveness*/}

      <div className="relative w-full m-auto h-[120vh] mt-[70px]  ">
        <div className="relative w-full h-[120vh] m-auto ">
          <div className="w-[90%] pb-5 mt-10 flex mx-auto flex-col lg:center-row lg:w-[90%] lg:m-auto  items-center  ">
            <div className="flex w-[100%] justify-between">
              <div
                className="flex items-center cursor-pointer w-[10%] absolute left-0 top-[-.3rem] pb-4"
                onClick={goBack}>
                <span className="text-[2.5rem] px-5">
                  <IoArrowBackCircle />
                </span>
               
              </div>
              <div className="lg:font-bold lg:text-[2rem] w-full flex justify-center">
                <p className="lg:font-bold TeamB_text-shadow">
                  Course Overview
                </p>
              </div>
            </div>
            <div className="w-full lg:max-w-[800px]">



              <div className="flex items-center justify-center">
                <CourseOverviewById />
              </div>
            </div>

            {/* <div>
              <EditChapterTitle/>
            </div> */}
            {/*January 19 2024 -gem modify responsiveness*/}
            {/*January 17 2023 API connection from backend to front end displaying data */}
            {/*January 19 2024 -gem modify buttons add footer*/}

            {/*January 19 2024 -gem modify buttons add footer*/}
          </div>
          <footer className="flex justify-center pt-10 pb-5">
            <div>
              <p className="text-[#4D9349] font-medium">
                All Rights Reserved | Copyright 2024
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CourseOverviewCard;
// 1/19/2024
