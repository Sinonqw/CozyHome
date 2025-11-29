export type OrderStatus = "pending" | "processing" | "completed" | "canceled";

// Интерфейс для одного товара в заказе
export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
}

// Интерфейс для основного объекта заказа
export interface IOrder {
  _id: string;
  userId: string;
  clientName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;

  products: IOrderItem[];
}
