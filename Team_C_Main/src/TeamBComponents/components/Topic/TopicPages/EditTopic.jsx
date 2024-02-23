/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

//2/3/2024 junite, create EditTopic UI, completed

import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Footer from "../../Footer";
import EditTopiclink from "../../../../assets/TeamBassests/EditTopicLink.svg";
import EditQuizLink from "../../../../assets/TeamBassests/EditQuizLink.svg";

//import toastify react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { IoEyeSharp } from "react-icons/io5";
//import close button icon
import { IoMdClose } from "react-icons/io";
import LinkTopicModal from "../TopicModal/LinkTopicModal";
const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}></i>
);

const EditTopic = ({ topicId, courseTitle, chapterTitle }) => {
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
    toast.success("Topic, Successfully Saved!", {
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

  useEffect(() => {
    loadTopics();
  }, []);

  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.put(`http://localhost:8080/api/topics/${topicId}`, topics);
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
    addToCartNotify();
  };

  const loadTopics = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/topics/${topicId}`
    );
    setTopics(result.data);
  };

  //store url in a variable
  // const docs = [
  //   {
  //     uri: "https://rb.gy/wjgxf3",
  //     fileType: "pptx",
  //   }, // Remote file
  //   // { uri: require("./example-files/pdf.pdf") }, // Local File
  // ];

  // const linkToPPTFile =
  //   "https://onedrive.live.com/embed?resid=45112E029C22DBF%21345&authkey=!APHTfuIo5T7hg4w&em=2";

  const [showEmbedded, setShowEmbedded] = useState(false);
  //react state for link and show
  const [linkFileShow, setLinkFileShow] = useState(false);
  return (
    <>
      {/* add topic title */}
      <form
        onSubmit={handleSubmit}
        className="h-[100vh] w-[100%]  relative pt-2">
        <div className="flex items-center justify-end w-full ">
          <button
            type="submit"
            className="flex items-center gap-2 pr-5 cursor-pointer"
            onClick={() => addToCartNotify()}>
            <div className="text-[#4c604c] text-[1.5rem]">
              <FaSave />
            </div>
            <span className="text-[#126912] font-semibold">Save</span>
          </button>
        </div>
        <div className="w-[90%] m-auto mb-4 md:mb-5">
          <span className="text-center md:text-start text-[2rem]  font-semibold  ">
            {courseTitle}
          </span>
          <div className="flex flex-col items-center w-full pt-3 md:pt-0 md:flex-row">
            <span className="text-[1.5rem]  pr-2 text-[#070101] text-opacity-[55%]">
              {chapterTitle}:
            </span>
            <input
              type="text"
              name="topic_title"
              value={topic_title}
              onChange={(e) => handleInputChange(e)}
              id=""
              placeholder="Topic Title"
              className="bg-[#BCE8B1] rounded-lg placeholder:text-[#626262] placeholder:pl-2 outline-none pl-2 w-[90%] md:w-[40%]"
            />
          </div>
          <textarea
            id=""
            cols="30"
            rows="10"
            value={topic_description}
            name="topic_description"
            onChange={(e) => handleInputChange(e)}
            placeholder="Topic Description"
            className="bg-[#BCE8B1] TeamB_text-shadow resize-none min-w-[100%] md:h-[25vh] placeholder:font-medium placeholder:telt-center placeholder:p-6
              outline-none rounded-lg placeholder:text-[#070101] placeholder:text-opacity-[55%] mt-4 md:mt-5 pl-5"
          />
        </div>

        <div className="flex w-[90%] flex-col gap-y-5 lg:gap-y-0 md:flex-row m-auto items-center justify-center md:gap-x-[1rem] md:mt-[3rem]">
          <div
            className="relative w-[100%] h-[200px] md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#fff] rounded-lg flex items-center
            justify-center cursor-pointer">
            {/* <img src={EditTopiclink} alt="" className="" /> */}
            <iframe
              src={topic_file}
              frameborder="0"
              scrolling="no"
              className="blur-[.05rem] h-[200px] md:w-full  hidden md:flex"></iframe>

            <div className="absolute flex gap-x-5">
              <span className="" onClick={toggleVideoPopup}>
                <FaEdit className="w-[30px] h-[30px] lg:w-[30px] lg:h-[30px] " />
              </span>
              <span
                className=""
                onClick={() => setShowEmbedded((prev) => !prev)}>
                <IoEyeSharp className="w-[30px] h-[30px] lg:w-[30px] lg:h-[30px]  " />
              </span>
            </div>
          </div>

          <div
            className=" relative w-[100%] h-[200px]  md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#fff] rounded-lg flex
           items-center justify-center cursor-pointer"
            onClick={toggleQuizPopup}>
            <iframe
              src={topic_file}
              frameborder="0"
              scrolling="no"
              className="blur-[.05rem] h-[200px]  hidden lg:flex"></iframe>
            <span className="absolute ">
              <FaEdit className="w-[30px] h-[30px] lg:w-[30px] lg:h-[30px]  opacity-[80%]" />
            </span>
          </div>
        </div>

        {linkFileShow && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#EBFFE5] rounded-lg z-10 ">
              <div className="relative px-4 py-4">
                <div className="absolute right-[-.5rem] top-[-.5rem] w-[30px] h-[30px] rounded-full TeamB_text-shadow drop-shadow-lg shadow-lg bg-red-500 flex items-center justify-center">
                  <button
                    onClick={() => setLinkFileShow((prev) => !prev)}
                    className="text-white ">
                    <IoMdClose />
                  </button>
                </div>
                <div className="flex items-center justify-between w-[14rem] ">
                  <div
                    className="rounded-lg shadow-lg cursor-pointer drop-shadow-lg"
                    onClick={toggleVideoPopup}>
                    <p className="px-2 py-2 text-white bg-blue-600 rounded-lg TeamB_text-shadow">
                      Upload Link
                    </p>
                  </div>
                  <div className="rounded-lg shadow-lg drop-shadow-lg">
                    <label
                      htmlFor="uploadLink"
                      className="bg-[#BCE8B1] cursor-pointer text-black px-2 py-2 rounded-lg  TeamB_text-shadow ">
                      Upload File
                    </label>
                    <input id="uploadLink" type="file" className="hidden" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Video Popup */}
        {isVideoPopupOpen && (
          <LinkTopicModal
            topic_file={topic_file}
            handleInputChange={handleInputChange}
            handleVideoCancelClick={handleVideoCancelClick}
            handleVideoDoneClick={handleVideoDoneClick}
          />
        )}
        {/* Quiz Popup */}
        {isQuizPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#EBFFE5] p-8 rounded-lg z-10 w-[90%] md:w-[80%]">
              <p className="mb-4 text-lg font-semibold">Edit Quiz Link</p>
              <input
                type="text"
                name="topic_link"
                value={topic_link}
                onChange={(e) => handleInputChange(e)}
                className="w-full bg-[#BCE8B1] p-2 border border-gray-300 rounded-md mb-4"
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

        {showEmbedded && (
          <div className="absolute top-0 z-10 w-[100%] h-full flex justify-center items-center backdrop-blur-[.3rem]">
            <div className="w-[90%] h-[50vh] lg:w-[750px] lg:h-[520px] bg-[#BCE8B1] flex flex-col justify-center items-center  rounded-lg">
              <div
                className="flex justify-end w-full pb-3 pr-2 cursor-pointer"
                onClick={() => setShowEmbedded(false)}>
                <IoMdClose className="text-[1.5rem]" />
              </div>
              <iframe
                src={topic_file}
                frameborder="0"
                scrolling="no"
                className="blur-[.01rem] w-[90%] h-[80%] md:w-[500px] md:h-[350px] lg:w-[680px] lg:h-[450px] rounded-lg"></iframe>
            </div>
          </div>
        )}
        <ToastContainer className="tcenter" closeButton={CloseButton} />
      </form>
    </>
  );
};

export default EditTopic;
