interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}
export interface IOrderInfo {
  _id?: string;
  orderId?: string;
  customerName: string;
  subTotal: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: string;
  deliveryDate: string;
  note: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  defaultAddress: Address;
  items: CartItem[];
}

export interface IOrderResponse {
  success: boolean;
  message: string;
  data: any;
  [key: string]: any;
}
