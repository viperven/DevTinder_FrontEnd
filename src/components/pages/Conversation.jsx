import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataSerivce";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Conversation() {
  const socket = useSocket();
  const { id } = useParams();
  const [messageList, setMessageList] = useState([]);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUser = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const formatTime = (date) => {
    const time = new Date(date).toLocaleTimeString();
    return time;
  };

  const getConversationMessage = async () => {
    try {
      const data = await DataService.getAllMessageByUserId(id);
      if (data?.isSuccess) {
        setMessageList(data?.apiData);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleSendMessage = (e) => {
    if (socket && message.trim()) {
      console.log("Sending message:", message);
      socket.emit("sendMessage", message);
      setMessage(""); // Clear input field
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      console.log("New message received:", newMessage);
      setMessage((prevChat) => [...prevChat, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  useEffect(() => {
    getConversationMessage();
  }, []);

  return (
    <>
      {/* <div className="chat-container">
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
    </div> */}
      <Layout>
        <div className="flex justify-center mt-2 mb-2">
          <div className="mockup-phone max-w-xl w-full min-w-52">
            <div className="camera"></div>
            <div className="display p-4">
              {messageList.length > 0 &&
                messageList.map((cur, i) => {
                  const isSender = cur.senderID._id === loggedInUserId;
                  const user = isSender ? cur.receiverID : cur.senderID;
                  const alignment = isSender ? "chat-end" : "chat-start";

                  return (
                    <div key={cur._id} className={`chat ${alignment}`}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt={`${
                              isSender
                                ? loggedInUser?.firstName
                                : user.firstName
                            } profile image`}
                            src={
                              isSender ? loggedInUser?.photoUrl : user.photoUrl
                            }
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {user.firstName} {user.lastName}
                        <time className="text-xs opacity-50">
                          {formatTime(cur.createdAt)}
                        </time>
                      </div>
                      <div className="chat-bubble">{cur.content}</div>
                      <div className="chat-footer opacity-50">
                        {isSender ? "Delivered" : "Seen"}
                      </div>
                    </div>
                  );
                })}
              <div className="flex justify-center gap-1">
                <input
                  value={message}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full "
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <kbd
                  type="button"
                  onClick={handleSendMessage}
                  className="kbd cursor-pointer"
                >
                  Send
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Conversation;
