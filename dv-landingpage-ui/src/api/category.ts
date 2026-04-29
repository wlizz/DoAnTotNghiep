import client from "./apiConfig";

export default {
  async getAllCategoryProduct() {
    const url = `/categories/product`;
    return await client.get(url)
  },
  async getProductOfCategory(id: number) {
    const url = `/categories/${id}`;
    return await client.get(url)
  },
  async getAllCategory() {
    const url = `/categories`;
    return await client.get(url)
  },
}