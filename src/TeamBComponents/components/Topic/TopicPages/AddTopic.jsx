/* eslint-disable react/prop-types */

//2/3/2024 junite, create AddTopic UI, completed

import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import Footer from "../../Footer";
import vidUpload from "../../../../assets/TeamBassests/vidUpload.svg";
import quizLink from "../../../../assets/TeamBassests/quizLink.svg";

//import toastify react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//remove close button
const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}></i>
);

const AddTopic = ({ chapterId, courseTitle, chapterTitle }) => {
  const [videoInputValue, setVideoInputValue] = useState("");
  const [quizInputValue, setQuizInputValue] = useState("");
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [isQuizPopupOpen, setQuizPopupOpen] = useState(false);

  const toggleVideoPopup = () => {
    setVideoPopupOpen(!isVideoPopupOpen);
  };

  const toggleQuizPopup = () => {
    setQuizPopupOpen(!isQuizPopupOpen);
  };

  const handleVideoInputChange = (e) => {
    setVideoInputValue(e.target.value);
  };

  const handleQuizInputChange = (e) => {
    setQuizInputValue(e.target.value);
  };

  const handleVideoDoneClick = () => {
    console.log("Video Done button clicked. Input value:", videoInputValue);
    toggleVideoPopup();
  };

  const handleQuizDoneClick = () => {
    console.log("Quiz Done button clicked. Input value:", quizInputValue);
    toggleQuizPopup();
  };

  const handleVideoCancelClick = () => {
    setVideoInputValue("");
    console.log("Video Cancel button clicked");
    toggleVideoPopup();
  };

  const handleQuizCancelClick = () => {
    setQuizInputValue("");
    console.log("Quiz Cancel button clicked");
    toggleQuizPopup();
  };

  //toast
  const addToCartNotify = () => {
    toast.success("Topic, Successfully Created!", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      closeButton: CloseButton,
    });
  };

  //state for topics
  const [topics, setTopics] = useState({
    topic_title: "",
    topic_description: "",
    topic_file: "",
    topic_link: "",
  });

  const { topic_title, topic_description, topic_file, topic_link } = topics;
  const handleInputChange = (e) => {
    setTopics({ ...topics, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.post(
        `http://localhost:8080/api/chapters/${chapterId}/topics`,
        topics
      );
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
    addToCartNotify();
  };

  return (
    <>
      {/* add topic title */}
      <form onSubmit={handleSubmit} className="h-[100vh] w-[100%] pt-2">
        <div className="flex items-center justify-end w-full ">
          <button
            type="submit"
            className="flex items-center gap-2 pr-5 cursor-pointer">
            <div className="text-[#4c604c] text-[1.5rem]">
              <FaSave />
            </div>
            <span className="text-[#126912] font-semibold">Save</span>
          </button>
        </div>
        <div className="w-[90%] m-auto mb-5">
          <span className="lg:text-[2rem] 2xl:text-[48px] font-semibold ">
            <p>{courseTitle}</p>
          </span>
          <div className="flex items-center ">
            <span className="lg:text-[1.5rem] 2xl:text-[36px] pr-2 text-[#070101] text-opacity-[55%]">
              {chapterTitle}:
            </span>
            <input
              required
              type="text"
              name="topic_title"
              value={topic_title}
              onChange={(e) => handleInputChange(e)}
              id=""
              placeholder="Topic Title"
              className="bg-[#BCE8B1] rounded-lg placeholder:text-[#626262] placeholder:pl-2 outline-none pl-2"
            />
          </div>
          <textarea
            required
            id=""
            cols="30"
            rows="10"
            name="topic_description"
            value={topic_description}
            onChange={(e) => handleInputChange(e)}
            placeholder="Topic Description"
            className="bg-[#BCE8B1] TeamB_text-shadow resize-none lg:min-w-[100%] 2xl:h-[264px] 2xl:max-w-[1342px] lg:h-[25vh] placeholder:font-medium placeholder:text-center placeholder:p-6
              outline-none rounded-lg placeholder:text-[#070101] placeholder:text-opacity-[55%] mt-5 pl-5"
          />
        </div>
        <div className="flex w-[90%] m-auto items-center justify-center lg:gap-x-[5rem] lg:mt-[3rem]">
          <div
            className="relative 2xl:w-[491px] 2xl:h-[282px]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex items-center
            justify-center cursor-pointer"
            onClick={toggleVideoPopup}>
            <img
              src={vidUpload}
              alt=""
              className="lg:w-[3rem] 2xl:w-[84px] 2xl:h-[87px]"
            />
          </div>
          <div
            className=" relative 2xl:w-[491px] 2xl:h-[282px]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex
           items-center justify-center cursor-pointer"
            onClick={toggleQuizPopup}>
            <img
              src={quizLink}
              alt=""
              className="lg:w-[3rem] 2xl:w-[84px] 2xl:h-[87px]"
            />
          </div>
        </div>
        {/* Video Popup */}
        {isVideoPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#EBFFE5] p-8 rounded-lg z-10">
              <p className="mb-4 text-lg font-semibold">Add Topic Link</p>
              <input
                required
                type="text"
                name="topic_file"
                value={topic_file}
                onChange={(e) => handleInputChange(e)}
                className="w-[724px] bg-[#BCE8B1] p-2 border border-gray-300 rounded-md mb-4"
                placeholder="https://www"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleVideoCancelClick}
                  className="px-4 py-2 text-black rounded-md">
                  Cancel
                </button>
                <button
                  onClick={handleVideoDoneClick}
                  className="bg-[#126912] text-white py-2 px-4 rounded-full ml-2">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Quiz Popup */}
        {isQuizPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#EBFFE5] p-8 rounded-lg z-10">
              <p className="mb-4 text-lg font-semibold">Add Quiz Link</p>
              <input
                required
                type="text"
                name="topic_link"
                value={topic_link}
                onChange={(e) => handleInputChange(e)}
                className="w-[724px] bg-[#BCE8B1] p-2 border border-gray-300 rounded-md mb-4"
                placeholder="https://www"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleQuizCancelClick}
                  className="px-4 py-2 text-black rounded">
                  Cancel
                </button>
                <button
                  onClick={handleQuizDoneClick}
                  className="bg-[#126912] text-white py-2 px-4 rounded-full ml-2">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer className="tcenter" closeButton={CloseButton} />
        <div className="">
          <Footer />
        </div>
      </form>
    </>
  );
};

export default AddTopic;
