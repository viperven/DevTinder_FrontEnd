import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

const Chat = () => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      console.log("New message received:", newMessage);
      setChat((prevChat) => [...prevChat, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      console.log("Sending message:", message);
      socket.emit("sendMessage", message);
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
