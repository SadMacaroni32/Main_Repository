// 1/31/2024 from junite, to ced. TODO
//Only show

import React, { useContext } from "react"; // Importing React and useContext hook
import logo from "../../../assets/TeamBassests/companyLogo.png"; // Importing logo image

//import react icon
import { GiHamburgerMenu } from "react-icons/gi";
import NavSideBar from "./NavSideBar"; // Importing NavSideBar component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { CgProfile } from "react-icons/cg"; // Importing CgProfile icon component
import { MdOutlineLogout } from "react-icons/md"; //// Importing MdOutlineLogout icon component
//import profile logo image file
import profileLogo from "../../../assets/TeamBassests/Picture.png";

//importing react icon
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

//Importing NavBarContext from context
import { NavBarContext } from "../context/NavBarContext";
//Nav functional component
const Nav = () => {
  //Destructuring values from NavBarContext
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
    showForum,
    forumShow,
    logout,
    setForumShow,
  } = useContext(NavBarContext);

  return (
    <>
      {/* Navigation bar */}
      <nav className="fixed w-full top-0 z-[100] ">
        <div
          className={
            header
              ? "relative flex justify-between items-center lg:justify-normal bg-[#D9FFCF] h-[69px] transition-all "
              : "relative flex justify-between items-center lg:justify-normal bg-transparent h-[69px] transition-all "
          }>
          {/* Link to Dashboard*/}
          <Link to="/teambdashboard" className="">
            <img
              className=""
              src={logo}
              alt="tsukidenLogo"
              width={171.67}
              height={50}
              onClick={showLogo}
            />
            {/* January 30, 2024 - Cedrick - Fixed the style of the nav bar according to the design of team D */}
          </Link>
          <div className="hidden lg:flex lg:items-end xl:w-[300px] lg:pl-10 lg:min-w-[400px] lg:justify-between gap-5">
            {/* 1/11/2024 */}
            {/* Link to dashboard */}
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
            {/* Link to course list */}
            <Link to="/teambcourselist" onClick={showCourseList} className="">
              <ul
                className={
                  courseListShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] hover:bg-opacity-[50%] hover:font-semibold transition-all"
                }>
                Course List
              </ul>
            </Link>
            {/* Link to forum */}
            <Link to="/ForumFInstructor" onClick={showForum}>
              <ul
                className={
                  forumShow
                    ? "font-semibold text-[#116211] text-center p-1 TeamB_text-shadow   transition-all"
                    : "font-bold TeamB_text-shadow   p-1  hover:text-[#116211] transition-all hover:bg-opacity-[50%] hover:font-semibold "
                }>
                Forums
              </ul>
            </Link>
          </div>
          {/* Hamburger menu for mobile view */}
          <div className="relative flex items-center lg:hidden w-[60%] md:w-[50%] justify-end">
            {show ? (
              <div className="flex w-full">
                <div
                  onClick={() => setShow((prev) => !prev)}
                  className=" m-auto TeamB_text-shadow gap-x-4 py-1 px-2 bg-[#bce8b1] rounded-[8rem] shadow-lg flex justify-center items-center lg:hidden">
                  <img
                    className="h-[6vh] rounded-[50%] border-2 border-green-800"
                    src={profileLogo}
                    alt="profileLogo"
                  />
                  <div className="text-[.8rem] leading-3">
                    <p>Judes Macabales</p>
                    <p>jmacabales@tgsi.com.ph</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[70%] flex justify-end pr-2">
                <img
                  className="h-[6vh] rounded-[50%] border-2 border-green-800"
                  src={profileLogo}
                  alt="profileLogo"
                  onClick={() => setShow((prev) => !prev)}
                />
              </div>
            )}

            {/* <GiHamburgerMenu
              className="text-[2rem]"
              onClick={() => setShow((prev) => !prev)}
            /> */}
          </div>
          {/* Profile dropdown */}
          <div className=" drop-shadow-lg shadow-lg  bg-[#ffffff] mr-1 cursor-pointer lg:text-[1rem]  h-[7vh] rounded-md ml-auto hidden border-lime-900 border-[.1rem] lg:flex justify-between items-center p-1 text-[#126912]">
            <div className="flex items-center justify-center gap-x-1">
              <img
                src={profileLogo}
                alt=""
                className="h-[6vh] rounded-[50%]"
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
              {/* Dropdown content */}
              {showDropDown && (
                <div className="bg-[#D9FFCF] absolute right-0 top-12 lg:top-11 w-full flex flex-col justify-between rounded-md items-center border-solid border-[1px] border-[#116211]">
                  {/* Link to profile */}
                  <Link
                    to="/teambprofile"
                    onClick={showProfile}
                    className="w-full text-center ">
                    <p
                      className={
                        profileShow
                          ? showDropDown
                            ? " text-[#116211] rounded-md text-start p-1 transition-all bg-[#D9FFCF]   p-1-shadow  "
                            : ""
                          : showDropDown
                          ? " text-[#000000] rounded-md text-start p-1  hover:text-[#116211]"
                          : ""
                      }>
                      <CgProfile className="text-[4vh] inline-block align-start mr-3 " />
                      Profile
                    </p>
                  </Link>
                  {/* Link to logout */}
                  <Link
                    to="/"
                    src="CgProfile"
                    onClick={showLogout}
                    className="w-full text-center ">
                    <p
                      className={
                        logout
                          ? showDropDown
                            ? " text-red-600 hover:text-red-500 text-start transition-all rounded-md  p-1  hover:bg-opacity-[50%] "
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
        </div>
        {show && (
          <div className="absolute flex justify-end w-full top-[4.3rem] lg:hidden backdrop-blur-[.1rem]">
            <NavSideBar />
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav; // Exporting the Nav component as default
//comments by: Judes 02-19-24
