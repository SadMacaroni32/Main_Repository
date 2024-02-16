// 1/31/2024 from junite, to ced. TODO
//Only show

import React, { useContext } from "react";
import logo from "../../../assets/TeamBassests/companyLogo.png";

//import react icon
import { GiHamburgerMenu } from "react-icons/gi";
import NavSideBar from "./NavSideBar";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
//import profile logo
import profileLogo from "../../../assets/TeamBassests/Picture.png";

//import react icon
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { NavBarContext } from "../context/NavBarContext";



const Nav = () => {
  const {
    header,
    dashBoardShow,
    profileShow,
    courseListShow,
    showDropDown,
    setShowDropDown,
    showLogout,
    show,
    setShow,
    showLogo,
    showDashBoard,
    showProfile,
    showCourseList,
  } = useContext(NavBarContext);

  return (
    <>
      <nav className="fixed w-full top-0 z-[100] ">
        <div
          className={
            header
              ? "relative flex justify-between items-center lg:justify-normal bg-[#D9FFCF] h-[69px] transition-all "
              : "relative flex justify-between items-center lg:justify-normal bg-transparent h-[69px] transition-all "
          }>
          <Link to="/teambdashboard">
            <img
              className="  ml-10 xl:w-[171.67px] xl:h-[50px] lg:h-[5rem] xl:ml-[95px] py-3 xl:py-1"
              src={logo}
              alt="tsukidenLogo"
              width={171.67}
              height={50}
              onClick={showLogo}
            />
            {/* January 30, 2024 - Cedrick - Fixed the style of the nav bar according to the design of team D */}
          </Link>
          <div className="hidden lg:flex lg:items-end xl:w-[300px] lg:pl-10 lg:min-w-[280px] lg:justify-between gap-5">
            {/* 1/11/2024 */}
            <Link to="/teambdashboard" onClick={showDashBoard}>
              <ul
                className={
                  dashBoardShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
                }>
                Dashboard
              </ul>
          
            </Link>
            <Link to="/teambcourselist" onClick={showCourseList}>
              <ul
                className={
                  courseListShow
                    ? "font-semibold text-[#116211]  text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] hover:bg-opacity-[50%] hover:font-semibold transition-all"
                }>
                Course List
              </ul>
           
            </Link>
            <Link to="/ForumF">
              <ul
                className={
                  dashBoardShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
                }>
                Forums
              </ul>
            </Link>
          </div>
          <div className="relative flex items-center px-3 lg:hidden">
            <GiHamburgerMenu
              className="text-[2rem]"
              onClick={() => setShow((prev) => !prev)}
            />
            {/* 01/31/2024 - Cedrick - Adjusted the design of nav bar and changed the picture in the profile */}
            {show && <NavSideBar />}
          </div>
          <div className="drop-shadow-lg shadow-lg  bg-[#ffffff] absolute right-3 cursor-pointer lg:text-[1rem] lg:w-[15vw] 2xl:w-[193px] h-[7vh] rounded-md ml-auto hidden border-lime-900 border-[.1rem] lg:flex justify-between items-center p-1 text-[#126912]">
            <img
              src={profileLogo}
              alt=""
              className="h-[6vh] rounded-[50%] p-1"
              onClick={() => setShowDropDown((prev) => !prev)}
            />
            <p
              onClick={() => setShowDropDown((prev) => !prev)}
              className="  text-[2.5vh]">
              Hi, JMacabales!
            </p>
            <span
              onClick={() => setShowDropDown((prev) => !prev)}
              className="cursor-pointer">
              {showDropDown ? <FaChevronUp /> : <FaChevronDown />}
            </span>
            {showDropDown && (
              <div className="bg-[#D9FFCF] absolute right-0 top-10 w-full flex flex-col justify-between rounded-md items-center border-solid border-[1px] border-[#116211]">
                <Link
                  to="/teambprofile"
                  onClick={showProfile}
                  className="w-full text-center ">
                  <p
                    className={
                      profileShow
                        ? showDropDown
                          ? " text-[#116211] rounded-md text-start p-1 transition-all bg-[#D9FFCF]  text-left p-1-shadow  "
                          : ""
                        : showDropDown
                        ? " text-[#000000] rounded-md text-start p-1  hover:text-[#116211]"
                        : ""
                    }>
                    <CgProfile className="text-[4vh] inline-block align-start mr-3 " />
                    Profile
                  </p>
                </Link>
                <Link
                  to="/dashboard"
                  src="CgProfile"
                  onClick={showLogout}
                  className="w-full text-center ">
                  <p
                    className={
                      profileShow
                        ? showDropDown
                          ? " text-red-600 hover:text-red-500 text-start transition-all rounded-md text-left p-1  hover:bg-opacity-[50%] "
                          : ""
                        : showDropDown
                        ? " text-red-600 rounded-md text-start p-1 bg-[#D9FFCF]  hover:text-red-500"
                        : " "
                    }>
                    <MdOutlineLogout className=" text-[4vh] inline-block align-middle mr-3 " />
                    Log out
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
//1/24/2024
