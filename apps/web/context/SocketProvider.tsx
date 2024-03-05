"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
  messages: { message: string; id: string }[];
  socket: Socket;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState([]); // Corrected the type here

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log(`send Message ${msg}`);
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  const onMessageRes = useCallback((msg: string) => {
    console.log("onMessageRes called msg: ", msg);
    const message = JSON.parse(msg) as { message: string; id: string };
    console.log(message);
    setMessages((prev) => [...prev, message]); // Adding the message to the state correctly
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRes);
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRes);
      setSocket(undefined);
      console.log(`socket disconnected ${_socket.id}`);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
