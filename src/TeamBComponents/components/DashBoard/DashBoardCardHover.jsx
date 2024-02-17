/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { DashBoardContext } from "../context/DashBoardContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const DashBoardCardHover = ({ courseId, closeDashHover }) => {
  //state for topics
  const [courses, setCourses] = useState({
    course_title: "",
    course_description: "",
  });

  const { course_title, course_description } = courses;
  const handleInputChange = (e) => {
    setCourses({ ...courses, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.put(`http://localhost:8080/api/courses/${courseId}`, courses);
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };
  const loadCourses = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/courses/${courseId}`
    );
    setCourses(result.data);
  };

  const handleCancel = () => {
    // Implement your cancel logic here
    closeDashHover((prev) => !prev);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center backdrop-blur-[.3rem] w-[100vw] h-[150vh]  mt-7">
        <div className="h-[70vh] md:w-[500px] lg:w-[800px] 2xl:h-[500px] 2xl:w-[1000px]  bg-[#BCE8B1] rounded-2xl shadow-2xl mt-7"> {/*light green */}
          <div className="flex flex-col w-full h-full px-10 pb-10">
            <div className="pt-2 h-[50%]">
              <div
                onClick={handleCancel}
                className="flex justify-end w-full pt-2 pr-2 cursor-pointer">
                <IoMdClose className="text-[1.5rem]" />
              </div>
              <p className="flex text-[2rem] font-bold pl-5 justify-center items-center">{course_title}</p>
            </div>
            <div className="w-[100%] bg-[#87D275] h-[50vh] overflow-auto rounded-2xl "> {/**dark green */}
              <p className="py-3  px-3 text-justify rounded-lg ">
                {course_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCardHover;
