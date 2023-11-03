import React from "react";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  const [font, setFont] = useState();
  const [idAdmin, setIdAdmin] = useState();
  const [courses, setCourses] = useState();
  const [instructor, setInstructor] = useState();
  const [lectures, setLectures] = useState();
  console.log(courses);
  return (
    <CourseContext.Provider
      value={{
        idAdmin,
        setIdAdmin,
        font,
        setFont,
        courses,
        setCourses,
        instructor,
        setInstructor,
        lectures,
        setLectures,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseState = () => {
  return useContext(CourseContext);
};

export default CourseProvider;
