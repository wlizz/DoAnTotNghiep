import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Switch } from 'antd'
import { ProductCreateDto, ProductResponse } from '../../../dataType/product';
import { CategoryResponse } from '../../../dataType/category';
import api from '../../../api';

type Props = {
  title: string,
  handleOk: () => void,
  handleCancel: () => void,
  listCategory: CategoryResponse[],
  getListCate: () => void
  product: ProductResponse
}
const { Option } = Select
export default function ModalProductDetail(props: Props) {
  const { title, handleOk, handleCancel, listCategory, getListCate, product } = props
  const updateProduct = async (data: ProductCreateDto) => {
    try {
      await api.product.updateProduct(product.id, { ...data, status: data.status ? 1 : 0 })
      notification.success({
        message: 'Thông báo',
        description: 'Cập nhật sản phẩm thành công!'
      })
      handleCancel()
      getListCate()
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Cập nhật sản phẩm thất bại!'
      })
    }
  }
  const onFinish = async (data: ProductCreateDto) => {
    updateProduct(data)
  }

  const _renderFormInputItem = (label: string, name: string, message: string, required: boolean, value: string) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: required, message: message }]}
          initialValue={value}
        >
          <Input />
        </Form.Item>
      </Col >
    )
  }

  const _renderFormTextAra = (label: string, name: string, message: string, required: boolean, value: string) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: required, message: message }]}
          initialValue={value}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
    )
  }

  const _renderFormSelectItem = () => {
    return (
      <Col xs={24}>
        <Form.Item
          name="categoryId"
          label="Loại danh mục"
          rules={[{ required: true, message: 'Nhập loại danh mục!' }]}
          initialValue={product.category.id}
        >
          <Select placeholder="Nhập loại danh mục" >
            {listCategory.map((item: CategoryResponse, index: number) => {
              return <Option value={item.id} key={index}>{item.name}</Option>
            })}
          </Select>
        </Form.Item>
      </Col>
    )
  }
  const _renderFormInputMoney = (label: string, name: string, message: string, value: number) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: true, message: message }]}
          initialValue={value}
        >
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ minWidth: '190px', margin: '0px' }}
          />
        </Form.Item>
      </Col>
    )
  }

  const _renderButtonFotter = () => {
    return (
      <Row gutter={24}>
        <Col xs={24} sm={24} lg={12}> </Col>
        <Col xs={24} sm={24} lg={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={handleCancel} style={{ marginRight: 2 }}>Hủy</Button>
          <Button htmlType='submit' className='button'>{'Lưu'}</Button>
        </Col>
      </Row>
    )
  }

  const _renderFormSwitch = () => {
    return (
      <Col xs={24}>
        <Form.Item label="Kinh doanh" name='status'>
          <Switch defaultChecked={product.status ? true : false} />
        </Form.Item>
      </Col>
    )
  }

  return (
    <Modal
      title={title}
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      style={{ minWidth: '500px' }}
    >
      <div>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={24} style={{ width: "100%" }}>
            {_renderFormInputItem("Tên sản phẩm", "name", 'Nhập tên sản phẩm!', true, product.name)}
            {_renderFormSelectItem()}
            {_renderFormInputMoney("Giá bán", "price", 'Nhập giá bán sản phẩm!', product.price)}
            {_renderFormInputItem("Kích thước", "size", 'Nhập kích thước sản phẩm!', true, product.size)}
            {_renderFormInputItem("Trọng lượng", "weight", 'Nhập trọng lượng sản phẩm!', true, product.weight)}
            {/* {_renderFormInputItem("Đơn vị", "unit", 'Nhập đơn vị sản phẩm!', true, product.unit)} */}
            {_renderFormTextAra("Link ảnh", "image", 'Nhập hình ảnh sản phẩm!', false, product.image)}
            {_renderFormTextAra("Mô tả", "description", 'Nhập mô tả sản phẩm!', false, product.description)}
            {_renderFormSwitch()}
          </Row>
          {_renderButtonFotter()}
        </Form>
      </div>
    </Modal>
  )
}

