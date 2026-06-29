import {
  SocketMutationConfig,
  useSocketMutation,
} from "./hooks/useSocketMutation";
import { useSocketSubscription } from "./hooks/useSocketSubscription";
import { IOrderCreate, IOrderInfo, IOrderResponse } from "./interface";
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
