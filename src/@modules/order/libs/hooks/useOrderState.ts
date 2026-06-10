import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { useCallback, useState } from "react";
import { IOrderInterface } from "../interface";

interface OrderResponse {
  success: boolean;
  [key: string]: any;
}

interface UseOrderStateReturn {
  placeOrder: (checkoutInfo: IOrderInterface) => void;
  isLoading: boolean;
  error: string | null;
}

export const useOrderState = (): UseOrderStateReturn => {
  const { socket } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = useCallback(
    (checkoutInfo: IOrderInterface) => {
      if (!socket) {
        setError("Socket not connected");
        return;
      }

      setIsLoading(true);
      setError(null);

      socket.emit(
        "placeOrder",
        { data: checkoutInfo },
        (res: OrderResponse) => {
          setIsLoading(false);
          if (!res?.success) {
            setError("Failed to place order");
          }
        },
      );
    },
    [socket],
  );

  return { placeOrder, isLoading, error };
};
