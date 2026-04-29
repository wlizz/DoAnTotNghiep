export interface CheckInveType {
  check_inv_id: number,
  date: string,
  user: string,
  products: CheckInvDetail[]
}
export interface CheckInvDetail {
  product_name: string,
  product_id: number,
  amount: number,
  amount_old: number,
}