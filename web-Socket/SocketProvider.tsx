"use client";


import { createContext, useEffect, useRef, useState } from "react";


type SocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (data: unknown) => void;
};


export const SocketContext = createContext<SocketContextType | null>(null);


export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];


    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WEB_SOCKET_URL!,
      ["access_token", token as string]
    );


    socketRef.current = ws;
    setSocket(ws);


    ws.onopen = () => {
      console.log("Socket Connected");
      setIsConnected(true);
    };


    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("GLOBAL WS:", data);
    };


    ws.onclose = () => {
      setIsConnected(false);
    };


    return () => ws.close();
  }, []);


  const sendMessage = (data: unknown) => {
    const ws = socketRef.current;


    if (!ws) {
      console.warn("Socket not initialized");
      return;
    }


    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("Socket not open:", ws.readyState);
      return;
    }


    ws.send(JSON.stringify(data));
  };


  return (
    <SocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}
