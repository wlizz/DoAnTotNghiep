import { LOGIN, LOG_OUT, SAVE_TOKEN } from "../type";
import { Auth } from "../../dataType/auth";

const initAuth: Auth = {
  id: 0,
  name: '',
  email: '',
  token: '',
  create_date: '',
  update_date: '',
  address: "",
  phone_no: '',
}

export default function auth(state = initAuth, action: any) {
  const data = action.payload
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: data.id,
        email: data.email,
        name: data.name,
        create_date: data.create_date,
        update_date: data.update_date,
        address: data.address,
        phone_no: data.phone_no,
      }
    case SAVE_TOKEN:
      return {
        ...state,
        token: data
      }
    case LOG_OUT:
      return initAuth
    default:
      return state
  }
}