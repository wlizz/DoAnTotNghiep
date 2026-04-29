import client from "./apiConfig";

export default {
  async getAllCategory() {
    const url = `/categories/product`;
    return await client.get(url)
  },
  async createCategory(data: string) {
    const url = `/categories`;
    const dataAdd = {
      name: data
    }
    return await client.post(url, dataAdd)
  },
  async deleteCategory(id: number) {
    const url = `/categories/${id}`;
    return await client.delete(url)
  },
  async updateCategory(id: number, data: { name: string }) {
    const url = `/categories/${id}`;
    return await client.put(url, data)
  }
}