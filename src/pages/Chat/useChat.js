import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:1234";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    console.log(roomId)
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      route: { roomId },
    });
    console.log(socketRef)
    socketRef.current.connect(SOCKET_SERVER_URL)
    
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      console.log(incomingMessage)
      setMessages((messages) => [...messages, incomingMessage]);
    });
    console.log(socketRef)

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);
  //https://github.com/justadudewhohacks/websocket-chat/blob/master/client/socket.js
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      route: roomId,
      action: "msg",
      from: JSON.parse(localStorage.getItem("user") || null),
      value: messageBody,
    });
  };

  return { messages, sendMessage };
};

export default useChat;