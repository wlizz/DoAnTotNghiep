import { ProductCreateDto } from "../dataType/product";
import client from "./apiConfig";

export default {
  async getAllProduct(page: number, size: number) {
    const url = `/products?page=${page}&size=${size}`;
    return await client.post(url)
  },
  async createNewProduct(product: ProductCreateDto) {
    const url = `/products/create`;
    return await client.post(url, product)
  },
  async deleteProduct(id: number) {
    const url = `/products/${id}`;
    return await client.delete(url)
  },
  async updateProduct(id: number, product: ProductCreateDto) {
    const url = `/products/${id}`
    return await client.put(url, product)
  }
}