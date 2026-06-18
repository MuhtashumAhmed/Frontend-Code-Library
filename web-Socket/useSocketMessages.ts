// services/webSocket/useSocketMessages.ts
"use client";


import { useEffect, useState } from "react";
import { useSocket } from "./useSockets";


type Message = unknown | any; // or define a proper type


export function useSocketMessages() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    if (!socket) return;


    const handler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    //   setMessages([ data]);
    };


    socket.addEventListener("message", handler);


    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [socket]);


  return messages;
}
