import { ProductResponse } from "./product";
import { UserReponse } from "./user";

export interface OrderRespose {
  active_flg: number,
  create_date: string,
  id: number,
  orderNumber: string,
  products: ProductResponse[]
  status: number,
  totalAmount: number,
  update_date: string,
  user: UserReponse,
  orderDetails: OrderDetail[],
}

export interface OrderDetail  {
  id: number,
  orderId: number,
  productId: number,
  quantity: number
}

export interface OrderCreateNew {
  orderNumber: number,
  totalAmount: number,
  userId: number,
  productIds: productType[]
}

export interface productType {
  id: number,
  quantity: number
}

export interface UpdateOrderDto {
  orderNumber?: string;
  totalAmount?: number;
  userId?: number;
  productIds?: productType[];
  status?: number;
}