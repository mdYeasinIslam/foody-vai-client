// @modules/order/libs/services/order.socket.service.ts
import { Socket } from "socket.io-client";
import { socketRequest } from "@/src/@libs/socket/libs/socketRequest";
import { IOrderInfo, IOrderResponse } from "./interface";

const EVENTS = {
  PLACE_ORDER: "placeOrder",
  CANCEL_ORDER: "cancelOrder",
  GET_ORDERS: "getOrders",
  ORDER_UPDATED: "orderUpdated", // server -> client
} as const;

export const OrderSocketService = {
  Name: "order",
  EVENTS,

  place: (socket: Socket | null, payload: IOrderInfo) =>
    socketRequest<IOrderInfo, IOrderResponse>(
      socket,
      EVENTS.PLACE_ORDER,
      payload,
    ),

  cancel: (socket: Socket | null, orderId: string) =>
    socketRequest<{ orderId: string }, IOrderResponse>(
      socket,
      EVENTS.CANCEL_ORDER,
      { orderId },
    ),

  findAll: (socket: Socket | null) =>
    socketRequest<undefined, IOrderResponse[]>(socket, EVENTS.GET_ORDERS),
};
