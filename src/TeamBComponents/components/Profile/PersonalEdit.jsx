/* eslint-disable react/prop-types */

/* eslint-disable react/no-unknown-property */
// January 12, 2024
import axios from "axios";
import { useEffect, useState } from "react";

// Import logo for profile pic
import profilePic from "../../../assets/TeamBassests/Registration.png";
import signature from "../../../assets/TeamBassests/signature.png";
const PersonalEdit = ({ hideUpdatePersonalInfo }) => {
  const [instructors, setInstructors] = useState([]);

  const [instructor, setInstructor] = useState({
    instructor_first_name: "",
    instructor_last_name: "",
    instructor_contact_number: "",
    instructor_email: "",
  });

  useEffect(() => {
    const loadInstructors = async () => {
      const result = await axios.get("http://localhost:8080/instructors");
      setInstructors(result.data);
    };

    loadInstructors();
  }, []);

  const handleInputChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate contact number
    if (instructor.instructor_contact_number.length !== 10) {
      // Show an error message or handle the invalid input as per your requirement
      alert("Contact number must be exactly 10 digits.");
      return; // Stop the submission process
    }

    await axios.post("http://localhost:8080/instructor", instructor);
  };

  console.log(instructors);
  const {
    instructor_first_name,
    instructor_last_name,
    instructor_email,
    instructor_contact_number,
  } = instructor;

  // React hook for tooltip
  const [showTooltipFirstName, setShowTooltipFirstName] = useState(false);
  const [showTooltipLastName, setShowTooltipLastName] = useState(false);
  const [showTooltipContactNo, setShowTooltipContactNo] = useState(false);
  const [showTooltipUploadSignature, setShowTooltipUploadSignature] =
    useState(false);

  // Set React hook for all text fields
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorContactNo, setErrorContactNo] = useState(false);

  return (
    <>
      <form
        autoComplete="off"
        required
        onSubmit={(e) => handleSubmit(e)}
        className="static bottom-[-.3rem] flex flex-col h-full gap-y-5 w-[90%] lg:h-[450px] lg:w-[680px] xl:h-[655px] xl:w-[948px] bg-[#BCE8B1] rounded shadow-md">
        <div className="lg:w-[90%] lg:m-auto">
          <div className="lg:flex lg:w-[100%] lg:gap-x-5">
            {/* IMAGE */}
            <div className="lg:w-[30%] ">
              <label htmlFor="uploadProfile">
                <img
                  src={profilePic}
                  alt=""
                  className="cursor-pointer pb-4 hidden lg:flex lg:w-[200px] lg:h-[150px] xl:w-[292px] xl:h-[239px]"
                />
              </label>
              <input id="uploadSignature" type="file" className="hidden" />
              <label htmlFor="uploadPSignature">
                <img
                  src={signature}
                  alt=""
                  className="cursor-pointer pb-4 hidden lg:flex lg:w-[200px] lg:h-[150px] xl:w-[292px] xl:h-[239px]"
                />
              </label>
              <input id="uploadSignature" type="file" className="hidden" />
            </div>
            {/* FORM */}
            <div className="mt-3 relative lg:flex lg:flex-col lg:w-[70%] xl:gap-y-10 lg:gap-y-7">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className={`${
                    showTooltipLastName
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]"
                  }`}>
                  First Name <span className="text-[#FF2626]">*</span>
                </label>
                {/* FIRSTNAME INPUT */}
                <input
                  className={`${
                    showTooltipLastName
                      ? "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5] blur-[.1rem]"
                      : "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  }`}
                  id="firstName"
                  type="text"
                  name="instructor_first_name"
                  value={instructor_first_name}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={50}
                  required={true}
                  onError={errorFirstName}
                  onKeyPress={(e) => {
                    // Allow only alphabets and some special characters like space
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipFirstName(true)}
                  onMouseLeave={() => setShowTooltipFirstName(false)}
                />
                {showTooltipFirstName && (
                  <div className="absolute top-[-3.5rem] left-10 bg-[#fff] w-[60%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Maximum of 50 letters, only alphabets and spaces are
                      allowed.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]">
                  Last Name <span className="text-[#FF2626]">*</span>
                </label>
                {/* LASTNAME INPUT */}
                <input
                  className="relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  id="lastName"
                  type="text"
                  name="instructor_last_name"
                  value={instructor_last_name}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={50}
                  required={true}
                  onError={errorLastName}
                  onKeyPress={(e) => {
                    // Allow only alphabets and some special characters like space
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipLastName(true)}
                  onMouseLeave={() => setShowTooltipLastName(false)}
                />
                {showTooltipLastName && (
                  <div className="absolute top-[-3.5rem] 2xl:top-[-2.5rem] left-10 bg-[#fff] w-[60%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Maximum of 50 letters, only alphabets and spaces are
                      allowed.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="Email"
                  className={`${
                    showTooltipContactNo
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]"
                  }`}>
                  Email Address
                </label>
                {/* EMAIL INPUT */}
                <input
                  className="px-2 TeamB_input-style"
                  disabled
                  id="Email"
                  type="number"
                  name="instructor_username"
                  value={instructor_email}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="ContactNumber"
                  className={`${
                    showTooltipUploadSignature
                      ? "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px] blur-lg"
                      : "text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]"
                  }`}>
                  Contact Number <span className="text-[#FF2626]">*</span>
                </label>
                {/* CONTACT NUMBER INPUT */}
                <input
                  className={`${
                    showTooltipUploadSignature
                      ? "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5] blur-[.1rem]"
                      : "relative TeamB_input-style px-2 lg:w-full bg-[#EBFFE5]"
                  }`}
                  placeholder="+63"
                  type="text"
                  id="ContactNumber"
                  name="instructor_contact_number"
                  value={instructor_contact_number}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={10}
                  required={true}
                  onError={errorContactNo}
                  onKeyPress={(e) => {
                    // Allow only numeric input
                    const isNumeric = /^[0-9\b]+$/;
                    if (!isNumeric.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onMouseOver={() => setShowTooltipContactNo(true)}
                  onMouseLeave={() => setShowTooltipContactNo(false)}
                />
                {showTooltipContactNo && (
                  <div className="absolute top-[-3.5rem] left-10 bg-[#fff] w-[45%] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                    <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                      Must not exceed 10 digits.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative lg:w-[100%] pt-9 lg:flex lg:justify-end items-center">
            {/* UPLOAD SIGNATURE */}
            <input id="uploadSignature" type="file" className="hidden" />
            <label
              htmlFor="uploadSignature"
              className="cursor-pointer mr-auto lg:w-[130px] xl:ml-3 text-center font-bold lg:h-[30px] xl:w-[159px] xl:h-[36px] bg-[#D1DFCD] lg:text-[.8rem] 2xl:text-[16px] lg:rounded-lg 2xl:rounder-[5px] text-[#4D4141] text-opacity-[53%] shadow-lg flex justify-center items-center"
              onMouseOver={() => setShowTooltipUploadSignature(true)}
              onMouseLeave={() => setShowTooltipUploadSignature(false)}>
              Choose File
            </label>
            {showTooltipUploadSignature && (
              <div className="absolute w-[40%] left-10 bg-[#fff] top-[-3rem] p-1 rounded-lg border-[1px] border-[#EBFFE5]">
                <p className="text-[.8rem] text-[#4D4141] text-opacity-[53%]">
                  Upload Signature, no background and must be in svg or webp
                  file format.
                </p>
              </div>
            )}
            {/* UPDATE BUTTON */}
            <div className="flex gap-x-5">
              <span
                className="xl:text-[24px] lg:text-[1rem] font-medium flex justify-center items-center cursor-pointer"
                onClick={hideUpdatePersonalInfo}>
                Cancel
              </span>
              <button
                type="submit"
                className="w-full TeamB_btn-style lg:w-[120px] lg:flex lg:justify-center xl:w-[170px] rounded-full">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalEdit;
