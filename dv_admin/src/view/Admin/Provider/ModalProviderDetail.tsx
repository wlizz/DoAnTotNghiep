import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { ProviderType } from '../../../dataType/provider';
type Props = {
  title: string,
  providerInfo?: ProviderType;
  handleOk: () => void,
  handleCancel: () => void,
}
export default function ModalProviderDetail(props: Props) {
  const { title, providerInfo, handleOk, handleCancel } = props
  const onFinish = (e: any) => {
    console.log(e, 'key')
  }
  const onFinishFailed = (e: any) => {
    console.log(e, 'key')
  }
  const _renderFormInputItem = (label: string, name: string, message: string, required: boolean, pattern?: any) => {
    return (
      <Col xs={24} sm={12} lg={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
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
        >
          <Input />
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
          {title === 'Thêm nhà cung cấp mới'
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
      style={{ minWidth: '750px' }}
    >
      <div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={24}>
            {_renderFormInputItem("Mã nhà cung cấp", "provider_cd", 'Nhập mã nhà cung cấp!', true)}
            {_renderFormInputItem("Tên nhà cung cấp", "provider_name", 'Nhập tên nhà cung cấp!', true)}
          </Row>
          <Row gutter={24}>
            {_renderFormInputItem("Số điện thoại", "provider_phone", 'Nhập số điên thoại!', true, "(\\+84|0)[0-9]{9}$|^(0)[0-9]{10}$")}
            {_renderFormInputItem("Địa chỉ", "provider_address", 'Nhập địa chỉ!', false)}
          </Row>
          {_renderButtonFotter()}
        </Form>
      </div>
    </Modal>
  )
}
