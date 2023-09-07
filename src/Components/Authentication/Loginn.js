import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";

function Loginn() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  const { setUser, endpoint } = ChatState();

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
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                // required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              block
              //   onClick={submitHandler}
            >
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Loginn;
