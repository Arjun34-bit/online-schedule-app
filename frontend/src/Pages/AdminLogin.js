import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [displayButton, setDisplayButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const handleButton = () => {
    if (adminId && password) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  const handleAuthentic = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/admin/",
        { username: adminId, password: password },
        config
      );
      setResult(data);
      console.log(result);
      navigate(`/dashboard/${data.username}`);
    } catch (error) {
      toast({
        title: "Authentication Failed",
        status: "error",
        position: "bottom",
        isClosable: true,
      });
    }
  };

  return (
    <div className="login-box">
      <VStack spacing="5px" fontFamily={"work sans"}>
        <Box
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="0.5px"
          padding="40px"
        >
          <FormControl id="adminId" isRequired>
            <FormLabel>Admin Id :</FormLabel>
            <Input
              placeholder="ID......"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            ></Input>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password :</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="Password....."
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleButton();
                }}
              ></Input>
            </InputGroup>
          </FormControl>

          {displayButton ? (
            <Button
              className={displayButton ? "animate" : ""}
              fontWeight={"bold"}
              color={"black"}
              colorScheme="red"
              width={"100%"}
              style={{ marginTop: 15 }}
              onClick={handleAuthentic}
              osLoading={loading}
            >
              Authenticate
            </Button>
          ) : (
            ""
          )}
        </Box>
      </VStack>
    </div>
  );
};

export default AdminLogin;
