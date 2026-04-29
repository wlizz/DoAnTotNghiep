export interface LoginParam {
  email: string,
  password: string,
}

export interface RegisterParam {
  name: string,
  email: string,
  password: string,
}

export interface UserParam {
  token: string,
  email: string,
  password: string,
}

export interface UserReponse {
  id: number,
  name: string,
  email: string,
  password: string,
  address: string,
  phone_no: string,
  create_date: string,
  update_date: string,
  active_flg: number,
  status: number
}

export interface UserUpdateDto {
  address: string,
  phone_no: string,
  name: string,
}

export interface ChangePassword {
  email: string,
  pwold: string, 
  pwnew: string,
}