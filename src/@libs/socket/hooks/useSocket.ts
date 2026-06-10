"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    //create socket connection
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socketInstance;
    setSocket(socketInstance);

    //connection event
    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("socket is connected to server", socketRef.current?.id);
    });
    //disconnect event
    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("socket is disconnected from server");
    });

    //welcome message (initial try)
    socketRef.current.on("connected", (data) => {
      console.log("socket connected", data);
    });

    return () => {
      if (socketRef.current) {
        socketInstance?.disconnect();
      }
    };
  }, []);
  return {
    socket,
    connected,
  };
};
