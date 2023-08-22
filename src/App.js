import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
