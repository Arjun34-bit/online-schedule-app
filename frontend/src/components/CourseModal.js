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

const CourseModal = ({ getCourses }) => {
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [level, setLevel] = useState();
  const [pic, setPic] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { courses, setCourses } = CourseState();
  const toast = useToast();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "cell-app");
      data.append("cloud_name", "cell-chat-app");
      fetch("https://api.cloudinary.com/v1_1/cell-chat-app/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select (JPEG or PNG) Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleCourse = async () => {
    console.log("hello");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/admin/addCourse/",
        {
          name: title,
          level: level,
          description: description,
          image: pic,
        },
        config
      );
      setCourses([...courses], data);
      toast({
        title: "Course Added",
        status: "success",
        position: "bottom",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Course creation Failed",
        status: "error",
        position: "bottom",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getCourses();
  }, handleCourse);
  return (
    <>
      <Button onClick={onOpen}>Add Course</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Courses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Title</FormLabel>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Level</FormLabel>
              <Input type="text" onChange={(e) => setLevel(e.target.value)} />
            </FormControl>

            <FormControl id="pic">
              <FormLabel>Upload Profile Pic</FormLabel>
              <Input
                type="file"
                p={"1.5"}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              ></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleCourse}>
              Add Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseModal;
