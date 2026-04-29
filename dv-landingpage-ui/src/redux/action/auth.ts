import { LOG_OUT } from './../type';
import { UserInfoReponse } from "../../dataType/auth";
import { LOGIN, SAVE_TOKEN } from "../type";

export const SaveToken = (data: string) => ({
  type: SAVE_TOKEN,
  payload: data
})

export const saveInfoUser = (data: UserInfoReponse) => ({
  type: LOGIN,
  payload: data
})

export const LogOut = () => ({
  type: LOG_OUT,
})