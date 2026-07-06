import {
  SocketMutationConfig,
  useSocketMutation,
} from "./hooks/useSocketMutation";
import { useSocketQuery } from "./hooks/useSocketQuery";
import { useSocketSubscription } from "./hooks/useSocketSubscription";
import {
  IOrderCreate,
  IOrderInfo,
  IOrderResponse,
  IOrderStatusUpdate,
} from "./interface";
import { OrderSocketService } from "./services";

type IUsePlaceOrder = {
  config?: SocketMutationConfig<IOrderResponse, IOrderCreate>;
};

export const usePlaceOrder = ({ config }: IUsePlaceOrder = {}) =>
  useSocketMutation(OrderSocketService.place, config);

export const useCancelOrder = ({
  config,
}: { config?: SocketMutationConfig<IOrderResponse, string> } = {}) =>
  useSocketMutation(OrderSocketService.cancel, config);

export const useTrackOrderHook = ({
  config,
}: { config?: SocketMutationConfig<IOrderResponse, string> } = {}) =>
  useSocketMutation(OrderSocketService.track, config);

export const useOrderUpdates = (handler: (order: IOrderInfo) => void) =>
  useSocketSubscription(OrderSocketService.EVENTS.ORDER_UPDATED, handler);
// get all orders
// type IUseGetAllOrders = {
//   config?: SocketMutationConfig<IOrderInfo[], void>;
// };
// export const useGetAllOrders = ({ config }: IUseGetAllOrders = {}) =>
//   useSocketMutation(OrderSocketService.findAll, config);
export const useGetAllOrders = (status: string = "") =>
  useSocketQuery(OrderSocketService.findAll, { status });
export const useUpdateOrderStatus = ({
  config,
}: {
  config?: SocketMutationConfig<IOrderResponse, IOrderStatusUpdate>;
} = {}) => useSocketMutation(OrderSocketService.updateStatus, config);
export const useDeleteOrder = ({
  config,
}: { config?: SocketMutationConfig<IOrderResponse, string> } = {}) =>
  useSocketMutation(OrderSocketService.deleteOne, config);
