//  1/31/2024 junite, adjust mt for course list

import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//import mock data json file
import data from "../../mockData/MockData.json";
import Footer from "../Footer";
import DashboardCardHover from "./DashBoardCardHover";
import { DashBoardContext } from "../context/DashBoardContext";

const DashboardCard = () => {
  // *NOTE
  //if data is coming from db use useState hook to store the data
  //sample:
  const [courses, setCourses] = useState([]);

  //*NOTE
  //use GET function of axios and use useEffect hook
  //sample:
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const result = await axios.get("http://localhost:8080/api/courses");
    setCourses(result.data);
  };

  //after getting the data display it using map
  //get your react hook where you store the data coming from db
  //sample: courses.map((course, idx) {return(your code here)});

  //*NOTE
  //for now I'll be displaying a data coming from a json format file
  //destructure the data
  const { course } = courses;

  //react hook for dashboardhover
  const { dashBoardHover, setDashBoardHover } = useContext(DashBoardContext);

  return (
    <div className="w-full h-[120vh] relative  ">
      {/* change bg color to provided img */}

      {/* 1/18/204 bg height 323px */}
      <div className=" lg:h-[40vh]  xl:h-[486px]  relative flex flex-col items-center justify-center w-full py-10 bg-[url('https://img.freepik.com/fotos-premium/acuarela-abstracta-verde-textura-papel-blanco_7190-1311.jpg?w=996')] bg-cover shadow-lg lg:py-5">
        <p className="mt-16 TeamB_text-shadow  text-[1.8rem] lg:text-[2rem] font-bold text-white w-[80%] text-center xl:text-[3.5rem] 2xl:text-[64px] ">
          月伝で自分のやり方を学びましょう。
        </p>

        <p className="TeamB_text-shadow  xl:text-[3rem] 2xl:text-[64px] italic lg:text-[1.7rem] font-bold text-[#67836B]  pb-10 lg:pb-15">
          Learn your way at Tsukiden.
        </p>
      </div>
      <div
        className=" xl:h-[330px] 2xl:w-[1519px]  flex flex-col lg:flex-row lg:w-[90vw] 
      lg:m-auto lg:justify-center lg:mt-[2rem] items-center gap-5 mt-[180px] ">
        {courses.slice(0, 3).map((course, idx) => {
          return (
            // 1/11/2024

            <div
              key={idx}
              className="w-[95%] h-[300px] lg:max-w-[270px] shadow-sm rounded-[2rem] 2xl:w-[271px] xl:h-[330px]  bg-[#BCE8B1]">
              <div className="flex flex-col rounded-t-[2rem] p-4 lg:p-5 2xl:px-2 lg:h-[35%] justify-center ">
                <p className="text-[#278510] TeamB_text-shadow ">
                  Course {course.course_id}:
                </p>
                <p className="text-[#278510]  font-bold xl:text-[1.1rem]  line-clamp-1 TeamB_text-shadow">
                  {course.course_title}
                </p>
              </div>
              <div className="relative pt-4 pb-10  px-4 text-justify lg:h-[65%] rounded-b-[2rem] rounded-t-[1rem] bg-[#87D275]">
                <p className=" line-clamp-6 xl:line-clamp-6">
                  {course.course_description}
                </p>
                <button
                  className="text-[#1E6C0B] font-bold TeamB_text-shadow  absolute bottom-2"
                  onClick={() => setDashBoardHover((prev) => !prev)}>
                  See more
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Footer />
      </div>

      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2 ">
        {dashBoardHover && <DashboardCardHover />}
      </div>
    </div>
  );
};

export default DashboardCard;
// 1/23/2024
