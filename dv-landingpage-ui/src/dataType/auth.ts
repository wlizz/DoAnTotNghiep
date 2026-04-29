export interface Auth {
  id: number,
  name: string,
  email: string,
  token: string,
  create_date: string,
  update_date: string,
  address: string,
  phone_no: string,
}

export interface UserInfoReponse {
  active_flg: number,
  address: string,
  create_date: string,
  email: string,
  id: number,
  name: string,
  password: string,
  phone_no: string,
  status: number,
  update_date: string
}