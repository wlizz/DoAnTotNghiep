export interface ReportProductType {
  product_cd: string, 
  product_name: string,
  total_import: number, 
  amount_import: number, 
  total_export: number, 
  amount_export: number, 
  total_remain: number,
  unit: string,
}

export interface ReportRenuave {
  time: string| number,
  total: number, 
  total_invoice: number,
}

export interface ReportTime {
  total_date: number;
  total_month: number;
  total_order_date: number;
  total_order_month: number;
}