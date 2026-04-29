import { useEffect, useState } from "react"
import { ProductResponse, ProductTrending } from "../../dataType/product"
import api from "../../api"
import { Badge, Col, Row, notification } from "antd"
import ProductCard from "../../components/ProductCard"
import { CartRequest } from "../../dataType/cart"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/reducer"
import { updateCart } from "../../redux/action/cart"

export default function ListProductTrending() {
  const cart: CartRequest = useSelector((state: RootState) => state.cart)
  const userInfo = useSelector((state: RootState) => state.auth)
  const [listProduct, setListProduct] = useState<ProductTrending[]>([])
  const dispatch = useDispatch()
  useEffect(() => { getProductTrending() }, [])

  const getProductTrending = async () => {
    try {
      const res = await api.product.getProductTrending()
      setListProduct(res.data)
    } catch (err) {
    }
  }

  const addProductToCart = (productAdd: ProductResponse) => {
    const product = cart.productIds.find(item => item.product.id === productAdd.id)
    if (product) {
      notification.warning({
        message: 'Thông báo',
        description: 'Sản phẩm đã được thêm vào giỏ hàng! list'
      })
    }
    else {
      const cartNew: CartRequest = {
        userId: userInfo.id,
        totalAmount: cart.totalAmount + productAdd.price,
        orderNumber: 0,
        productIds: [...cart.productIds, { product: productAdd, quantity: 1 }]
      }
      dispatch(updateCart(cartNew))
    }
  }

  return (
    <div className="product-container">
      <Row gutter={24}>
        {listProduct.map((item: ProductTrending, index: number) => {
          if (index < 6)
            return (
              <Col key={index} xs={12} md={8} lg={6} xl={4}>
                <Badge.Ribbon text={`Đã bán: ${item.total_sale}`} color='green'>
                  <ProductCard
                    productInfo={item}
                    addProductToCart={addProductToCart}
                  />
                </Badge.Ribbon>
              </Col>
            )
        })}
      </Row>
    </div>
  )
}
