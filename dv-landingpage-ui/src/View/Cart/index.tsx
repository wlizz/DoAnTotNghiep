import { useDispatch, useSelector } from 'react-redux'
import './cart.scss'
import { Button, Col, Input, Popconfirm, Row, Table, notification } from 'antd'
import { RootState } from '../../redux/reducer'
import { ColumnType } from 'antd/es/table'
import { CartRequest, ProductCart } from '../../dataType/cart'
import { MoneyFormat } from '../../Untils/money'
import { DeleteOutlined } from '@ant-design/icons';
import { clearCart, updateCart } from '../../redux/action/cart'
import { OrderCreateNew } from '../../dataType/order'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react'
export default function Cart() {
  const cart: CartRequest = useSelector((state: RootState) => state.cart)
  const userInfo = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCreateInvoice = async () => {
    setLoading(true)
    try {
      if (!userInfo.name) {
        notification.warning({
          message: 'Thông báo',
          description: 'Bạn cần đăng nhập để hoàn thành đơn hàng!'
        })
        setLoading(false)
        return
      }
      if (!userInfo.phone_no || !userInfo.address) {
        notification.warning({
          message: "Thông báo",
          description: "Yêu cầu nhập đầy đủ thông tin"
        })
        setLoading(false)
        return
      }
      const data: OrderCreateNew = {
        totalAmount: cart.totalAmount,
        orderNumber: cart.orderNumber,
        userId: cart.userId,
        productIds: cart.productIds.map(item => {
          return {
            id: item.product.id,
            quantity: item.quantity
          }
        })
      }
      await api.order.createNewOrder(data)
      notification.success({
        message: 'Thông báo',
        description: "Tạo đơn hàng thành công vui lòng chờ xác nhận"
      })
      navigate('/order')
      dispatch(clearCart())
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: "Tạo đơn hàng thất bại"
      })
    } finally {
      setLoading(false)
    }
  }

  const _renderNameProduct = (text: any, record: ProductCart, index: number) => {
    return (
      <p>{record.product.name}</p>
    )
  }

  const _renderPrice = (text: any, record: ProductCart, index: number) => {
    return (
      <p>{MoneyFormat(record.product.price)}</p>
    )
  }

  const _renderTotalPrice = (text: any, record: ProductCart, index: number) => {
    return (
      <p>{MoneyFormat(record.product.price * record.quantity)}</p>
    )
  }

  const _renderImage = (text: any, record: ProductCart, index: number) => {
    return (
      <img src={record.product.image} style={{ height: "50px" }} />
    )
  }

  const deleteCategory = (record: ProductCart) => {
    const product = cart.productIds.filter(item => item.product.id !== record.product.id)
    dispatch(updateCart({
      ...cart,
      productIds: product
    }))
  }

  const renderRemove = (text: any, record: ProductCart, index: number) => {
    return (
      <Popconfirm
        placement="top"
        title={'Bạn có chắn chắn muốn xóa sản phẩm khỏi giỏ hàng'}
        description={''}
        onConfirm={() => deleteCategory(record)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined color='red' />
      </Popconfirm>
    )
  }

  const renderQuantity = (text: any, record: ProductCart, index: number) => {
    return (
      <Input defaultValue={record.quantity} style={{ width: '60px' }} type='number' min={1} onChange={(e) => handleChange(e, record)} ></Input>
    )
  }

  const handleChange = (e: any, record: ProductCart) => {
    cart.productIds.forEach(item => {
      if (item.product.id === record.product.id) {
        item.quantity = Number(e.target.value)
      }
    })
    dispatch(updateCart({ ...cart }))
  }

  const column: ColumnType<ProductCart>[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: ProductCart, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'id',
      key: 'id',
      render: _renderNameProduct,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'id',
      key: 'id',
      render: _renderImage
    },
    {
      title: 'Giá',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: _renderPrice
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: renderQuantity
    },
    {
      title: 'Thành tiền',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: _renderTotalPrice
    },
    {
      title: 'Xóa',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: renderRemove,
    },
  ]

  const _renderInfoCheckout = () => {
    return (
      <div className='info-checkout'>
        <h5>
          Thông tin thanh toán
          <Button className='mx-2' style={{ border: 'none', color: 'blue' }} onClick={() => navigate('/user')}>
            <EditOutlined />  Sửa
          </Button>
        </h5>
        {_renderInfoCheckOut('Tên:', userInfo.name)}
        {_renderInfoCheckOut('Email:', userInfo.email)}
        {_renderInfoCheckOut('Địa chỉ:', userInfo.address)}
        {_renderInfoCheckOut('SĐT:', userInfo.phone_no)}
        {_renderTotalMoney()}
        <Button
          className='button'
          onClick={handleCreateInvoice}
          style={{ marginBottom: '30px', fontWeight: 700 }}
          size='large'
          disabled={!cart.productIds || cart.productIds.length === 0}
          loading={loading}
        >
          TẠO ĐƠN
        </Button>
      </div>
    )
  }

  const _renderInfoCheckOut = (title: string, value: string) => {
    return (
      <div className='checkout-info'>
        <p>{title}</p>
        <Input defaultValue={value} style={{ maxWidth: '300px' }} disabled={true}></Input>
      </div>
    )
  }

  const _renderTotalMoney = () => {
    return (
      <div className='checkout-info-pay'>
        <p className='text'> Tổng thanh toán  </p>
        <p className='value'>{MoneyFormat(cart.totalAmount)}</p>
      </div>
    )
  }

  return (
    <div className='cart-container'>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <h5 >Danh sách sản phẩm</h5>
          <Table dataSource={cart.productIds} columns={column} pagination={false} />
        </Col>
        <Col xs={24} md={8}>
          {_renderInfoCheckout()}
        </Col>
      </Row>
    </div>
  )
}
