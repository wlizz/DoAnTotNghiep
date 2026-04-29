export interface CustomerType {
  customer_name: string,
  customer_cd: string,
  customer_phone: string,
  customer_address: string,
  amount_debt: number,
}

export interface CustomerUpdate {
  name: string, 
  phone_no: string, 
  address: string, 
  password: string,
}

export interface CustomerResponse {
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