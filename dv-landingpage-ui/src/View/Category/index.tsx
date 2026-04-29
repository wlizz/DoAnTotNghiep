
import { Badge, Checkbox, Col, Input, Pagination, Row, notification } from 'antd'
import { BANNER_MAY1 } from '../../assets'
import { useEffect, useState } from 'react'
import api from '../../api'
import { ProductResponse, ProductSearchDto } from '../../dataType/product'
import ProductCard from '../../components/ProductCard'
import { CartRequest } from '../../dataType/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducer'
import { updateCart } from '../../redux/action/cart'
import { SearchOutlined } from '@ant-design/icons'
import { CategoryResponse } from '../../dataType/category'
import { useLocation, useParams } from 'react-router-dom'

export default function Category() {
  const [listProduct, setListProduct] = useState<ProductResponse[]>([])
  const location = useLocation()
  const selectedProductId = location.state?.productId;
  const param: any = useParams()

  const cart: CartRequest = useSelector((state: RootState) => state.cart)
  const userInfo = useSelector((state: RootState) => state.auth)

  const [page, setPage] = useState(1)
  const [size, setSize] = useState(12)
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch()

  const [productName, setProductName] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const [listCategory, setListCategory] = useState<CategoryResponse[]>([])
  const [listCate, setListCate] = useState<number[]>([])

  //  Load category
  useEffect(() => {
    getAllCategory()
  }, [])

  //  Load product
  useEffect(() => {
    if (listCate.length > 0) {
      getAllProduct()
    }
  }, [page, size, listCate, productName, maxPrice, selectedProductId])
  useEffect(() => {
    if (selectedProductId) {
      setProductName("");   // tránh conflict search
      setPage(1);           // reset pagination
    }
  }, [selectedProductId]);
  //  GET CATEGORY
  const getAllCategory = async () => {
    try {
      const res = await api.category.getAllCategory()

      const active = res.data.filter(
        (item: CategoryResponse) => item.active_flg !== 0
      )

      setListCategory(active)

      //  FIX theo URL
      if (param.id) {
        setListCate([Number(param.id)])
      } else {
        setListCate(active.map((item: CategoryResponse) => item.id))
      }

    } catch (err) { }
  }

  //  GET PRODUCT
  const getAllProduct = async () => {
    try {
      const data: ProductSearchDto = {
        categoryId: listCate,
        name: productName
      }

      const res = await api.product.getAllProduct(
        1,
        selectedProductId ? 1000 : size, // 👈 FIX Ở ĐÂY
        data
      )

      //  filter giá
      const filtered: ProductResponse[] = res.data.data.filter((item: ProductResponse) => {
        if (!maxPrice) return true
        return item.price <= maxPrice
      })

      //  FIX: chỉ lấy 1 sản phẩm nếu đi từ ChatBox
      let finalList: ProductResponse[] = filtered

      if (selectedProductId) {
        finalList = filtered.filter(
          (item: ProductResponse) => item.id === selectedProductId
        )
      }

      setListProduct(finalList)
      setTotal(finalList.length)

    } catch (err) {
      notification.error({
        message: 'Không lấy được danh sách sản phẩm',
      })
    }
  }

  //  ADD TO CART
  const addProductToCart = (productAdd: ProductResponse) => {
    const product = cart.productIds.find(item => item.product.id === productAdd.id)

    if (product) {
      notification.warning({
        message: 'Thông báo',
        description: 'Sản phẩm đã được thêm vào giỏ hàng! '
      })
    } else {
      const cartNew: CartRequest = {
        userId: userInfo.id,
        totalAmount: cart.totalAmount + productAdd.price,
        orderNumber: 0,
        productIds: [...cart.productIds, { product: productAdd, quantity: 1 }]
      }
      dispatch(updateCart(cartNew))

      notification.success({
        message: 'Thông báo',
        description: 'Thêm vào giỏ hàng thành công!'
      })
    }
  }

  //  PAGINATION
  const onChange = (pageNumber: number, pageSize: number) => {
    setPage(pageNumber)
    setSize(pageSize)
  }

  //  CATEGORY FILTER
  const onChangeCheckGroup = (checkedValues: any) => {
    setPage(1)
    setListCate(checkedValues)
  }

  const _renderCheckBoxGroup = () => {
    return (
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChangeCheckGroup}
        value={listCate}
      >
        <Row>
          {listCategory.map((item: CategoryResponse) => (
            <Col xs={24} key={item.id} className='ps-3 my-2'
              style={{ backgroundColor: '#f1f1f1', borderRadius: '5px' }}
            >
              <Checkbox value={item.id} className='py-2'>
                {item.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    )
  }

  return (
    <div className='category-container'>

      {/* Banner */}
      <div className='header-category'>
        <img src={BANNER_MAY1} className='image-banner' />
      </div>

      {/*  SEARCH + PRICE */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10,
        margin: '10px 0px',
      }}>
        <Input.Search
          placeholder="Nhập tên sản phẩm..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onSearch={(value) => {
            setPage(1)
            setProductName(value)
          }}
          style={{ width: 300 }}
          size='large'
        />
        <Input
          placeholder="Giá tối đa (nghìn)"
          type="number"
          value={maxPrice ? maxPrice / 1000 : ''}
          onChange={(e) => {
            setPage(1)
            const value = Number(e.target.value)
            setMaxPrice(value * 1000)
          }}
          style={{ width: 200 }}
        />
      </div>

      <Row gutter={24}>

        {/* LEFT FILTER */}
        <Col xs={24} md={5}>
          <p>Danh mục sản phẩm</p>
          {_renderCheckBoxGroup()}
        </Col>

        {/* PRODUCT LIST */}
        <Col xs={24} md={19}>
          <Row gutter={12}>
            {listProduct.map((item: ProductResponse) => (
              <Col xs={12} md={8} lg={6} key={item.id}>
                {item.status ? (
                  <ProductCard
                    productInfo={item}
                    addProductToCart={addProductToCart}
                  />
                ) : (
                  <Badge.Ribbon text="Ngừng kinh doanh" color='red'>
                    <ProductCard
                      productInfo={item}
                      addProductToCart={addProductToCart}
                    />
                  </Badge.Ribbon>
                )}
              </Col>
            ))}
          </Row>
        </Col>

      </Row>

      {/* PAGINATION */}
      <Pagination
        current={page}
        pageSize={size}
        total={total}
        onChange={onChange}
        showSizeChanger
        className='my-5'
        style={{ textAlign: 'center' }}
      />

    </div>
  )
}