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
  // const handleInputChange = (e) => {
  //   setChapters({ ...chapters, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
    setChapters({ ...chapters, [name]: capitalizedValue });
  };

  useEffect(() => {
    loadChapters();
  }, []);

  const handleSubmit = async (e) => {
 
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.put(
        `http://localhost:8080/api/v1/auth/chapter/${chapterId}`,
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
      `http://localhost:8080/api/v1/auth/chapter/${chapterId}`
    );
    setChapters(result.data);
  };

  const handleCancel = () => {
    // Implement your cancel logic here
    editTitle((prev) => !prev);
  };
  console.log(chapter_title);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[.1rem] ">
        <div className=" flex border-[.01rem] drop-shadow-2xl shadow-lg bg-[#EBFFE5] border-black rounded-lg m-auto w-[90%]  lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px] ">
          <form
            onSubmit={handleSubmit}
            className=" w-[90%] lg:w-[80%] m-auto py-2 ">
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              <p className="pb-4 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  xl:text-[24px] pt-4">
                Rename Chapter Title
              </p>
            </div>
            <input
              type="text"
              className="TeamB_input-style bg-[#BCE8B1] opacity-[50%] p-2"
              name="chapter_title"
              value={chapter_title}
              onChange={(e) => handleInputChange(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              required
            />
            <div className="flex align-middle text-center justify-end w-full pt-8">
              <div className="flex gap-x-5">
                <span
                  className=" xl:text-[24px] py-2 lg:text-[1rem]"
                  onClick={handleCancel}>
                  Cancel
                </span>

                <button
                  className="drop-shadow-md TeamB_text-shadow   w-[90px] h-[40px] rounded-[80px] lg:text-[1rem] xl:w-[114px] xl:h-[58px] xl:rounded-[100px] bg-[#126912] xl:text-[24px] text-[#FFFFFF]  font-bold"
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
