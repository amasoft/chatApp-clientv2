// import React, { useEffect, useState } from "react";
// import { Box, Text } from "@chakra-ui/layout";
// import { IconButton } from "@chakra-ui/button";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import { ChatState } from "../Context/ChatProvider";
// import {
//   getSender,
//   getSender_singleChat,
//   getSenderFull,
// } from "../config/Chatslogic";
// import ProfileModel from "../Miselinouss/ProfileModel";
// import UpdateGroupChatModal from "../Miselinouss/UpdateGroupChatModal";
// import { FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
// import Badge from "react-bootstrap/Badge";
// import axios from "axios";
// import "./styles.css";
// import ScrollableChat from "./ScrollableChat";
// import io from "socket.io-client";

// // import animationData from "../animation/typing.json";
// // const ENDPOINT = "http://localhost:5000";
// // const ENDPOINT = "http://localhost:5000";
// var socket, selectedChatCompare;
// // const SingleChat = ({ fetchAgain, setFetchAgain }) => {
// const SingleChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessages, setnewMessages] = useState();
//   const [isMessageDelivered, setisMessageDelivered] = useState(false);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const {
//     user,
//     SelectedChat,
//     setSelectedChat,
//     notification,
//     setNotification,
//     onlineStatus,
//     setOnlineStatus,
//     endpoint,
//     setFetchAgain,
//   } = ChatState();
//   const [typing, setTyping] = useState(false);
//   const [isTyping, setisTyping] = useState(false);
//   // const defaultOptions = {
//   //   loop: true,
//   //   autoplay: true,
//   //   animationData: animationData,
//   //   rendererSetting: {
//   //     PreserveAspectRatio: "xMidYMid slice",
//   //   },
//   // };
//   const toast = useToast();
//   const display = (tag, message) => {
//     console.log(tag, message);
//   };
//   const refreshMessages = async () => {
//     // display("refresh", id);
//     console.log("SelectedChat._id", SelectedChat?._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get(
//         `${endpoint}/api/message/${SelectedChat?._id}`,
//         // `${endpoint}/api/message/${SelectedChat._id}`,
//         config
//       );
//       // console.log("fetched Messages", data);
//       setMessages(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured ",
//         description: "failed to load Messsages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };
//   useEffect(() => {});
//   const fetchMessages = async () => {
//     if (!SelectedChat) return;
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       setLoading(true);

//       const { data } = await axios.get(
//         // `http://localhost:5000/api/message/${SelectedChat._id}`,
//         `${endpoint}/api/message/${SelectedChat._id}`,
//         config
//       );
//       console.log("fetched Messages", data);
//       setMessages(data);
//       setLoading(false);
//       socket.emit("join chat", SelectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured ",
//         description: "failed to load Messsages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   //connection to socket
//   useEffect(() => {
//     // socket = io(ENDPOINT);
//     socket = io(endpoint);
//     socket.emit("setup", user);
//     // socket.on("connected", () => setSocketConnected(true));
//     socket.on("connected", () => {
//       setSocketConnected(true);
//       setOnlineStatus(true);
//     });
//     socket.on("typing", () => setisTyping(true));
//     // socket.on("stop typing", () => setisTyping(false));
//     socket.on("stop typing", () => console.log(3, "i have stoped typing"));
//     // socket.on("love", () => console.log(3, " i love you babe"));
//   }, []);
//   useEffect(() => {
//     // ... (previous code)

//     // Listen for a custom event from the server
//     socket.on("customEvent", (data) => {
//       // console.log("Received from server:", data);
//       refreshMessages();
//     });

//     // Clean up the socket connection when the component unmounts
//     // return () => {
//     //   socket.disconnect();
//     // };
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = SelectedChat;
//   }, [SelectedChat]);
//   // for notification when new message is sent
//   // console.log("notification>>>>>>", JSON.stringify(notification));

