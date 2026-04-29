import { ProductResponse } from "./product"

export interface CartRequest {
  orderNumber: number,
  totalAmount: number,
  userId: number,
  productIds: ProductCart[]
}

export interface ProductCart {
  product: ProductResponse,
  quantity: number
}