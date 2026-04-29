import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from 'antd'
import { ProductCreateDto, ProductResponse } from '../../../dataType/product';
import { CategoryResponse } from '../../../dataType/category';
import api from '../../../api';

type Props = {
  title: string,
  handleOk: () => void,
  handleCancel: () => void,
  listCategory: CategoryResponse[],
  getListCate: () => void
}
const { Option } = Select
export default function ModalAddProduct(props: Props) {
  const { title, handleOk, handleCancel, listCategory, getListCate } = props
  const onFinish = async (data: ProductCreateDto) => {
    try {
      await api.product.createNewProduct(data)
      notification.success({
        message: 'Thông báo',
        description: 'Tạo sản phẩm mới thành công!'
      })
      handleCancel()
      getListCate()
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Tạo sản phẩm mới thất bại!'
      })
    }
  }
  const onFinishFailed = (e: any) => {

  }

  const _renderFormInputItem = (label: string, name: string, message: string, required: boolean) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: required, message: message }]}
        >
          <Input />
        </Form.Item>
      </Col>
    )
  }

  const _renderFormTextAra = (label: string, name: string, message: string, required: boolean) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: required, message: message }]}
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
        >
          <Select placeholder="Nhập loại danh mục">
            {listCategory.map((item: CategoryResponse, index: number) => {
              return <Option value={item.id} key={index}>{item.name}</Option>
            })}
          </Select>
        </Form.Item>
      </Col>
    )
  }
  const _renderFormInputMoney = (label: string, name: string, message: string) => {
    return (
      <Col xs={24}>
        <Form.Item
          label={label}
          name={name}
          rules={[{ required: true, message: message }]}
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
          {title === 'Thêm sản phẩm mới'
            ? <Button className='button' htmlType='submit'>Thêm</Button>
            : <Button className='button'>Chỉnh sửa, Lưu</Button>}
        </Col>
      </Row>
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
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={24} style={{ width: "100%" }}>
            {_renderFormInputItem("Tên sản phẩm", "name", 'Nhập tên sản phẩm!', true)}
            {_renderFormSelectItem()}
            {_renderFormInputMoney("Giá bán", "price", 'Nhập giá bán sản phẩm!')}
            {_renderFormInputItem("Kích thước", "size", 'Nhập kích thước sản phẩm!', true)}
            {_renderFormInputItem("Trọng lượng", "weight", 'Nhập trọng lượng sản phẩm!', true)}
            {/* {_renderFormInputItem("Đơn vị", "unit", 'Nhập đơn vị sản phẩm!', true)} */}
            {_renderFormTextAra("Link ảnh", "image", 'Nhập hình ảnh sản phẩm!', false)}
            {_renderFormTextAra("Mô tả", "description", 'Nhập mô tả sản phẩm!', false)}
          </Row>
          {_renderButtonFotter()}
        </Form>
      </div>
    </Modal>
  )
}

