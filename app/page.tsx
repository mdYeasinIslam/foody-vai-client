'use client'
import { useSocket } from "./hooks/useSocket";

export default function Home() {
const {socket,connected} = useSocket()
  return (
    <div>
      {`Socket is connected: ${connected}`}
      <h1> {socket?.id}</h1>
    </div>
  );
}
