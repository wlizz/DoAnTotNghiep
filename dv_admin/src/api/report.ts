import client from "./apiConfig";

export default {
  async getReportRevenue(time: string, startDate?: string, endDate?: string) {
    let url = ''
    if (startDate && endDate) {
      url = `/orders/total-by-time?time=${time}&startDate=${startDate}&endDate=${endDate}`;
    } else {
      url = `/orders/total-by-time?time=${time}`;
    }
    const response = await client.get(url);
    return response;
  },
  async getProductTrending() {
    const url = `/products/trending`;
    const response = await client.get(url);
    return response;
  },
  async getReportTime() {
    const url = `/orders/report`;
    const response = await client.get(url);
    return response;
  }
}