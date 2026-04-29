import { OrderCreateNew, UpdateOrderDto } from "../dataType/order"
import client from "./apiConfig"

export default {
  async getAllOrderByUser(id: number) {
    const url = `/orders/user/${id}`
    return await client.get(url)
  },
  async createNewOrder(data: OrderCreateNew) {
    const url = `orders`
    return await client.post(url, data)
  },
  async upadteOrder(id: number, data: UpdateOrderDto) {
    const url = `orders/${id}`
    return await client.put(url, data)
  }
}