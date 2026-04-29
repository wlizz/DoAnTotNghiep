import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { ProductTrending } from '../../../dataType/product'
import { MoneyFormat } from '../../../Ultils/MoneyFormat'

export default function ReportProduct() {
  const [listProduct, setListProduct] = useState<ProductTrending[]>([])
  useEffect(() => { getProductTrending() }, [])

  const getProductTrending = async () => {
    try {
      const res = await api.report.getProductTrending()
      setListProduct(res.data)
    } catch (err) {
    }
  }

  const _renderProductItem = (data: ProductTrending, index: number) => {
    return (
      <div className='product-item'>
        <div className='image-container'>
          <img src={data.image} alt='image' className='img-product' />
        </div>
        <div className='product-info'>
          <p className='title-name'>{data.name}</p>
          <p className='sale'>Đã bán: <span className='title-sale'>{data.total_sale}</span></p>
          <p className='price'>Giá bán: <span className='value-price'>{MoneyFormat(data.price)}</span></p>
        </div>
      </div>
    )
  }
  return (
    <div className='report-product'>
      <h4>Top 5 sản phẩm bán chạy:</h4>
      {listProduct.map((item: ProductTrending, index: number) => {
        if (index < 5) return _renderProductItem(item, index)
      })}
    </div>
  )
}
