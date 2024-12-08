import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataSerivce";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [lastChatData, setLastChatData] = useState([]);
  const loggedInUserId = useSelector((state) => state.user._id);

  function formatDate(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes === 1 ? "1 M ago" : `${minutes} M ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return days === 1 ? "yesterday" : `${days} days ago`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
  }

  const getLastConversationMessage = async () => {
    try {
      const data = await DataService.getConnectionsLastMessage();
      if (data?.isSuccess) {
        setLastChatData(data?.apiData);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleOpenChat = async (conversationID, receiverID) => {
    try {
      if (!conversationID && !receiverID) {
        return;
      }
      navigate(`/conversation/${conversationID}/${receiverID}`);
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getLastConversationMessage();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mt-2">
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div className="bg-base-100 min-h-screen flex justify-center">
              <div className="max-w-lg w-full min-w-52 bg-base shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-4 text-white">Chats</h1>
                {lastChatData.length > 0 &&
                  lastChatData.map((chat, i) => {
                    const otherUser =
                      chat.senderID._id === loggedInUserId
                        ? chat.receiverID
                        : chat.senderID;

                    return (
                      <div
                        key={otherUser?._id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-300 cursor-pointer"
                        onClick={() => {
                          handleOpenChat(chat?._id, otherUser?._id);
                        }}
                      >
                        {/* Avatar */}
                        <div className="avatar">
                          <div className="w-12 rounded-full border-2 border-blue-500">
                            <img
                              src={otherUser?.photoUrl}
                              alt={`${otherUser?.firstName}'s Avatar image`}
                            />
                          </div>
                        </div>

                        {/* Chat Info */}
                        <div className="flex-grow">
                          <h2 className="font-semibold text-white">
                            {otherUser?.firstName}
                          </h2>
                          <p className="text-sm text-white truncate">
                            {chat?.lastMessage?.content}
                          </p>
                        </div>

                        {/* Chat Meta */}
                        <div className="text-right">
                          <p className="text-xs text-white">
                            {formatDate(chat?.updatedAt)}
                          </p>
                          {4 > 0 && (
                            <span className="badge badge-primary badge-sm">
                              2
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
