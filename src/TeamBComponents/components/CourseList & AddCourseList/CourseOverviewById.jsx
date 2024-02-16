//february 3 modification of ui and functionalities -gem
//2/5/2024 junite, fix UI spacing
//2/13-15/2024 junite, API Functionalities

import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { IoAdd } from "react-icons/io5";
import ChapterModal from "../Chapter Modal/ChapterModal";
import DeleteChapterModal from "../Chapter Modal/DeleteChapterModal";
//edit icon
import { FaEdit } from "react-icons/fa";
//delete icon
import { RiDeleteBinLine } from "react-icons/ri";
import CopyofCreateChapterTitle from "./CopyofCreateChapterTitle";
import data from "../../mockData/CourseOverviewCard.json";
import Nav from "../NavBar/Nav";
import { CourseContext } from "../context/CourseContext";
//import search icon
import { IoSearchSharp } from "react-icons/io5";

//close icon
import { IoMdClose } from "react-icons/io";

const CourseOverviewById = () => {
  const { courses, setCourses } = useContext(CourseContext);

  const [showChapModal, setShowChapModal] = useState(false);

  // const [chapters, setChapters] = useState([]);

  // const { showCreateChapter, setShowCreateChapter } = useContext(ChapterContext);

  //user params to navigate specific id
  let { id } = useParams();

  useEffect(() => {
    loadChapters();
    loadChapter();
  }, [id]);

  const loadChapters = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/courses/${id}`);

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };

  const [loadByChapter, setLoadByChapter] = useState([]);
  const loadChapter = async () => {
    const result = await axios.get("http://localhost:8080/api/chapters");
    setLoadByChapter(result.data);
  };
  // console.log(courses);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const handleEditClick = (chapterId) => {
    setSelectedChapterId(chapterId);
    setEditModalVisible(true);
  };

  const handleDeleteChapter = (chapterId) => {
    //  await axios.delete(`http://localhost:8080/api/chapters/${chapterId}`);
    setSelectedChapterId(chapterId);
    setDeleteModalVisible(true);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Search
  const filteredChapter = loadByChapter.filter((chap) =>
    chap.chapter_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [hideSearch, setHideSearch] = useState(false);

  // Ref for the search container
  const searchContainerRef = useRef(null);

  // Other state variables...

  // Hide search container when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setHideSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <>
      <div className="w-full h-full ">
        <div className=" m-0 lg:max-w-[1080px] lg:flex lg:flex-col  lg:justify-center">
          <div className="h-full">
            <div className="w-full lg:max-w-[800px]">
              <div className="text-black  w-full lg:font-bold text-[.8rem]  lg:py-0 lg:text-[2rem]  flex justify-between items-center">
                <p className="lg:font-bold TeamB_text-shadow">HTML</p>

                <div className="relative  flex items-center lg:max-w-[300px] 2xl:w-[544px] h-[35px] 2xl:h-[53px]  bg-white outline-none rounded-md border-b-[.1rem] border-black">
                  <input
                    type="text"
                    className="outline-none font-normal placeholder:font-thin placeholder:text-[1.2rem] pl-2 text-[1rem] lg:w-[300px] 2xl:w-[544px] h-[35px] 2xl:h-[53px] rounded-md"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => setHideSearch(true)}
                  />
                  <div className="absolute top-1 right-2">
                    <IoSearchSharp className="text-[1.5rem]" />
                  </div>
                  {hideSearch && (
                    <div
                      ref={searchContainerRef}
                      className="h-[20vh] w-[100%] absolute bg-[#fff] top-10 z-10 shadow-lg rounded-md pt-2">
                      <div className="flex justify-end w-full cursor-pointer">
                        <IoMdClose
                          onClick={() => setHideSearch(false)}
                          className="text-[1rem] mr-2"
                        />
                      </div>
                      <div className="h-[80%] overflow-auto TeamB_no-scrollbar mr-3">
                        {courses.map((course, idx) => {
                          const { chapter } = course;
                          return (
                            <div key={idx} className="">
                              {filteredChapter.map((chapter, idx) => {
                                const { chapter_title, chapter_id } = chapter;
                                return (
                                  <div key={idx}>
                                    <Link to={`/teambtopicpage/${chapter_id}`}>
                                      <p className="text-[.9rem] pl-2 font-light TeamB_text-shadow cursor-pointer">
                                        {chapter_title}
                                      </p>
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:max-w-[1000px] bg-[#BCE8B1] h-[2vh] items-center lg:rounded-lg">
                <div className="max-w-[30%] bg-[#126912] h-[2vh] lg:rounded-lg"></div>
              </div>
              <div className="w-[98%] font-medium text-[1.4rem] 2xl:text-[36px] m-auto pt-2 pb-4">
                <span className=" TeamB_text-shadow">Lessons</span>
              </div>
              <div className="h-[45vh] overflow-auto TeamB_no-scrollbar pr-3">
                {courses.map((course) => {
                  const { chapter, idx } = course;
                  return (
                    <div key={idx}>
                      {chapter.map((chap, idx) => {
                        const { chapter_id, chapter_title } = chap;
                        return (
                          <div key={idx} className="relative m-0 lg:w-full">
                            <div className="flex items-center justify-center w-full gap-5 pb-4 m-auto">
                              <div className="h-[1.5rem] w-[1.5rem] bg-[#126912] rounded-[100%]"></div>
                              {/* <div className="flex"> */}

                              <Link
                                to={`/teambtopicpage/${chapter_id}`}
                                className=" 2xl:rounded-[20px] w-full lg:flex lg:items-center lg:font-medium lg:text-[1rem] 2xl:text-[24px] bg-[#126912]  py-1 text-center text-[.8rem]  lg:p-5 text-white

                      lg:h-[50px] lg:rounded-[1rem]  ">
                                <p className="text-shadow">
                                  CHAPTER {chapter_id}:
                                </p>
                                <p className="pl-2 lg:font-medium text-shadow">
                                  {chapter_title}
                                </p>

                                {/* 
                  </div> */}
                              </Link>

                              <Link className="absolute flex right-2 ">
                                <div className="flex items-center gap-2 cursor-pointer pl-2- ">
                                  <div
                                    className="text-[1.3rem] 2xl:text-[2rem]  text-white"
                                    onClick={() => handleEditClick()}>
                                    <FaEdit />
                                  </div>

                                  <div
                                    className="text-[1.3rem] 2xl:text-[2rem]  text-white"
                                    onClick={() => handleDeleteChapter()}>
                                    <RiDeleteBinLine />
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {editModalVisible && (
            <div className="fixed w-full h-full pl-10 top-9 left-20">
              <div className="lg:w-[1080px] ">
                {courses.map((course, idx) => {
                  const { chapter, course_title } = course;
                  console.log(course_title);
                  return (
                    <div key={idx}>
                      {chapter.map((chap, idx) => {
                        const { topic, chapter_title, chapter_id } = chap;
                        return (
                          <div key={idx}>
                            <ChapterModal
                              editTitle={setEditModalVisible}
                              chapterId={chapter_id}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {deleteModalVisible && (
            <div className="fixed w-full h-full pl-10 top-9 left-20">
              <div className="lg:w-[1080px] ">
                <DeleteChapterModal
                  chapterId={selectedChapterId}
                  onClose={() => setDeleteModalVisible(false)}
                  onSaved={() => setDeleteModalVisible(false)}
                />
              </div>
            </div>
          )}

          <div className="w-full lg:w-[12rem] m-auto lg:flex lg:justify-center lg:items-center pt-5">
            {/*add new chapter title */}
            <div className="lg:rounded-[1rem] lg:h-[50px] 2xl:h-[65px] flex items-center justify-center cursor-pointer bg-[#BCE8B1]">
              <button
                className="flex items-center justify-center lg:w-[300px] gap-x-3 2xl:w-[481px]"
                onClick={() => setShowChapModal((prev) => !prev)}>
                <span className="pr-1">
                  <IoAdd className="text-[2rem] lg:text-[2.5rem] text-white" />
                </span>
                <span className="text-shadow lg:text-[1rem] lg:font-bold 2xl:text-[24px]  text-[#070101] text-opacity-[55%] pr-1">
                  Add Chapter Title
                </span>
              </button>
            </div>
            <div className="absolute">
              <div className="lg:w-[1080px] ">
                {showChapModal && (
                  <div>
                    {courses.map((course, idx) => {
                      const { course_id } = course;
                      return (
                        <div key={idx}>
                          <CopyofCreateChapterTitle
                            courseId={course_id}
                            showModal={setShowChapModal}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*       
      </div> */}
      </div>
    </>
  );
};

export default CourseOverviewById;
//february 3 modification of ui and functionalities -gem
