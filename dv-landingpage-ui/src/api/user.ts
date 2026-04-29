import { UserUpdateDto } from '../dataType/user';
import client from './apiConfig';
export default {
  async updateUserInfo(id: number, data: UserUpdateDto) {
    const url = `/users/${id}`
    return await client.put(url, data)
  },
}