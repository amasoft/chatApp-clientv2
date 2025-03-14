import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState(false);
  const [pic, setpic] = useState();
  const toast = useToast();
  const history = useNavigate();
  const [loading, setLoading] = useState();
  const handleClick = () => setShow(!show);
  const handleconfirmClick = () => setshowconfirm(!showconfirm);
  const { setUser, endpoint } = ChatState();

  const postDeatils = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an Imag",
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
      data.append("upload_preset", "chat-app");
      //   data.append("cloud_name", "dysiejkoy");
      fetch("https://api.cloudinary.com/v1_1/dysiejkoy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log("working");
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "please select an Imag",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("data sent ");
    setLoading(true);
    // if (!name || !email || !password || !confirmPassword) {
    if (!name || !password || !confirmPassword) {
      toast({
        title: "please Fill all the field ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do not match ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    // try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .post(`${endpoint}/api/user/`, { name, email, password, pic }, config)
      .then((res) => {
        toast({
          title: "Registration Succesfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // localStorage.setItem("user", JSON.stringify(res)); before
        localStorage.setItem("userInfo", JSON.stringify(res));
        console.log("data", res);
        history("/chats");

        //   history.push("/chats");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error ", error);

        toast({
          title: error.response.data.messgae,
          // description: error.response.data.messgae,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      });
    // }
    // catch (error) {
    // //   toast({
    // //     title: "Error Occured",
    // //     description: error,
    // //     status: "warning",
    // //     duration: 5000,
    // //     isClosable: true,
    // //     position: "bottom",
    // //   });
    // //   setLoading(false);
    // // }
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Comfirm password</FormLabel>
        <InputGroup>
          <Input
            type={showconfirm ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleconfirmClick}>
              {showconfirm ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDeatils(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUP
      </Button>
    </VStack>
  );
};

export default Signup;
