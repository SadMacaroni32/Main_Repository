/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext,  useState } from 'react'


export const CourseContext = createContext();

const CourseProvider = ({children}) => {
  //react state for course api
  const [courses, setCourses] = useState([]);

  //hide and show create new course
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        showCreateCourse,
        setShowCreateCourse,
      }}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseProvider
