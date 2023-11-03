import React, { useEffect } from "react";
import Instructor from "./Instructor";
import { Box, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { CourseState } from "../Context/CourseProvider";

const InstructorPage = () => {
  const { instructor, setInstructor } = CourseState();

  const toast = useToast();

  const getInstructors = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/instructor/getInstructors", config);
      setInstructor(data);
    } catch (error) {
      toast({
        title: "Instructors fetching error",
        status: "error",
        position: "bottom",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);
  return (
    <div>
      <Instructor getInstructors={getInstructors} />
      {instructor ? (
        <Stack overflowY={"scroll"}>
          {instructor.map((inst) => (
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
              <h3>{inst._id}</h3>

              <h4>{inst.name}</h4>
            </Box>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};

export default InstructorPage;
