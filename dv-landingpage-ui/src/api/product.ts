import { ProductSearchDto } from "../dataType/product";
import client from "./apiConfig";

export default {
  async getAllProduct(page: number, size: number,data: ProductSearchDto ) {
    const url = `/products?page=${page}&size=${size}`;
    return await client.post(url, data)
  },
  async getProductTrending() {
    const url = `/products/trending`;
    return await client.get(url)
  }
}