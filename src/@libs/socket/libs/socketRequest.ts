// @libs/socket/socketRequest.ts
import { Socket } from "socket.io-client";

export interface SocketResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export const socketRequest = <TPayload, TResponse>(
  socket: Socket | null,
  event: string,
  payload?: TPayload,
  timeoutMs = 10000,
): Promise<SocketResponse<TResponse>> => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      return reject(new Error("Socket not connected"));
    }

    const timer = setTimeout(() => {
      reject(new Error(`Socket event "${event}" timed out`));
    }, timeoutMs);

    socket.emit(event, { data: payload }, (res: SocketResponse<TResponse>) => {
      clearTimeout(timer);
      if (!res?.success) {
        return reject(new Error(res?.message || `Event "${event}" failed`));
      }
      resolve(res);
    });
  });
};
