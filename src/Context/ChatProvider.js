import { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();
const Chatprovider = ({ children }) => {
  const [user, setUser] = useState();
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [SelectedChat, setSelectedChat] = useState(); //to store the seelcted user for chatting
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  // const [endpoint, setEndpoint] = useState("http://localhost:5000");
  // const [endpoint, setEndpoint] = useState(
  //   "https://chatbackend-b261.onrender.com"
  // );
  const [endpoint, setEndpoint] = useState(
    "https://chatbackendapi-97a03e3860aa.herokuapp.com"
  );
  const history = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history("/log");
    } else {
      history("/chats");
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        SelectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        onlineStatus,
        setOnlineStatus,
        endpoint,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default Chatprovider;
