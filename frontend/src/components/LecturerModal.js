import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Input,
  Button,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { CourseState } from "../Context/CourseProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LecturerModal = ({ getLectures }) => {
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState();
  const [instructor, setInstructor] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { courses, setCourses } = CourseState();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLecture = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/admin/addLecture/",
        {
          courseName: title,
          instructorName: instructor,
          date: selectedDate,
        },
        config
      );
      toast({
        title: "Lecture Added",
        status: "success",
        position: "bottom",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Instructor not available on provided date",
        status: "error",
        position: "bottom",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getLectures();
  }, handleLecture);
  return (
    <>
      <Button onClick={onOpen}>Create Lecture</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Lectures</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Title</FormLabel>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Instructor Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInstructor(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="text"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </FormControl>
            {/* <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
              />
            </div> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleLecture}>
              Sumbit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LecturerModal;
