import { ProductType } from "./product";

export interface ImportType {
  import_cd: string,
  provider_cd: string,
  total_amount: number,
  total_paid: number,
  total_debt: number,
  status: number, 
  product: ProductImport[]
}
export interface ProductImport {
  product_cd: string,
  product_name: string, 
  price_import: number, 
  quanlity: number
}