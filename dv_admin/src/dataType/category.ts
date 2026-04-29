import { ProductType } from "./product"

export interface CategoryType {
  category_cd: string
  category_name: string,
  list_product: ProductType[]
}

export interface CategoryResponse {
  active_flg: number
  create_date: string
  id: number,
  name: string,
  products: ProductType[]
  status: number
  update_date: string,
}