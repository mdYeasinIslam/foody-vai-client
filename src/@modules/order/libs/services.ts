// @modules/order/libs/services/order.socket.service.ts
import { Socket } from "socket.io-client";
import { IOrderCreate, IOrderInfo, IOrderResponse } from "./interface";
import { socketRequest } from "@/src/@libs/socket/libs/socketRequest";

const EVENTS = {
  PLACE_ORDER: "placeOrder",
  CANCEL_ORDER: "cancelOrder",
  TRACK_ORDER: "trackOder",
  GET_ALL_ORDERS: "getAllOrders",
  ORDER_UPDATED: "orderUpdated", // server -> client
} as const;

export const OrderSocketService = {
  Name: "order",
  EVENTS,

  place: (socket: Socket | null, payload: IOrderCreate) =>
    socketRequest<IOrderCreate, IOrderResponse>(
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
    socketRequest<void, IOrderInfo[]>(socket, EVENTS.GET_ALL_ORDERS),

  track: (socket: Socket | null, orderId: string) =>
    socketRequest<{ orderId: string }, IOrderResponse>(
      socket,
      EVENTS.TRACK_ORDER,
      { orderId },
    ),
};
