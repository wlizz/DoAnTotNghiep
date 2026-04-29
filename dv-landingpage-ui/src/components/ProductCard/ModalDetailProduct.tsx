import { Button, Col, Modal, Row } from 'antd'
import { ProductResponse } from '../../dataType/product'
import { MoneyFormat } from '../../Untils/money'
import './index.scss'

type Props = {
  closeModal: () => void
  productInfo: ProductResponse
  addProductToCart: (data: ProductResponse) => void
}
export default function ModalDetailProduct(props: Props) {
  const { closeModal, productInfo, addProductToCart } = props

  const _renderProductInfo = (title: string, name: string, value: string | number) => {
    return (
      <div className='product-info'>
        <p className='title-info'>{title} :</p>
        <p className={name}>{value}</p>
      </div>
    )
  }

  const _renderDescription = () => {
    return (
      <div className='product-description'>
        <p className='title-info'>Mô tả :</p>
        <p className='title-description'>{productInfo.description ? productInfo.description : ''}</p>
      </div>
    )
  }
  return (
    <Modal
      title='Chi tiết sản phẩm'
      visible={true}
      onOk={closeModal}
      onCancel={closeModal}
      width={1200}
    >
      <Row gutter={[24, 12]} className='modal-detail-container'>
        <Col xs={24} md={12}>
          <div className='product-detail-controller'>
            <img src={productInfo.image} alt='img' />
          </div>
        </Col>
        <Col xs={24} md={12}>
          {_renderProductInfo('Tên sản phẩm', 'title-name', productInfo.name ? productInfo.name : '')}
          {/* {_renderProductInfo('Đơn vị', 'title-unit', productInfo.unit ? productInfo.unit : '')} */}
          {_renderProductInfo('Giá', 'title-price', productInfo.price ? MoneyFormat(productInfo.price) : '')}
          {_renderProductInfo('Kích thước', 'title-size', productInfo.size ? productInfo.size : '')}
          {_renderProductInfo('Trọng lượng', 'title-weight', productInfo.weight ? productInfo.weight : '')}
          {_renderDescription()}
          <Button className='button-submit' onClick={() => addProductToCart(productInfo)}>THÊM VÀO GIỎ HÀNG</Button>
        </Col>
      </Row>
    </Modal>
  )
}
