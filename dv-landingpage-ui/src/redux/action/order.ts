import { OrderRespose } from "../../dataType/order";
import { SAVE_ORDER } from "../type";

export const saveOrder = (data: OrderRespose[]) => ({
  type: SAVE_ORDER,
  payload: data
})