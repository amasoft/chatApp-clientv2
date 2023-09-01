import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
// import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        {/* <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={ChatPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}

        <Route path="/" element={<Homepage />} exact />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
