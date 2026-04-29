export interface UserType {
  user_name: string,
  user_cd: string, 
  password: string,
}

export interface LoginParam {
  email: string,
  password: string,
  role: string
}