//   // useEffect(() => {
//   // socket.on("refreshChat", (data) => {
//   //  display("refresh", data._id);
//   //   refreshMessages(data._id);
//   // });
//   // }, []);
//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       // socket.emit("refreshChat", newMessageRecieved);
//       console.log("refreshing from message recieved");
//       // refreshMessages(newMessageRecieved.chat._id);
//       // if no chat is selectedChatCompare, or if am currently
//       // chating with another person while a new message came for another person disply it  in notifiction icon
//       if (
//         !selectedChatCompare ||
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         //give a notificatio
//         if (!notification.includes(newMessageRecieved)) {
//           setNotification([newMessageRecieved, ...notification]);
//           console.log(9, "message not seen");
//           // setFetchAgain(!fetchAgain);
//         }
//       } else {
//         setMessages([...messages, newMessageRecieved]);
//         // updateSeenMessage(newMessageRecieved._id);
//         // refreshMessages();
//       }
//     });
//     // return () => {
//     // };
//   });
//   const updateDeliveredMessage = async (id) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };
//     // const { data } = await axios.put(`${endpoint}/api/message/chatDelivered`, config);
//     const { data } = await axios.put(
//       `${endpoint}/api/message/chatDelivered`,
//       {
//         chatId: id,
//       },
//       config
//     );
//     if (!data) {
//       return;
//     }
//     // socket.emit("refreshChat");
//     console.log("is message deliverd", data);
//   };
//   const updateSeenMessage = async (id) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };
//     const { data } = await axios.put(
//       `${endpoint}/api/message/chatSeen`,
//       {
//         chatId: id,
//       },
//       config
//     );
//     if (!data) {
//       return;
//     }
//     // refreshMessages();
//     // console.log("is message deliverd", data);
//   };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessages) {
//       // socket.emit("customEvent", { data: "Hello, Server!" });
//       socket.emit("stop typing", SelectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setnewMessages("");
//         const { data } = await axios.post(
//           // "http://localhost:5000/api/message",
//           `${endpoint}/api/message`,
//           {
//             // content: newMessages,
//             content: newMessages,
//             chatId: SelectedChat._id,
//           },
//           config
//         );
//         // console.log("message data", data);
//         socket.emit("new Message", data);
//         setMessages([...messages, data]);
//         setFetchAgain(true); //new method
//         updateDeliveredMessage(data._id);
//         console.log("socket details" + socket);
//         // socket.emit("refreshchat", data);
//         // socket.emit("love", "data");
//         // socket.emit("refreshChat", SelectedChat);

//         refreshMessages();
//         // setisMessageDelivered(true);
//         // check if user have read the message i.e if it in notifacton
//         // if (notification.includes(data)) {
//         //   console.log("message not seen");
//         // } else {
//         //   console.log("message seen");
//         // }

//         // setFetchAgain(!fetchAgain);
//       } catch (error) {
//         toast({
//           title: "Error Occured ",
//           description: error.response.data.message,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };

//   const typingHandler = (e) => {
//     setnewMessages(e.target.value);
//     //typing indicator logic
//     if (!socketConnected) return;
//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", SelectedChat._id);
//     }
//     //typing indicator
//     // functiomt to stop typig when the user stops typing
//     let lastTypingTime = new Date().getTime();
//     var timerlength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerlength && typing) {
//         socket.emit("stop typing", SelectedChat._id);
//         setTyping(false);
//       }
//     }, timerlength);
//   };
//   return (
//     <>
//       {" "}
//       {SelectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             display="flex"
//             w="100%"
//             px={2}
//             pb={3}
//             alignItems="center"
//             fontFamily="Work sans"
//             justifyContent={{ base: "space-between" }}
//           >
//             <IconButton
//               display={{ base: "flex", md: "none" }}
//               icon={<ArrowBackIcon />}
//               onClick={() => setSelectedChat("")}
//             />
//             {!SelectedChat.isGroupChat ? (
//               // <>{getSender(user, SelectedChat.users)}</>
//               <>
//                 {getSender_singleChat(user, SelectedChat.users)}
//                 <ProfileModel user={getSenderFull(user, SelectedChat.users)} />
//               </>
//             ) : (
//               <>
//                 {SelectedChat.chatName.toUpperCase()}
//                 <UpdateGroupChatModal
//                   // fetchAgain={fetchAgain}
//                   setFetchAgain={setFetchAgain}
//                   fetchMessages={fetchMessages}
//                 />
//               </>
//             )}
//           </Text>
//           <Box
//             display="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (
//               <div className="messages">
//                 <ScrollableChat messages={messages} />
//               </div>
//             )}
//             <FormControl onKeyDown={sendMessage} isRequired mt={3}>
//               <Input
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter  a Messsage"
//                 value={newMessages}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           h="100%"
//         >
//           Click on a User to start chatting
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;
