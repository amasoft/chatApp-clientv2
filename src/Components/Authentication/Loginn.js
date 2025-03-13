import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";

function Loginn() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  var socket;
  const { setUser, endpoint, onlineStatus, setOnlineStatus } = ChatState();
  // socket = io(endpoint);
  socket = io(endpoint, {
    transports: ["websocket"],
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
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

    // try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .post(`${endpoint}/api/user/login`, { email, password }, config)
      .then((res) => {
        toast({
          title: "Login Succesfull ",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        socket.on("connected", () => {
          // setSocketConnected(true);
          setOnlineStatus(true);
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // setUser(res.data);
        setLoading(false);
        history("/chats");
      })
      .catch((err) => {
        toast({
          description: err.response.data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };
  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={submitHandler}>
            <h2 className="text-center">Login</h2>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="mb-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                size="lg"
                onChange={(e) => setpassword(e.target.value)}
                // required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              block
              //   onClick={submitHandler}
            >
              Log In
            </Button>
            <Link to={"/signup"} className="text-pink-500 hover:underline">
              Register
            </Link>
          </Form>
          <Form.Text className="mt-2">forgot password</Form.Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Text>forgot password</Form.Text>
        </Col>
      </Row>
    </Container>
  );
}

export default Loginn;
