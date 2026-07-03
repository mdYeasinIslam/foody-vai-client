// @libs/hooks/useSocketMutation.ts
import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { SocketResponse } from "@/src/@libs/socket/libs/socketRequest";
import { useCallback, useState } from "react";
import { Socket } from "socket.io-client";

type MutationFn<TVars, TData> = (
  socket: Socket | null,
  variables: TVars,
) => Promise<SocketResponse<TData>>;

export interface SocketMutationConfig<TData, TVars> {
  onSuccess?: (
    data: SocketResponse<TData>,
    variables: TVars,
  ) => void | Promise<void>;
  onError?: (error: Error, variables: TVars) => void;
  onSettled?: () => void;
}

export const useSocketMutation = <TVars = void, TData = unknown>(
  mutationFn: MutationFn<TVars, TData>,
  config?: SocketMutationConfig<TData, TVars>,
) => {
  const { socket } = useSocket();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [variables, setVariables] = useState<TVars | undefined>(undefined);

  const mutateAsync = useCallback(
    async (vars: TVars): Promise<SocketResponse<TData>> => {
      setIsPending(true);
      setError(null);
      setVariables(vars);
      try {
        const res = await mutationFn(socket, vars);
        await config?.onSuccess?.(res, vars);
        return res;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        config?.onError?.(e, vars);
        throw e;
      } finally {
        setIsPending(false);
        config?.onSettled?.();
      }
    },
    [socket, mutationFn, config],
  );

  const mutate = useCallback(
    (vars: TVars) => {
      mutateAsync(vars).catch(() => {});
    },
    [mutateAsync],
  );

  return { mutate, mutateAsync, isPending, error, variables };
};
