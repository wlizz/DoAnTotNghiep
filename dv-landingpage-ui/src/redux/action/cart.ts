import { CartRequest } from "../../dataType/cart";
import { CLEAR_CART, UPDATE_CART, UPDATE_USER } from "../type";

export const updateCart = (data: CartRequest) => ({
  type: UPDATE_CART,
  payload: data
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const updateUser = (id: number) => ({
  type: UPDATE_USER,
  payload: id
})