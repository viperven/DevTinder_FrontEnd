import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// const SOCKET_SERVER_URL = "http://65.2.40.170:5000"; // Your backend URL
const SOCKET_SERVER_URL = "http://localhost:5000"; // Your local pc
// const SOCKET_SERVER_URL = "http://localhost:5000/socket.io"; // Your ec2 socket

// const SOCKET_SERVER_URL =
//   "wss://ia10swmere.execute-api.ap-south-1.amazonaws.com/prod";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);

    socketInstance.on("connect", () => {
      // console.log("Connected to Socket.IO server");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
