import React, { useEffect, useRef } from "react";

import "./ChatRoom.css";
import useChat from "../useChat";

import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:1234";



const ChatRoom = () => {
  const [ roomId ] = React.useState(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
  const { messages, sendMessage } = useChat(roomId);
  const [ newMessage, setNewMessage ] = React.useState("");
  const socketRef = useRef();

  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    route: { roomId },
  });
  useEffect(()=>{
    socketRef.current.emit("connection", {
      route: roomId,
      action: "login",
      user: JSON.parse(localStorage.getItem("user") || null),
    });
  },[])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
              
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.value}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Escribir mensaje..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Enviar mensaje
      </button>
    </div>
  );
};

export default ChatRoom;