import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataSerivce";

function Conversation() {
    const socket = useSocket();
    const [messageList,setMessageList] = useState([]);

    const handleSendMessage = () => {
        if (socket && message.trim()) {
            console.log("Sending message:", message);
            socket.emit("sendMessage", message);
            setMessage(""); // Clear input field
        }
    };

    const getConversationMessage = async () => {
        try {
            const data = await DataService.getAllMessageByUserId();
            if (data?.isSuccess) {
                setMessageList(data?.apiData);
            }
        }
        catch (err) {
            console.log(err?.message);
        }
    }
console.log(messageList);

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

    useEffect(()=>{
        getConversationMessage()
    },[]);

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
                <div className='flex justify-center mt-2 mb-2'>
                    <div className="mockup-phone max-w-xl w-full min-w-52">
                        <div className="camera"></div>
                        <div className="display p-4">
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">Seen at 12:46</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">Seen at 12:46</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">Seen at 12:46</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">Seen at 12:46</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Conversation