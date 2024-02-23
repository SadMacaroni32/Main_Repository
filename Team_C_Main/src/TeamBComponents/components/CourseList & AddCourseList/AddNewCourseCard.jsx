import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";

const AddNewCourseCard = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    course_id: "",
    course_title: "",
    course_description: "",
    chapter_title: "",
  });

  const [characterLimits, setCharacterLimits] = useState({
    course_title: false,
    course_description: false,
    chapter_title: false,
  });

  const handleInputChange = (e, limit, name) => {
    const { value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));

    if (value.length > 0 && value.length === limit) {
      setCharacterLimits((prevLimits) => ({ ...prevLimits, [name]: true }));
    } else {
      setCharacterLimits((prevLimits) => ({ ...prevLimits, [name]: false }));
    }
  };
  const renderPopup = (name, label, limit) => {
    const isLimitReached = characterLimits[name];

    return (
      <>
        {isLimitReached && (
          <div className="absolute bg-gray-800 text-white text-center rounded-md py-1 px-2 text-xs transform -translate-x-1/2 left-1/2 top-[-1.5rem] z-50">
            {label} limit reached! (Limit: {limit} characters)
          </div>
        )}
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", course);
    await axios.post("http://localhost:8080/api/courses", course);
    navigate();
  };

  console.log(course);

  const { courseTitle, description, chapTitle } = course;
  return (
    <div className="mt-[70px] w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="m-5 text-black lg:font-bold lg:text-3xl py-1 lg:py-0 lg:text-[2rem] lg:w-[98%] flex justify-center items-center">
        <p className="mb-10 lg:font-bold TeamB_text-shadow ">
          Create New Course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lg:w-[70%] m-auto">
        <div className="relative w-full mb-5">
          <input
            maxLength={70}
            type="text"
            className="bg-[#BCE8B1] placeholder-[#070101] placeholder:text-center rounded-lg opacity-50 w-full p-4 box-border"
            placeholder="Add course Title"
            name="course_title"
            value={courseTitle}
            onChange={(e) => handleInputChange(e, 70, "course_title")}
          />
          {renderPopup("course_title", "Course title", 70)}
        </div>

        <div className="relative w-full mb-5">
          <textarea
            maxLength={250}
            rows="5"
            name="course_description"
            value={description}
            className="resize-none bg-[#BCE8B1] placeholder-[#070101] placeholder:text-center rounded-lg opacity-50 w-full p-4 box-border"
            placeholder="Add new brief description"
            onChange={(e) => handleInputChange(e, 250, "course_description")}
          />
          {renderPopup("course_description", "Description", 250)}
        </div>

        <div className="relative w-full mb-5">
          <input
            maxLength={70}
            type="text"
            className="bg-[#BCE8B1] placeholder-[#070101] placeholder:text-center rounded-lg opacity-50 w-full p-4 box-border"
            placeholder="Add Chapter Title"
            name="chapter_title"
            value={chapTitle}
            onChange={(e) => handleInputChange(e, 70, "chapter_title")}
          />
          {renderPopup("chapter_title", "Chapter title", 70)}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5 lg:w-full lg:flex lg:justify-center">
          <button className="w-full TeamB_btn-style  lg:w-[120px] lg:flex lg:justify-center xl:w-[170px] rounded-full cursor-pointer">
            <div className="mr-1">
              <span>
                <BiSave className="lg:text-[1.5rem] text-white" />
              </span>
            </div>
            <div>Save</div>
          </button>

          <Link to="/teambcourselist">
            <button className="w-full TeamB_btn-style  lg:w-[120px] lg:flex lg:justify-center xl:w-[170px] rounded-full">
              <div className="mr-1">
                <span>
                  <ImCancelCircle className="lg:text-[1.5rem] text-white" />
                </span>
              </div>
              Cancel
            </button>
          </Link>
        </div>
      </form>

      <footer className="flex justify-center pt-20">
        <div>
          <p className="text-[#4D9349] font-medium">
            All Rights Reserved | Copyright 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AddNewCourseCard;
