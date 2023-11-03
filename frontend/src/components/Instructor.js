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

const Instructor = ({ getInstructors }) => {
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInstructor = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/admin/addInstructor/",
        {
          name: name,
          password: password,
        },
        config
      );
      toast({
        title: "Instructor Added",
        status: "success",
        position: "bottom",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Instructor account creation Failed",
        status: "error",
        position: "bottom",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getInstructors();
  }, handleInstructor);
  return (
    <>
      <Button onClick={onOpen}>Create Instructor Account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Instructor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Instructor Name or username</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Password for Instructor</FormLabel>
              <Input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleInstructor}>
              Create Instructor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Instructor;
