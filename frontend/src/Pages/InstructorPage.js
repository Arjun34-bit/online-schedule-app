import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Tooltip,
  VStack,
  Text,
  useToast,
  useDisclosure,
  Container,
  Stack,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState();
  const navigate = useNavigate();

  const toast = useToast();

  const getAssinLectures = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application.json",
        },
      };

      const { data } = await axios.get(
        `/lectures/instructorsLec/${id}`,
        config
      );
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
    getAssinLectures();
  });

  const handleLogout = () => {
    navigate("/instructor");
  };

  return (
    <div className="main-div">
      <Box
        className="dashboard-header"
        width="100%"
        bgColor={"aqua"}
        height={"25"}
        marginTop={"0"}
      >
        <Text bgColor="red" fontSize="30px" padding="10px">
          LecOn
        </Text>
        <Text>Instructor Id:{id}</Text>
        <Text onClick={handleLogout}>LogOut</Text>
      </Box>
      <Box marginTop={"8px"}>
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
                <img src={lecture.image} />
                <h3></h3>
                <Box>
                  <h4>{lecture.name}</h4>
                  <h4>{lecture.level}</h4>
                  <span>{lecture.description}</span>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default InstructorPage;
