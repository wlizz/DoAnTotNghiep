import { ProductResponse } from "./product"

export interface CategoryResponse {
  active_flg: number
  create_date: string
  id: number,
  name: string,
  status: number
  update_date: string,
}

export interface CategoryWithProduct {
  active_flg: number
  create_date: string
  id: number,
  name: string,
  products: ProductResponse[]
  status: number
  update_date: string,
}