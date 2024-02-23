/* eslint-disable react/prop-types */

//2/3/2024 junite, create AddTopic UI, completed

import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Footer from "../../Footer";
import vidUpload from "../../../../assets/TeamBassests/vidUpload.svg";
import quizLink from "../../../../assets/TeamBassests/quizLink.svg";

//import toastify react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import LinkTopicModal from "../TopicModal/LinkTopicModal";

//close icon
import { IoMdClose } from "react-icons/io";

//remove close button
const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}></i>
);

const AddTopic = ({ courseTitle }) => {
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

  let { id } = useParams();
  const handleSubmit = async (e) => {
    // Assuming your API call is successful, update the state to indicate form submission

    try {
      await axios.post(
        `http://localhost:8080/api/chapters/${id}/topics`,
        topics
      );
      // showModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if the API call fails
    }
    addToCartNotify();
  };
  console.log(topics);

  useEffect(() => {
    //  loadChapters();
    loadChapter();
  }, [id]);

  const [loadByChapter, setLoadByChapter] = useState([]);
  const loadChapter = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/chapters/${id}`
      );

      // Ensure that result.data is always an array by converting it
      const coursesArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setLoadByChapter(coursesArray);
    } catch (error) {
      console.error("Error loading chapters:", error);
    }
  };
  console.log(loadByChapter);

  //react state for link and show
  const [linkFileShow, setLinkFileShow] = useState(false);
  return (
    <>
      {/* add topic title */}
      {loadByChapter.map((chap, idx) => {
        const { chapter_title } = chap;
        return (
          <div key={idx}>
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
              <div className="w-[90%] m-auto mb-4 md:mb-5">
                <span className="text-center md:text-start text-[2rem] font-semibold ">
                  <p>{courseTitle}</p>
                </span>
                <div className="flex flex-col items-center w-full pt-3 md:pt-0 md:flex-row">
                  <span className="text-[1.5rem] pr-2 text-[#070101] text-opacity-[55%]">
                    {chapter_title}:
                  </span>
                  <input
                    required
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
                  required
                  id=""
                  cols="30"
                  rows="10"
                  name="topic_description"
                  value={topic_description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Topic Description"
                  className="bg-[#BCE8B1] TeamB_text-shadow resize-none min-w-[100%] md:h-[25vh] placeholder:font-medium placeholder:text-center placeholder:p-6
              outline-none rounded-lg placeholder:text-[#070101] placeholder:text-opacity-[55%] mt-4 md:mt-5 pl-5"
                />
              </div>
              <div className="flex w-[90%] flex-col gap-y-5 lg:gap-y-0 md:flex-row m-auto items-center justify-center md:gap-x-[1rem] md:mt-[3rem]">
                <div
                  className="relative w-[100%] h-[200px] md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex items-center
            justify-center cursor-pointer"
                  onClick={() => setLinkFileShow((prev) => !prev)}>
                  <img src={vidUpload} alt="" className="md:w-[3rem] " />
                </div>
                <div
                  className=" relative w-[100%] h-[200px] md:w-[50%]
           lg:w-[20vw] lg:h-[20vh] bg-[#126912] rounded-lg flex
           items-center justify-center cursor-pointer"
                  onClick={toggleQuizPopup}>
                  <img src={quizLink} alt="" className="md:w-[3rem] " />
                </div>
              </div>
              {/* Video Popup */}
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
                          <input
                            id="uploadLink"
                            type="file"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                    <p className="mb-4 text-lg font-semibold">Add Quiz Link</p>
                    <input
                      required
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
              <ToastContainer className="tcenter" closeButton={CloseButton} />
            </form>
          </div>
        );
      })}
    </>
  );
};

export default AddTopic;
