import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CourseState } from "../Context/CourseProvider";
import CourseModal from "./CourseModal";
import axios from "axios";

const Courses = () => {
  // const { courses, setCourses } = CourseState();
  const [courses, setCourses] = useState("");

  const toast = useToast();

  const getCourses = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/admin/getCourse", config);
      console.log(data);
      setCourses(data);
      console.log(courses);
    } catch (error) {
      toast({
        title: "Courses fetching error",
        status: "error",
        position: "bottom",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getCourses();
  });

  return (
    <div>
      <CourseModal getCourses={getCourses} />

      {courses ? (
        <Stack overflowY={"scroll"}>
          {courses.map((course) => (
            <Box
              marginTop={"5px"}
              display="flex"
              justifyContent="space-between"
              width="100%"
              padding="20px"
              bgColor={"blue.50"}
              border-radius="20px"
              color="black"
            >
              <img src={course.image} />
              <h3></h3>
              <Box>
                <h4>{course.name}</h4>
                <h4>{course.level}</h4>
                <span>{course.description}</span>
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};

export default Courses;
