import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Badge from "react-badge";

import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../Components/UserAvater/UserListItem";
import { getSender, getSenderforSidebarNoti } from "../config/Chatslogic";
import Badge from "react-bootstrap/Badge";
import ButtonB from "react-bootstrap/Button";
// import { Effect } from "react-notification-badge";
// import NotificationBadge from "react-notification-badge";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setloadingChat] = useState("");
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    endpoint,
    setNotification,
    onlineStatus,
  } = ChatState();
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    // localStorage.clear();
    history("/");
    // history("/log");
  };
  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "please Enter Somthing in search ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        // `http://localhost:5000/api/user?search=${search}`,
        `${endpoint}/api/user?search=${search}`,
        // `http://localhost:5000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setsearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  //this fxn is for: when logined uer click any person to chat with
  const accessChat = async (userId) => {
    // another  user in which the logined user wans to chat with
    try {
      setloadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${endpoint}/api/chat`,
        {
          userId,
        },
        config
      );
      console.log("ACCESS CHAT", JSON.stringify(data));
      // incase the logined user already have chats withe clicked user befor no just load thireprevious chats
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setloadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured ",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} onClose={onClose}>
            <i className="fa fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="22px" color={"red"} fontFamily="Work sans">
          {/* Talk-A-tive */}
          {user.name}
        </Text>
        <Text fontSize="2x1" color={"green"} fontFamily="Work sans">
          {/* {onlineStatus ? "online" : "offline"} */}
          {user.name ? "online" : "offline"}
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              {/* <Badge count={4}>Your content here</Badge> */}
              <BellIcon fontSize="3x1" m={1} />
              {notification.length && (
                <Badge variant="primary">{notification.length}</Badge>
              )}

              {/* <FontAwesomeIcon icon={faBell} /> */}
              {/* <ButtonB variant="primary"> */}
              <span className="visually-hidden">unread messages</span>
              {/* </ButtonB> */}
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New messages"}
              {notification.map((notif) => {
                return (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif)); //removes it from the lit of notification
                    }}
                  >
                    {console.log(
                      "the sender " +
                        `New message from ${getSenderforSidebarNoti(
                          user,
                          notif.chat.users,
                          "sidebar"
                        )}`
                    )}
                    {
                      // notif.chat.isGroupChat
                      //   ? `New Message in ${notif.chat.chatName}`
                      // :
                      `New message from ${getSenderforSidebarNoti(
                        user,
                        notif.chat.users,
                        "sidebar"
                      )}`
                    }
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                {/* <MenuItem>My Profile</MenuItem> */}
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onclose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" display="flex" pb={2}>
            Search Users
            <Button onClick={onClose}>X</Button>
          </DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
