/* eslint-disable react/prop-types */
//2/1/2024 junite, created UI Modal for course title edit, completed
//2/22024 junite, centered modal
import axios from "axios";
import React, { useEffect, useState } from "react";

const CourseTitleModal = ({ courseId, editTitle }) => {
  //state for topics
  const [courses, setCourses] = useState({
    course_title: "",
  });

  const { course_title } = courses;
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
    editTitle(prev => !prev)
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] pt-[11.8rem]  2xl:pt-[20rem] backdrop-blur-[.1rem]">
        <div className="  flex m-auto w-[100%]  border-[.01rem] drop-shadow-2xl shadow-lg border-black rounded-lg bg-[#EBFFE5] lg:max-w-[550px] 2xl:max-h-[672px] 2xl:max-w-[724px] ">
          <form onSubmit={handleSubmit} className="w-[80%] m-auto py-2 ">
            <div className="flex items-center py-1 text-black lg:font-bold lg:text-3xl lg:py-0">
              <p className=" pb-5 lg:font-bold TeamB_text-shadow lg:text-[1.2rem]  xl:text-[24px] mt-5">
                Rename Course Title
              </p>
            </div>
            <input
              type="text"
              className="TeamB_input-style bg-[#BCE8B1] opacity-[50%] uppercase p-2"
              required
              name="course_title"
              value={course_title}
              onChange={(e) => handleInputChange(e)}
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

export default CourseTitleModal;
