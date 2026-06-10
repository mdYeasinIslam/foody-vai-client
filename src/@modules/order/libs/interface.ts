import { ICartItem } from "../../cart/libs/interfaces";
import { Delivery_Charge } from "../../checkout/libs/enums";

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
  items: {
    id?: string;
    productId: string;
    userId?: string | null;
  }[];
}
export interface IOrderResponse {
  success: boolean;
  message: string;
  data: IOrderInfo;
  [key: string]: any;
}
