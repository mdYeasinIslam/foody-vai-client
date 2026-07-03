import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { useEffect, useState, useCallback } from "react";

export const useFetchAllOrders = () => {
  const { socket } = useSocket();
  const [orders, setOrders] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Memoize the fetch function using useCallback so it doesn't regenerate on every render
  const fetchAllOrdersRaw = useCallback(() => {
    if (!socket) return;

    setIsPending(true);
    setIsError(false);
    setErrorMessage(null);

    console.log(
      "Emitting raw 'getAllOrders' event. Connected:",
      socket.connected,
    );

    socket.emit("getAllOrders", { status: "" }, (response: any) => {
      console.log("Received response from server callback:", response);

      setIsPending(false);
      if (response && response.success) {
        setOrders(response.data || []);
      } else {
        setIsError(true);
        setErrorMessage(
          response?.message || "Failed to fetch orders from server.",
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    // Handle connection status safely
    if (socket.connected) {
      fetchAllOrdersRaw();
    } else {
      socket.on("connect", fetchAllOrdersRaw);
    }

    // Clean up event listener on component unmount
    return () => {
      socket.off("connect", fetchAllOrdersRaw);
    };
  }, [socket, fetchAllOrdersRaw]);

  // Return the standard TanStack Query style properties
  return {
    orders,
    isPending,
    isError,
    errorMessage,
    refetch: fetchAllOrdersRaw, // Bonus: lets you manually re-fetch when clicking a refresh button!
  };
};
