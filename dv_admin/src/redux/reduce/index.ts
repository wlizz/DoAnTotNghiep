import { combineReducers } from "redux";
import { Auth } from "../../dataType/auth";
import auth from "./auth";

export type RootState = {
  auth: Auth,
}
const rootReducers = combineReducers({
  auth,
});

export default rootReducers;