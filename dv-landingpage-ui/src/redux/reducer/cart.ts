import { CartRequest } from "../../dataType/cart";
import { CLEAR_CART, UPDATE_CART, UPDATE_USER } from "../type";

const initCart: CartRequest = {
  orderNumber: 0,
  totalAmount: 0,
  userId: 0,
  productIds: []
}

export default function cart(state = initCart, action: any) {
  const data = action.payload;
  switch (action.type) {
    case UPDATE_CART:
      const totalAmount = data.productIds.reduce((acc: any, cur: any) => acc + (cur.product.price * cur.quantity), 0)
      return {
        ...data,
        totalAmount
      };
    case UPDATE_USER: {
      return {
        ...state,
        userId: data
      }
    }
    case CLEAR_CART: {
      return initCart
    }
    default:
      return state;
  }
}