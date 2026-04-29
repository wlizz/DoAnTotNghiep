import { CustomerUpdate } from './../dataType/custormer';
import client from "./apiConfig";

export default {
  async getAllCustomer() {
    const url = `/users`;
    const response = await client.get(url);
    return response;
  },
  async updateCustormer(id: number, data: CustomerUpdate) {
    const url = `/users/${id}`;
    const response = await client.put(url, data);
    return response;
  },
  async deleteCustomer(id: number) {
    const url = `/users/${id}`;
    const response = await client.delete(url);
    return response;
  }
}