/*January 10, 2024*/
//1/30/2024 junite, created modal show and hide UI and Functionalities for CourseList
//1/31/2024 junite, UI modifications
//2/1/2024 junite, UI modifications and functionalities, mockdata inserted and used for UI test
//2/2/2024 junite, UI modifications add background color for edit modal
//2/5/2024 junite, fixed UI spacing

import React, { useState, useEffect, useRef, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";

//import mock data
import data from "../../mockData/CourselistCard.json";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CopyofCreateNewCourse from "./CopyofCreateNewCourse";

//import search icon
import { IoSearchSharp } from "react-icons/io5";

//import course context
import { CourseContext } from "../context/CourseContext";

//edit icon
import { FaEdit } from "react-icons/fa";
import CourseTitleModal from "./CourseModal/CourseTitleModal";

const CourseListCard = () => {
  // *NOTE
  //if data is coming from db use useState hook to store the data
  //sample: const [courses, setCourses] = useState([])

  const [courses, setCourses] = useState([]);

  const { showCreateCourse, setShowCreateCourse } = useContext(CourseContext);

  /* january 172024*/
  useEffect(() => {
    loadCourses();
    // loadChapter()
  }, []);

  //COURSES
  const loadCourses = async () => {
    const result = await axios.get("http://localhost:8080/api/courses");
    setCourses(result.data);
  };

  console.log(courses);

  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 4;

  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourse = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const npage = Math.ceil(courses.length / coursePerPage);
  const pageTopRef = useRef(null);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    pageTopRef.current.scrollIntoView();
  };

  ///mock data for UI Testing
  const { courselist } = data;

  //state for show and hide course edit title component
  const [showEditTitle, setShowEditTitle] = useState(false);

  //state for modal by id
  const [editCourseId, setEditCourseId] = useState(null);

  // Add a new state variable for modal visibility and position
  const [modalPosition, setModalPosition] = useState({
    visible: false,
    top: "50%",
    left: "50%",
  });

  return (
    <>
      {/* 1/12/2024 UI development and Mobile responsiveness */}

      <div className="mt-[70px] h-[120vh] relative">
        {/* 1/15/2024 functions and buttons */}
        <div className="" ref={pageTopRef}>
          <div className="  xl:w-[1244px]  w-[90%] flex mx-auto flex-col lg:center-row lg:w-[80vw] lg:m-auto lg:mt-5 items-center lg:h-full relative gap-5">
            {/*January 15 2024, API connection of frontend to backend can fetch data from the backend*/}
            <div className="text-black  w-[60vw] lg:font-bold text-[.8rem]  lg:text-[2rem]  flex justify-between items-center ">
              <p className=" 2xl:text-[48px] lg:font-bold TeamB_text-shadow   ">
                Course List
              </p>
              <div className="relative  flex items-center lg:w-[300px] 2xl:w-[544px] h-[35px] 2xl:h-[53px]  bg-white outline-none rounded-md border-b-[.1rem] border-black">
                <input
                  type="text"
                  className="outline-none font-normal pl-2 text-[1.3rem] lg:w-[300px] 2xl:w-[544px] h-[35px] 2xl:h-[53px] rounded-md"
                  name=""
                  id=""
                />
                <div className="absolute top-1 right-2">
                  <IoSearchSharp className="text-[1.5rem]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-y-5">
              {/* change to currentCourse for API connection */}
              {currentCourse.map((course, idx) => {
                return (
                  <div key={idx} className="w-[60vw] rounded-md shadow-md">
                    <div className=" relative flex px-0 py-0 rounded-md xl:h-[115px]  ">
                      <div className="bg-[#BCE8B1] flex py-1 item-center justify-center text-center text-[.8rem] lg:text-[1rem] w-[30%] lg:w-[20%] lg:p-5 rounded-l-sm lg:rounded-l-md">
                        <p className="lg:font-medium TeamB_text-shadow h-[8vh] flex items-center  ">
                          {/* change to course_id for api connection */}
                          PL00{course.course_id}
                        </p>
                      </div>

                      <Link
                        to={`/teambcourseoverview/${course.course_id}`}
                        className="text-white TeamB_text-shadow  lg:font-bold text-[.8rem] py-1 lg:py-0 lg:text-[1.2rem] w-full flex justify-center items-center
                            rounded-r-sm lg:rounded-r-md 	bg-[#126912]  ">
                        {/* change to course_title for api connection */}
                        {course.course_title}
                      </Link>

                      <span
                        onClick={() => {
                          setShowEditTitle((prev) => !prev);
                          setEditCourseId(course.course_id);
                        }}
                        className="absolute cursor-pointer right-2 flex items-center h-full text-white text-[1.5rem]">
                        <FaEdit />
                      </span>
                      {showEditTitle && editCourseId === course.course_id && (
                        <div className="fixed top-0 left-0 z-10 h-full lg:w-full">
                          <div className="w-[100%]">
                            <CourseTitleModal
                              courseId={editCourseId}
                              //  past courseTitle as props to set the value of input in CourseTitleModal

                              courseTitle={course.course_title}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {courses.length < 4 ? (
              <></>
            ) : (
              <Stack spacing={2} className="">
                <Pagination
                  count={npage}
                  page={currentPage}
                  onChange={handleChange}
                />
              </Stack>
            )}
            {/* onClick={() => setShowCreateCourse((prev) => !prev)} */}
            <div className=" w-[100%]">
              <div className=" h-[8vh]  flex w-[50%] m-auto lg:w-[80%]   items-center justify-center">
                <div
                  className="bg-[#BCE8B1] w-[10%] cursor-pointer  flex items-center justify-center h-[8vh]  rounded-l-sm lg:rounded-l-md"
                  onClick={() => setShowCreateCourse((prev) => !prev)}>
                  <span>
                    <IoAdd className="lg:text-[2rem] text-white" />
                  </span>
                </div>
                <div
                  className="bg-[#126912] text-white lg:font-bold h-[8vh]  cursor-pointer
                  w-[30%] 2xl:w-[50%] flex items-center justify-center rounded-r-sm  lg:rounded-r-md"
                  onClick={() => setShowCreateCourse((prev) => !prev)}>
                  <span className=" 2xl:text-[2rem] TeamB_text-shadow  ">
                    Add New Course
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute ">
              <div className="lg:w-[1080px] ">
                {showCreateCourse && <CopyofCreateNewCourse />}
              </div>
            </div>
            {/*January 15 2024*/}
            {/*January 19 2024 -gem modify buttons add footer*/}
          </div>
          <footer className="absolute bottom-10 flex justify-center w-[100%]">
            <div className="">
              <p className="text-[#4D9349] font-medium">
                All Rights Reserved | Copyright 2024
              </p>
            </div>
          </footer>
        </div>
        {/*January 19 2024 -gem modify buttons add footer*/}
      </div>
    </>
  );
};

export default CourseListCard;
// /*January 23, 2024*/
