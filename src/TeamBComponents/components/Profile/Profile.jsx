//  1/30/2024 fix margin top for profile container

import React, { useContext, useState, useEffect } from "react"; // Importing necessary modules from React library
import PersonalInfo from "./PersonalInfo"; // Importing PersonalInfo component
import AccDetails from "./AccDetails"; // Importing AccDetails component

//arrow back icon
import { IoArrowBackCircle } from "react-icons/io5"; // Importing arrow back icon from react-icons
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for programmatic navigation
import Footer from "../Footer"; // Importing Footer component

import { ProfileContext } from "../context/ProfileContext"; // Importing ProfileContext from ProfileContext.js
import PersonalEdit from "./PersonalEdit"; // Importing PersonalEdit component
import Nav from "../NavBar/Nav"; // Importing Nav component
import axios from "axios"; // Importing axios for making HTTP requests

const Profile = () => { // Define functional component Profile 
  //use navigate to back
  const navigate = useNavigate(); // Initialize navigate using useNavigate hook

  const goBack = () => { // Define goBack function
    navigate(-1); // Navigate back
  };

  //2-17-24
  const [instructors, setInstructors] = useState([]); // Define state for instructors array and a function to update it

  const [instructor, setInstructor] = useState({ // Define state for individual instructor object and its properties
    instructor_first_name: "",
    instructor_last_name: "",
    instructor_contact_number: "",
    instructor_email: "",
  });

  useEffect(() => { // Load instructors data from API when component mounts 
    const loadInstructors = async () => {  // Define an asynchronous function to fetch instructors data
      const result = await axios.get("http://localhost:8080/api/instructors"); // Send GET request to fetch instructors data from the specified API endpoint
      setInstructors(result.data); // Update the instructors state with the fetched data
    };

    loadInstructors(); // Call the loadInstructors function when the component mounts (empty dependency array)
  }, []);
  console.log(instructors); // Log the current state of instructors array to the console for debugging

  // const handleInputChange = (e) => {
  //   setInstructor({ ...instructor, [e.target.name]: e.target.value });
  // };

  // const {
  //   instructor_first_name,
  //   instructor_last_name,
  //   instructor_email,
  //   instructor_contact_number,
  // } = instructor;

  //2-17-24

  //destructure profile context
  const { showPersonalInfo, showAccDetails, showPInfo, showADetails } = // Destructure values from ProfileContext
    useContext(ProfileContext);
  return ( // Return JSX elements
    <>
      <Nav /> {/* Render Nav component */}
      <div className="h-[100vh] mt-[65px]"> {/* Main container with custom styling */}
        <div>
          {/* Use react icon instead of word back */}
          <div
            className="flex items-center mt-3 cursor-pointer pl-1 lg:px-5 w-[10%]" // Container for back button 
            onClick={goBack}> {/* Click event to go back */}
            <span className="text-[2.5rem]"> {/* Back button icon */} 
              <IoArrowBackCircle /> {/* Render back button icon */}
            </span>
          </div>
        </div>

          {/* 1/11/2024 fix nav */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-5 lg:mt-1 ">{/* Flex container for profile management options */}
          <div className=" lg:w-[20%] xl:w-[449px] xl:h-[440px] lg:h-[200px] lg:shadow-lg lg:bg-[#BCE8B1] lg:flex lg:items-center lg:flex-col lg:rounded-md"> {/* Container for profile management options */}
            <p className="lg:p-5 text-[2rem] lg:text-[1.2rem] xl:text-[32px] font-bold text-[#4D4141] opacity-[80%] text-center lg:text-start"> {/* Title */}
              Profile Management
            </p>

            <div className="hidden lg:flex lg:border-b-2 lg:border-black w-[90%]"></div>
            {/* Make Personal Information & Acc Details clickable */}
            {/* When element Personal Info clicked, must navigate to Personal Info Component same as Acc Details */}
            {/* Use react icon instead of plain text for better UI in mobile and desktop */}
            {/* In desktop mode when hovered a text Personal Information must show, same as Account Details */}
            <div className="flex lg:flex-col w-[100%] lg:w-full items-center justify-center gap-x-5 py-2 lg:py-0">
              <p
                className={
                  showPersonalInfo // Conditionally apply classes based on showPersonalInfo state
                    ? "cursor-pointer p-1 rounded-md lg:mt-2 lg:p-2 lg:text-[1.2rem] xl:text-[32px] text-[#000000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%] "
                    : "cursor-pointer p-1 rounded-md lg:mt-2 lg:p-2 lg:text-[1.2rem] xl:text-[32px] text-[#4D4141] hover:text-[#000000] opacity-[53%] lg:w-[100%] lg:text-center "
                }
                onClick={showPInfo}>
                Personal Information {/* Personal Information option */}
              </p>
              <p
                className={
                  showAccDetails // Conditionally apply classes based on showAccDetails state
                    ? "cursor-pointer p-1 rounded-md lg:text-[1.2rem] xl:text-[32px] lg:p-2 text-[#000] opacity-[53%] bg-[#126912] lg:w-[100%] lg:text-center bg-opacity-[25%]"
                    : "cursor-pointer p-1 rounded-md lg:text-[1.2rem] xl:text-[32px] lg:p-2 text-[#4D4141] hover:text-[#000] opacity-[53%]  lg:w-[100%] lg:text-center "
                }
                onClick={showADetails}>
                Account Details {/* Account Details option */}
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            {/* Place your Component here */}
            {
              showPersonalInfo && <PersonalInfo /> /* 2-17-24<div>  Render PersonalInfo component if showPersonalInfo is true
              {instructor.map((inst, idx) => {
                const {instructor_name} = inst
                return (
                  <div key={idx}>
                    <PersonalInfo instructorName={instructor_name} />
                  </div>
                );
              })}
            </div> 2-17-24*/
            }
            {showAccDetails && <AccDetails />} {/* Render AccDetails component if showAccDetails is true */}
            {/* /* Place AccDetails Component here */}
            {/* <AccDetails/> */}
          </div>
        </div>
        <div className="pt-20">
          <Footer /> {/* Render Footer component */}
        </div>
      </div>
    </>
  );
};

export default Profile; //Exporting Profile component

//1/17/2024
//comments by: Judes 02-21-24
