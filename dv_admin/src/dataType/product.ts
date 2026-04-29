import { CategoryResponse } from "./category";

export interface ProductType {
  product_cd: string,
  product_name: string,
  category_cd: string,
  image: string,
  price: number,
  price_import: number,
  amount: number,
  unit: string,
}

export interface ProductRequest {
  category: {
    id: number
  },
  description: string,
  image: string,
  name: string,
  price: number,
  size: string,
  weight: string,
  unit: string,
}

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

export interface ProductCreateDto {
  name: string,
  price: number,
  image: string,
  size: string,
  unit: string,
  weight: string,
  description: string,
  categoryId: number,
  status: number,
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
