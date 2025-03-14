import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getLastMessage, getSender, getSender_pic } from "../config/Chatslogic";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./GroupChatModel";

// const MyChat = ({ fetchAgain }) => {
const MyChat = () => {
  const [loggedUser, setloggedUser] = useState();
  const [display, setDisplay] = useState(false);
  const {
    SelectedChat,
    setSelectedChat,
    chats,
    user,
    setChats,
    set,
    endpoint,
    refreshChatList,
    setrefreshChatList,
    fetchAgain,
  } = ChatState();
  // console.log("from MyChat" + fetchAgain);
  // console.log("CHATTS>>>>", JSON.stringify(chats));
  const toast = useToast();
  const fetchChats = async () => {
    try {
      // setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      // const { data } = await axios.get(`localhost:3000/api/chat`, config);
      const { data } = await axios.get(`${endpoint}/api/chat`, config);
      setChats(data);
    } catch (error) {
      // toast({
      //   title: "Error Occured ",
      //   description: "Failed to load the chats results",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };
  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]); // so if there is any
  // const inf = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("loggedUser");
  // console.log(loggedUser);
  //refresh the chats
  useEffect(() => {
    console.log("arinze refreshChatList useeft>>>" + "  " + refreshChatList);
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    setrefreshChatList(false);
    // return () => {
    //   // Cleanup code
    //   setrefreshChatList(!refreshChatList);
    // };
  }, [refreshChatList]);
  return (
    <Box
      // display={{ base: setSelectedChat ? "none" : "flex", md: "flex" }}
      display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My chats
        <GroupChatModel>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New group chat
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map(
              (chatt, id) => (
                <Box
                  onClick={() => setSelectedChat(chatt)}
                  cursor="pointer"
                  bg={SelectedChat === chatt ? "#38B2AC" : "#E8E8E8"}
                  // bg={SelectedChat === chat ? "red" : "#E8E8E8"}
                  color={SelectedChat === chatt ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chatt._id}
                >
                  {/* <Text>
                    {!chatt.isGroupChat
                      ? getSender(loggedUser, chatt.users, "my chart")
                      : chatt.chatName}
                  </Text>
                  <Text>
                    {/* {chatt.latestMessage ? chatt.latestMessage.content : ""} */}
                  {/* {chatt.latestMessage ? getLastMessage(chatt) : ""} */}
                  {/* </Text> */}
                  {/* } */}
                  <Flex>
                    {/* <Avatar src="https://bit.ly/sage-adebayo" /> */}

                    <Avatar
                      src={
                        !chatt.isGroupChat
                          ? getSender_pic(loggedUser, chatt.users, "my chart")
                          : ""
                      }
                    />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {!chatt.isGroupChat
                          ? getSender(loggedUser, chatt.users, "my chart")
                          : chatt.chatName}{" "}
                        <Badge ml="1" colorScheme="green">
                          New
                        </Badge>
                      </Text>
                      <Text fontSize="sm">
                        {chatt.latestMessage ? getLastMessage(chatt) : ""}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
              // console.log("CHATS", chatt.latestMessage.chat ? !chat.isGroupChat :"")
              // if (chatt.latestMessage) {
              //   // console.log("CHATS", JSON.stringify(chatt));
              //   console.log("CHATS", JSON.stringify(chatt));
              //   console.log("CHATS", chatt.latestMessage.content);
              // } else {
              // }

              // console.log("CHATS", chatt.content)
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
        {chats.length <= 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            NO CHATS
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
