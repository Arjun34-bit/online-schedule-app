import React from "react";
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
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CourseModal from "../components/CourseModal";
import Courses from "../components/Courses";
import Instructor from "../components/Instructor";
import LecturerModal from "../components/LecturerModal";
import InstructorPage from "../components/InstructorPage";
import Lecture from "../components/Lecture";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
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
        <Text>Admin Id:{id}</Text>
        <Text onClick={handleLogout}>LogOut</Text>
      </Box>
      <Box className="tab-box">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Courses</Tab>
            <Tab>Instructors</Tab>
            <Tab>Lectures</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Courses />
            </TabPanel>
            <TabPanel>
              <InstructorPage />
            </TabPanel>
            <TabPanel>
              <Lecture />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default AdminPage;
