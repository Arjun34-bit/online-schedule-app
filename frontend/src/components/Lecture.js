import React, { useEffect } from "react";
import LecturerModal from "./LecturerModal";
import { Box, Stack, useToast } from "@chakra-ui/react";
import { CourseState } from "../Context/CourseProvider";
import axios from "axios";

const Lecture = () => {
  const { lectures, setLectures } = CourseState();

  const toast = useToast();

  const getLectures = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/lectures/", config);
      setLectures(data);
    } catch (error) {
      toast({
        title: "Lectures fetching error",
        status: "error",
        position: "bottom",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getLectures();
  }, []);
  return (
    <div>
      <LecturerModal getLectures={getLectures} />
      {lectures ? (
        <Stack overflowY="scroll">
          {lectures.map((lecture) => (
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
              <h3>{lecture.courseId}</h3>

              <h4>{lecture.instructorId}</h4>
              <h4>{lecture.date}</h4>
            </Box>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};

export default Lecture;
