import { ICartItem } from "../../cart/libs/interfaces";
import { Delivery_Charge } from "../../checkout/libs/enums";

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "completed" | "failed";
 
export interface IOrderInfo {
  _id: string;
  orderId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  subTotal: number;
  deliveryFee: number;
  tax?: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  deliveryDate: string;
  specialNote: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  statusHistory?: Array<{
    status: string;
    timestamp: Date;
    by: string;
    note: string;
  }>;
  estimatedTime?: Date | null;
  items: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IOrderCreate {
  userId?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress: string;
  totals: {
    subTotal: number;
    tax: number;
    deliveryFee: Delivery_Charge;
    totalAmount: number;
  };
  paymentMethod: string;
  deliveryDate?: string;
  specialNote: string;
  // status: "pending";
  items: ICartItem[];
}
export interface ITrackedOrder {
  _id: string;
  orderId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: ICartItem[];
  totals: {
    subTotal: number;
    deliveryCharge: number;
    discount: number;
    total: number;
  };
  paymentMethod: string;
  deliveryDate: string;
  specialNote?: string;
  estimatedTime?: number;
  statusHistory: { status: string; timestamp: string; note: string }[];
  createdAt: string;
}
export interface IOrderResponse {
  success: boolean;
  message: string;
  data: IOrderInfo;
  error?: any;
}
export interface IOrderResponses {
  success: boolean;
  message: string;
  data: IOrderInfo[];
  error?: any;
}
