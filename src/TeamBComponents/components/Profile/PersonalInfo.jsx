/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
//january 12 2024
import axios from "axios";
import { useEffect, useState } from "react";

//import logo for profile pic
import profilePic from "../../../assets/TeamBassests/Registration.png";

import Footer from "../Footer";
import PersonalEdit from "./PersonalEdit";

const PersonalInfo = ({ intructorName }) => {
  const [instructors, setInstructors] = useState([]);

  const [instructor, setInstructor] = useState({
    instructor_first_name: "",
    instructor_last_name: "",
    instructor_contact_number: "",
    instructor_email: "",
  });

  useEffect(() => {
    const loadInstructors = async () => {
      const result = await axios.get("http://localhost:8080/api/instructors");
      setInstructors(result.data);
    };

    loadInstructors();
  }, []);

  const handleInputChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const {
    instructor_first_name,
    instructor_last_name,
    instructor_email,
    instructor_contact_number,
  } = instructor;

  //edit update personal info
  const [editPersonalInfo, setEditPersonalInfo] = useState(true);
  const [updatePersonalInfo, setUpdatePersonalInfo] = useState(false);

  const showEdit = () => {
    setEditPersonalInfo(true);
    setUpdatePersonalInfo(false);
  };

  const showUpdate = () => {
    setEditPersonalInfo(false);
    setUpdatePersonalInfo(true);
  };
  return (
    <>
      {editPersonalInfo && (
        <div className=" flex flex-col h-full gap-y-5 w-[90%] lg:h-[380px]  lg:w-[680px]  xl:h-[655px] xl:w-[948px] bg-[#BCE8B1] rounded shadow-md">
          <div className="lg:w-[95%] lg:m-auto ">
            <div className="lg:flex lg:w-[100%] relative lg:gap-x-5 h-[500px] lg:h-[350px] xl:h-[655px]">
              <div className="lg:w-[30%] flex justify-center lg:justify-start">
                <img
                  src={profilePic}
                  alt=""
                  className=" h-[150px] lg:p-2 lg:flex lg:w-[200px]  xl:w-[292px] xl:h-[239px]"
                />
              </div>
              <div className="mt-3 w-[90%] flex m-auto relative flex-col lg:w-[70%]">
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className=" text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px]  ">
                    First Name
                  </label>

                  {/* FIRSTNAME INPUT */}

                  <input
                    className="px-2 mb-4 TeamB_input-style"
                    id="firstName"
                    type="text"
                    name="instructor_first_name" //should be edited
                    value={instructor_first_name}
                    disabled
                  />
                </div>
                <div className="relative ">
                  <label
                    htmlFor="lastName"
                    className=" text-[#4D4141] text-opacity-[53%] absolute z-10 top-0 left-2 text-[.8rem] xl:text-[16px] ">
                    Last Name
                  </label>

                  {/* LASTNAME INPUT */}

                  <input
                    className="px-2 mb-4 TeamB_input-style"
                    id="lastName"
                    type="text"
                    name="instructor_last_name" //edit
                    value={instructor_last_name}
                    disabled
                  />
                  <div className="lg:flex lg:flex-col xl:gap-y-10">
                    <div className="relative">
                      <label
                        htmlFor="Email"
                        className=" text-[#4D4141] text-opacity-[53%] absolute   z-10 top-0 left-2 text-[.8rem] xl:text-[16px]">
                        Email Address
                      </label>

                      {/* EMAIL INPUT */}

                      <input
                        className="px-2 mb-4 TeamB_input-style"
                        id="Email"
                        type="number"
                        name="instructor_username" //edit
                        value={instructor_email}
                        disabled
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="Email"
                        className=" text-[#4D4141] text-opacity-[53%] absolute   z-10 top-0 left-2 text-[.8rem] xl:text-[16px]">
                        Contact Number
                      </label>
                      {/* CONTACT NUMBER INPUT */}

                      <input
                        className="px-2 mb-4 TeamB_input-style"
                        placeholder="+63"
                        type="text"
                        id="ContactNumber"
                        name="instructor_contact_number" //edit
                        value={instructor_contact_number}
                        disabled
                      />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex justify-center lg:justify-end absolute bottom-2 lg:bottom-0">
                <button
                  onClick={showUpdate}
                  className=" TeamB_btn-style  lg:w-[120px] lg:flex lg:justify-center w-[90%] xl:w-[170px] rounded-full">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {updatePersonalInfo && <PersonalEdit hideUpdatePersonalInfo={showEdit} />}
    </>
  );
};

export default PersonalInfo;

//1/19/2024
