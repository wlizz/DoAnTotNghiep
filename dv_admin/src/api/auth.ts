import { LoginParam } from "../dataType/user";
import client from "./apiConfig";

export default {
  async login(data: LoginParam) {
    const url = `/auth/login`;
    return await client.post(url, data)
  }
}