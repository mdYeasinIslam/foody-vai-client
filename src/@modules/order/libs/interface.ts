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
export interface IOrderInterface {
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
