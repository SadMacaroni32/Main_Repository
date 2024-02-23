import React from "react";

import CourseListCard from "./CourseListCard";
import Nav from "../NavBar/Nav";
import Footer from "../Footer";

const CourseList = () => {
  return (
    <div className="">
      {" "}
      {/* place the component you want to test here */}
      {/* 1/15/2024 functions buttons and routes */}
      <Nav />
      <CourseListCard />
      <Footer />
    </div>
  );
};

export default CourseList;
