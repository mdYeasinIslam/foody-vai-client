// @libs/hooks/useSocketSubscription.ts
import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { useEffect } from "react";

export const useSocketSubscription = <T = any>(
  event: string,
  handler: (data: T) => void,
  deps: any[] = [],
) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, event, ...deps]);
};
