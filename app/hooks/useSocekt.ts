"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.VITE_SOCKET_URL;

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    //create socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    //connection event
    socketRef.current.on("connection", () => {
      setConnected(true);
      console.log("socket is connected to server", socketRef.current?.id);
    });
    //disconnect event
    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("socket is disconnected from server");
    });

    //welcome message (initial try)
    socketRef.current.on("connection", (data) => {
      console.log(data);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
      }
    };
  }, []);
    const data :{socket:Socket|null,connected:boolean} = {
    socket: socketRef.current,
    connected,
  }
  return data;
};

export default useSocket;
