import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000");

function Test() {
//   const [message, setMessage] = useState("");
//   const [serverMessage, setServerMessage] = useState("");

//   useEffect(() => {
//     // Listen for 'welcome' event from the server
//     socket.on("welcome", (data) => {
//       setServerMessage(data.message);
//     });

//     // Cleanup the listener when the component unmounts
//     return () => {
//       socket.off("welcome");
//     };
//   }, []);

  const sendMessageToServer = () => {
    // Send a custom message to the server
    socket.emit("clientMessage", { message: "Hello from client!" });
  };

  return (
    <div>
      {/* <h1>Socket.IO with React and Node.js</h1>
      <p>{serverMessage}</p>
      <button onClick={sendMessageToServer}>Send Message to Server</button> */}
      <h1>asdasd</h1>
    </div>
  );
}

export default Test;
