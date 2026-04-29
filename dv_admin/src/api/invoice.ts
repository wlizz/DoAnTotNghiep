import { UpdateOrderDto } from "../dataType/invoice";
import client from "./apiConfig";

export default {
  async getAllInvoice() {
    const url = `/orders`;
    const response = await client.get(url);
    return response;
  },
  async deleteInvoice(id: number) {
    const url = `/orders/${id}`;
    const response = await client.delete(url);
    return response;
  },
  async upadteOrder(id: number, data: UpdateOrderDto) {
    const url = `orders/${id}`
    return await client.put(url, data)
  }
}