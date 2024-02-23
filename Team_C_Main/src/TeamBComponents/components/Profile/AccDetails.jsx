import Footer from "../Footer"; // Importing footer component
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

const AccDetails = () => {
  //Function component declaration
  return (
    <>
      {/* 1/11/2024 Created Account Details UI Ouline */}
      {/* Note: Change UI according to UI Designed */}

      <div className="flex items-center flex-col h-full gap-y-5 w-[90%]  lg:h-[320px]  lg:min-w-[680px]   bg-[#BCE8B1] lg:rounded-b-md rounded shadow-md">
        {" "}
        {/* Container div */}
        <div className="w-[90%] lg:max-w-[600px] gap-y-3  flex flex-col items-center py-3 lg:mt-10  lg:gap-y-[2rem] ">
          {" "}
          {/* Nested div */}
          {/* Email section */}
          <p className="relative w-[100%] lg:w-[600px] rounded-md p-2 lg:h-[50px]  bg-[#D1DFCD] text-[.8rem]  lg:rounded-lg  text-[#4D4141] text-opacity-[53%] shadow-lg  flex items-center pl-2 ">
            {" "}
            {/* Paragraph element */}
            <span className="lg:absolute lg:top-1 ">Email</span>{" "}
            {/* Span element */}
          </p>
          {/* Username section */}
          <p className="relative w-[100%] rounded-md lg:w-[600px] p-2 lg:h-[50px]  bg-[#D1DFCD] text-[.8rem]  lg:rounded-lg  text-[#4D4141] text-opacity-[53%] shadow-lg  flex items-center pl-2 ">
            {" "}
            {/* Paragraph element */}
            <span className="lg:absolute lg:top-1 ">Username</span>{" "}
            {/* Span element */}
          </p>
          {/* Change Password section */}
          <p className="cursor-pointer p-1 rounded-md mr-auto lg:w-[130px]  text-center lg:h-[30px] font-medium lg:font-semibold    bg-[#D1DFCD] text-[.8rem]  lg:rounded-lg  text-[#4D4141] text-opacity-[53%] shadow-lg  flex justify-center items-center  ">
            {" "}
            {/* Paragraph element */}
            <Link to="/change">
              {" "}
              {/* Link component */}
              <span className="">Change Password</span> {/* Span element */}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AccDetails; // Exporting AccDetails component
//1/19/2024
//comments by: Judes 02-19-24
