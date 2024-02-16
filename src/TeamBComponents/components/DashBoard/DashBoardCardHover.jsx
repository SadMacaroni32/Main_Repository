import React, { useContext, useEffect, useState} from "react";
import { DashBoardContext } from "../context/DashBoardContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const DashBoardCardHover = () => {
  const { setDashBoardHover } = useContext(DashBoardContext);
  const [courses, setCourses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadCourses();
  }, [id]);

  const loadCourses = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/courses/${id}`);
      setCourses(result.data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center backdrop-blur-[.1rem]">
        <div className="h-[85vh] md:w-[500px] lg:w-[550px] 2xl:w-h-[672px] 2xl:w-[724px]  bg-[#BCE8B1] rounded-lg">
            <span>
              <IoMdClose />
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full">

            <p className="text-[2rem] font-bold">SQL</p>
            <div className="p-10 ">
              <p className="bg-[#87D275] p-5 rounded-lg text-justify">
                In a Structured Query Language (SQL) querying workshop,
                participants delve into fundamental concepts such as syntax,
                database design, and optimization, empowering them with
                practical skills to write efficient queries.
                <p className="pt-3">With 3 Chapters and 2 topic each</p>
                <p className="pt-2">
                  Get a certificate for passing the course by passing 80% of
                  quiz and assessment
                </p>
              </p>
            </div>

          </div>
        </div>
      </div>
    
  );
};

export default DashBoardCardHover;
