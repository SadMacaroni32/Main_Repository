/* eslint-disable react/prop-types */
//2/2/2024 junite, develop edit page
//2/3/2024 junite, continuation of development, completed

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

import { MdDelete } from "react-icons/md";

import DeleteTopicModal from "../TopicModal/DeleteTopicModal";
import AddTopic from "./AddTopic";
import EditTopic from "./EditTopic";
import CourseDescription from "./CourseDescription";
import Nav from "../../NavBar/Nav";
import { CourseContext } from "../../context/CourseContext";
import axios from "axios";

const TopicPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { courses, setCourses } = useContext(CourseContext);

  //user params to navigate specific id
  let { id } = useParams();

  useEffect(() => {
    loadChapters();
  }, [id]);

  const loadChapters = async () => {
    try {
      const result = await axios.get(
       `http://localhost:8080/api/courses/${id}`
      );

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };


  //delete modal state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  //course description state
  const [showCourseDescription, setShowCourseDescription] = useState(true);

  //add topic state
  const [showAddTopic, setShowAddTopic] = useState(false);

  //edit topic state
  const [showEditTopic, setShowEditTopic] = useState(false);

  //functions for showing and hiding description, add topic, and edit topic

  const showDescriptionHandle = () => {
    setShowCourseDescription(true);
    setShowAddTopic(false);
    setShowEditTopic(false);
  };
  const showAddHandle = () => {
    setShowAddTopic(true);
    setShowCourseDescription(false);
    setShowEditTopic(false);
  };

  const showEditHandle = () => {
    setShowEditTopic(true);
    setShowCourseDescription(false);
    setShowAddTopic(false);
  };

  return (
    <>
      <Nav />
      <div className="flex mt-[80px] lg:h-[100vh] 2xl:h-[1011px]">
        {/* sidebar */}
        <div className="h-full flex flex-col items-center lg:w-[250px] 2xl:w-[375px] bg-[#126912]">
          <div
            className="flex justify-start  pt-3 pb-8 cursor-pointer w-[90%]"
            onClick={goBack}>
            <span className="text-[2.1rem] text-white">
              <IoArrowBackCircle />
            </span>
          </div>
          <div className="hidden lg:flex lg:border-b lg:border-white w-[90%] "></div>

          <div className="h-[70%] w-[80%] ">
            <div>
              <p
                className="cursor-pointer font-light pb-3 text-white TeamB_text-shadow text-[1.3rem] 2xl:text-[32px]"
                onClick={showDescriptionHandle}>
                Description
              </p>
            </div>
            <div>
              {courses.map((course, idx) => {
                const { chapter } = course;
                return (
                  <div key={idx}>
                    {chapter.map((chap, idx) => {
                      const { topic } = chap;
                      console.log(topic)
                      return (
                        <div key={idx}>
                          {topic.map((tops, idx) => {
                            const { topic_title } = tops;
                            console.log(tops);
                            return (
                              <div key={idx}>
                                <div className="flex items-center justify-between">
                                  <p
                                    className="cursor-pointer py-2 font-light text-white TeamB_text-shadow text-[1.2rem] 2xl:text-[32px]"
                                    onClick={showEditHandle}>
                                    Topic 1: Title
                                  </p>
                                  <span
                                    className="text-[1.5rem] text-white cursor-pointer"
                                    onClick={() =>
                                      setDeleteModalVisible((prev) => !prev)
                                    }>
                                    <MdDelete />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div
              className="flex items-center h-[30%] mt-20 "
              onClick={showAddHandle}>
              <div className="text-white text-[2.5rem] pr-2 cursor-pointer">
                <IoIosAddCircle />
              </div>
              <span className="font-medium text-white cursor-pointer text-[1rem] 2xl:text-[24px]">
                Add New Topic
              </span>
            </div>
          </div>
        </div>

        {/* Delete Modal Section */}

        {deleteModalVisible && (
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="lg:w-full">
              <DeleteTopicModal />
            </div>
          </div>
        )}
        {showCourseDescription && <CourseDescription />}
        {showAddTopic && <AddTopic />}
        {showEditTopic && <EditTopic />}
      </div>
    </>
  );
};

export default TopicPage;
