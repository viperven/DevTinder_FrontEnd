import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Feed from "./components/pages/Feed";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import Profile from "./components/pages/Profile";
import Test from "./Test";
import Chat from "./components/pages/chat";
import Requests from "./components/pages/Requests";
import Connection from "./components/pages/Connections";
import Ignore from "./components/pages/Ignore";
import Settings from "./components/pages/settings";
import Conversation from "./components/pages/Conversation";
import ConversationById from "./components/pages/ConversationById";
// i m kalpit
function App() {
  return (
    <>
      {/* <Signup /> */}
      <Provider store={store}>
        <BrowserRouter>  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/conversation/:cid/:rid" element={<Conversation />} />
            <Route path="/conversation/:rid" element={<ConversationById />} />
            <Route path="/requests" element={<Requests />} /> 
            <Route path="/connection" element={<Connection />} />
            <Route path="/ignore" element={<Ignore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<h1>no page found</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
