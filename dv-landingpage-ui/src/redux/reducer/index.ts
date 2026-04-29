import { combineReducers } from "redux";
import auth from "./auth";
import { Auth } from "../../dataType/auth";
import cart from "./cart";
import { CartRequest } from "../../dataType/cart";
;

export type RootState = {
  auth: Auth,
  cart: CartRequest
}
const rootReducers = combineReducers({
  auth,
  cart
});

export default rootReducers;