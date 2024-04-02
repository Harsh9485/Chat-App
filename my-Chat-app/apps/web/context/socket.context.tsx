"use client";

import { Socket } from "dgram";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ISocketContext {
  sendMsg: (msg: string) => any;
  message: { msg: string; id: string }[];
  Socket: Socket;
}
interface socketProviderProps {
  children: React.ReactNode;
}

const socketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(socketContext);
  if (!state) throw new Error("Socket context is not available");
  return state;
};

export const SocketProvider: React.FC<socketProviderProps> = ({ children }) => {
  const [Socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<ISocketContext["message"]>();

  const onMessageRef = (msg) => {
    const data = JSON.parse(msg);

    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    console.log(`Socket connected to ${_socket.id}`);
    setSocket(_socket);
    _socket.on("MESSAGES", onMessageRef);
    return () => {
      _socket.disconnect();
      setSocket(undefined);
      _socket.off("MESSAGES", onMessageRef);
    };
  }, []);

  const sendMessage: ISocketContext["sendMsg"] = useCallback(
    (msg) => {
      console.log(`send msg : ${msg}`);

      if (Socket) {
        Socket.emit("event:message", msg);
      }
    },
    [Socket]
  );

  return (
    <socketContext.Provider value={{ sendMessage, Socket, messages }}>
      {children}
    </socketContext.Provider>
  );
};
