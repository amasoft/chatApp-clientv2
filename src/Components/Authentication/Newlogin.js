import React from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

function Newlogin() {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <VStack spacing={4} width="300px">
          <Heading size="lg">Login</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Enter your username" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button colorScheme="teal" onClick={() => alert("Login clicked")}>
            Login
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Newlogin;
