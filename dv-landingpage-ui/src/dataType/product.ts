import { CategoryResponse } from "./category";

export interface ProductResponse {
  active_flg: number,
  category: CategoryResponse,
  create_date: string,
  description: string,
  id: number,
  image: string,
  name: string,
  price: number,
  size: string,
  status: number,
  update_date: string,
  weight: string,
  unit: string,
}

export interface ProductSearchDto {
  categoryId?: number[],
  name?: string, 
}

export interface ProductTrending {
  active_flg: number,
  category: CategoryResponse,
  create_date: string,
  description: string,
  id: number,
  image: string,
  name: string,
  price: number,
  size: string,
  status: number,
  update_date: string,
  weight: string,
  unit: string,
  total_sale: number
}
