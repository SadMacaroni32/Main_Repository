/* eslint-disable react/prop-types */
//2/1/2024 junite, created UI Modal for course title edit, completed
import React, { useState, useEffect } from "react";
import axios from "axios";

const ChapterModal = ({ chapterId, editTitle }) => {
  //state for topics
  const [chapters, setChapters] = useState({
    chapter_title: "",
  });

  const { chapter_title } = chapters;
  const handleInputChange = (e) => {
    setChapters({ ...chapters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadChapters();
  }, []);

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.put(
        `http://localhost:8080/api/chapters/${chapterId}`,
        chapters
      );
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
  };

  const loadChapters = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/chapters/${chapterId}`
    );
    setChapters(result.data);
  };

  const handleCancel = () => {
    // Implement your cancel logic here
    editTitle((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-[100vh] pt-[150px] pb-32 backdrop-blur-[.1rem] ">
        <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg bg-[#EBFFE5] border-black rounded-lg m-auto  lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px] ">
          <form onSubmit={handleSubmit} className="w-[80%] m-auto py-2 ">
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              <p className="pb-4 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  xl:text-[24px] pt-4">
                Rename Chapter Title
              </p>
            </div>
            <input
              type="text"
              className="TeamB_input-style bg-[#BCE8B1] opacity-[50%] uppercase p-2"
              name="chapter_title"
              value={chapter_title}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <div className="pt-8 lg:w-full lg:flex lg:justify-end">
              <div className="flex gap-x-5">
                <button
                  className="xl:text-[24px]  lg:text-[1rem]"
                  onClick={handleCancel}>
                  Cancel
                </button>

                <button
                  className="drop-shadow-md TeamB_text-shadow   lg:w-[90px] lg:h-[40px] lg:rounded-[80px] lg:text-[1rem] xl:w-[114px] xl:h-[58px] xl:rounded-[100px] bg-[#126912] xl:text-[24px] text-[#FFFFFF]  font-bold"
                  type="submit">
                  <p>Done</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChapterModal;
