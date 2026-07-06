// @modules/order/libs/services/order.socket.service.ts
import { Socket } from "socket.io-client";
import {
  IOrderCreate,
  IOrderInfo,
  IOrderResponse,
  IOrderStatusUpdate,
} from "./interface";
import { socketRequest } from "@/src/@libs/socket/libs/socketRequest";

const EVENTS = {
  PLACE_ORDER: "placeOrder",
  CANCEL_ORDER: "cancelOrder",
  TRACK_ORDER: "trackOder",
  GET_ALL_ORDERS: "getAllOrders",
  ORDER_UPDATED: "orderUpdated", // server -> client
  UPDATE_ORDER_STATUS: "updateOrderStatus", // client -> server
  DELETE_ORDER: "deleteOrder",
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

  findAll: (socket: Socket | null, variables: { status: string }) =>
    socketRequest<{ status: string }, IOrderInfo[]>(
      socket,
      EVENTS.GET_ALL_ORDERS,
      variables,
    ),
  track: (socket: Socket | null, orderId: string) =>
    socketRequest<{ orderId: string }, IOrderResponse>(
      socket,
      EVENTS.TRACK_ORDER,
      { orderId },
    ),
  updateStatus: (socket: Socket | null, order: IOrderStatusUpdate) =>
    socketRequest<IOrderStatusUpdate, IOrderResponse>(
      socket,
      EVENTS.UPDATE_ORDER_STATUS,
      {
        _id: order._id,
        orderId: order.orderId,
        previousStatus: order.previousStatus,
        newStatus: order.newStatus,
        specialNote: order.specialNote,
      },
    ),
  deleteOne: (socket: Socket | null, orderId: string) =>
    socketRequest<{ orderId: string }, IOrderResponse>(socket, "deleteOrder", {
      orderId,
    }),
};
