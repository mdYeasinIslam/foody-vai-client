
import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { SocketResponse } from "@/src/@libs/socket/libs/socketRequest";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type QueryFn<TVars, TData> = (
  socket: Socket | null,
  variables: TVars,
) => Promise<SocketResponse<TData>>;

export const useSocketQuery = <TVars = void, TData = unknown>(
  queryFn: QueryFn<TVars, TData>,
  variables: TVars,
) => {
  const { socket } = useSocket();
  const [data, setData] = useState<TData | undefined>(undefined);
  const [response, setResponse] = useState<SocketResponse<TData> | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const variablesKey = JSON.stringify(variables); // stable primitive

  const run = useCallback(() => {
    if (!socket) return;
    setIsPending(true);
    setIsError(false);
    setErrorMessage(null);

    queryFn(socket, variables)
      .then((res) => {
        setData(res.data);
        setResponse(res);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setIsPending(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, queryFn, variablesKey]);

  useEffect(() => {
    if (!socket) return;
    if (socket.connected) {
      run();
    } else {
      socket.on("connect", run);
    }
    return () => {
      socket.off("connect", run);
    };
  }, [socket, run]);

  return { data, response, isPending, isError, errorMessage, refetch: run };
};
