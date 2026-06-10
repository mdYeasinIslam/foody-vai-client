import { useCallback, useState } from "react";
import { Socket } from "socket.io-client";
import { IOrderInterface } from "../interface";

interface CheckoutInfo {
  [key: string]: any;
}

interface OrderResponse {
  success: boolean;
  [key: string]: any;
}

interface UseOrderStateReturn {
  placeOrder: (checkoutInfo: IOrderInterface) => void;
  isLoading: boolean;
  error: string | null;
}

export const useOrderState = (socket: Socket | null): UseOrderStateReturn => {
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

          if (res?.success) {
            console.log("Order placed successfully");
          } else {
            setError("Failed to place order");
            console.log("Order placement failed");
          }
        },
      );
    },
    [socket],
  );

  return { placeOrder, isLoading, error };
};
