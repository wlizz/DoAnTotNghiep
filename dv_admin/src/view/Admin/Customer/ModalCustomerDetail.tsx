import { Button, Col, Form, Input, Modal, notification, Row } from 'antd'
import { useState } from 'react';
import api from '../../../api';
import { CustomerResponse, CustomerUpdate } from '../../../dataType/custormer';
type Props = {
  title: string,
  customerInfo: CustomerResponse;
  handleOk: () => void,
  handleCancel: () => void,
  getAllCustomer: () => void
}
export default function ModalCustomerDetail(props: Props) {
  const { title, customerInfo, handleOk, handleCancel, getAllCustomer } = props
  const [edit, setEdit] = useState(false)

  const updateCustomer = async (data: CustomerUpdate) => {
    try {
      await api.customer.updateCustormer(customerInfo.id, data)
      notification.success({
        message: 'Thông báo',
        description: 'Cập nhật thông tin khách hàng thành công'
      })
      getAllCustomer()
      handleCancel()
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Cập nhật thất bại'
      })
    }
  }

  const onFinish = (e: CustomerUpdate) => {
    if (edit) {
      updateCustomer(e)
    } else {
      setEdit(!edit)
    }
  }
  const onFinishFailed = (e: any) => {
  }

  const _renderFormInputItem = (label: string, name: string, message: string, required: boolean, value: string | number, pattern?: any) => {
    return (
      <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Form.Item
          label={label}
          name={name}
          rules={[
            {
              required: required,
              message: message
            },
            {
              pattern: pattern,
              message: "Định dạng không đúng"
            }
          ]}
          initialValue={value}
        >
          <Input disabled={!edit} />
        </Form.Item>
      </Col >
    )
  }
  const _renderButtonFotter = () => {
    return (
      <Row gutter={24}>
        <Col xs={24} sm={24} lg={12}> </Col>
        <Col xs={24} sm={24} lg={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button className='button' htmlType='submit'>{edit ? "Lưu" : 'Chỉnh sửa'}</Button>
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
      style={{ minWidth: '700px' }}
    >
      <div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={24}>
            {_renderFormInputItem("Tên khách hàng", "name", 'Nhập tên khách hàng!', true, customerInfo.name)}
            {_renderFormInputItem("Số điện thoại", "phone_no", 'Nhập số điên thoại!', true, customerInfo.phone_no, "(\\+84|0)[0-9]{9}$|^(0)[0-9]{10}$")}
            {_renderFormInputItem("Địa chỉ", "address", 'Nhập địa chỉ!', false, customerInfo.address)}
            {_renderFormInputItem("Mật khẩu", "password", 'Nhập mật khẩu!', false, '')}
          </Row>
          {_renderButtonFotter()}
        </Form>
      </div>
    </Modal>
  )
}
