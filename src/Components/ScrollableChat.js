import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/Chatslogic";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const ScrollableChat = ({ messages }) => {
  // console.log("hi sirp", JSON.stringify(messages.chat));
  console.log("hi sirp chat", messages[0]?.delivered);
  const { user } = ChatState();
  const options = {
    hour: "2-digit", // 'numeric' for non-padded, '2-digit' for zero-padded
    minute: "2-digit", // 'numeric' for non-padded, '2-digit' for zero-padded
    second: "2-digit", // 'numeric' for non-padded, '2-digit' for zero-padded
  };
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
  });
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const date = new Date(m.createdAt);
          const meridim = date.getHours >= 12 ? "PM" : "AM";
          var hours = date.getHours();
          hours = hours % 12;
          hours = hours ? hours : 12;
          const chatTime = hours + ":" + date.getMinutes() + ":" + meridim;
          return (
            <div style={{ display: "flex" }} key={m._id}>
              {isSameSender(messages, m, i, user._id) ||
                (isLastMessage(messages, i, user._id) && (
                  <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.pic}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                ))}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                }}
              >
                {m.content}
                <span
                  style={{
                    marginLeft: "20px",
                    fontSize: "12px",
                    marginTop: "32",
                  }}
                >
                  {m.createdAt ? chatTime : ""}
                  {m.delivered && (
                    <CheckIcon boxSize={4} w={4} h={8} color="red.500" />
                  )}
                  {m.seen && (
                    <CheckIcon boxSize={4} w={4} h={8} color="green.500" />
                  )}
                </span>
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
