import { Button, Col, Modal, Row, Table, Tag, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { InvoiceResponse, ProductInvoice, UpdateOrderDto } from "../../../dataType/invoice";
import { MoneyFormat } from "../../../Ultils/MoneyFormat";
import './modal-invoice-detail.scss'
import { checkStatus } from "../../../Ultils/Status";
import api from "../../../api";
type Props = {
  onOk: () => void,
  onCancel: () => void
  invoiceInfo: InvoiceResponse
  getListOrder: () => void
}
export default function ModalInvoiceDetail(props: Props) {
  const { onOk, onCancel, invoiceInfo, getListOrder } = props
  const listDetailInvoice = invoiceInfo.orderDetails
  const _renderInvoiceInfoItem = (title: string, value: string | number) => {
    return (
      <Col xs={24} md={12}>
        <div className="invoice-detail-info-item">
          <p className="title-item">{title}: </p>
          <p className="value-item">{value}</p>
        </div>
      </Col>
    )
  }
  const _renderTotalMoney = (text: number, record: any, index: number) => {
    const product = listDetailInvoice.find(item => item.productId = record.id)
    return (
      <>{product ? MoneyFormat(record.price * product.quantity) : 0}</>
    )
  }

  const _renderQuantityProduct = (text: number, record: any, index: number) => {
    const product = listDetailInvoice.find(item => item.productId = record.id)
    return (
      <p>{product ? product.quantity : 0}</p>
    )
  }

  const renderImage = (text: any, record: ProductInvoice, index: number) => {
    return (
      <div className='image-container'>
        <img src={text} alt='image' />
      </div>
    )
  }

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: ProductInvoice, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: renderImage,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: _renderQuantityProduct,
      align: 'center'
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: text => <p>{MoneyFormat(text)}</p>,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: _renderTotalMoney
    },
  ];
  const _renderInvoiceInfoItemNumber = (title: string, value: number) => {
    return (
      <Col xs={24} md={12}>
        <div className="import-detail-info-item">
          <p className="title-item">{title}: </p>
          <p className="value-item">{MoneyFormat(value)}</p>
        </div>
      </Col>
    )
  }
  const _renderStatus = () => {
    const status = checkStatus(invoiceInfo.status)
    return (
      <Col xs={24} md={12}>
        <div className="import-detail-info-item">
          <p className="title-item">Trạng thái: </p>
          <Tag color={status.color}>{status.name}</Tag>
        </div>
      </Col>
    )
  }
  const handleOnRowTable = (record: ProductInvoice) => {

  }

  const handleHuy = async (status: number) => {
    try {
      const id = invoiceInfo.id
      const data: UpdateOrderDto = {
        status: status
      }
      await api.invoice.upadteOrder(id, data)
      notification.success({
        message: "Thông báo",
        description: "Cập nhật đơn hàng thành công",
      })
      onCancel()
      getListOrder()
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: "Cập nhật hàng thất bại"
      })
    }
  }

  const _renderTableProductImport = () => {
    return (
      <Table
        rowKey={'table-category'}
        columns={columns}
        dataSource={invoiceInfo.products}
        loading={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { handleOnRowTable(record) },
          };
        }}
      />
    )
  }
  return (
    <Modal
      visible={true}
      onOk={onOk}
      onCancel={onCancel}
      title='Chi tiết hóa đơn'
      width={800}
      footer={

        <div className="button-footer">
          <Button danger onClick={() => handleHuy(0)}>Hủy đơn</Button>
          <div className="button-group">
            <Button onClick={onCancel}>Đóng</Button>
            {invoiceInfo.status !== 1 &&
              <Button className="button" onClick={() => handleHuy(1)}>Xác nhận</Button>
            }
          </div>
        </div>

      }
      className="modal-invoice-detail-container"
    >
      <Row gutter={[16, 8]}>
        {_renderInvoiceInfoItem('Mã hóa đơn', invoiceInfo.orderNumber)}
        {_renderInvoiceInfoItem('Tên khách hàng', invoiceInfo.user.name)}
        {_renderInvoiceInfoItem('Mã khách hàng', invoiceInfo.user.id)}
        {_renderInvoiceInfoItem('Địa chỉ', invoiceInfo.user.address)}
        {_renderInvoiceInfoItemNumber('Tổng đơn hàng', invoiceInfo.totalAmount)}
        {_renderInvoiceInfoItem('SĐT', invoiceInfo.user.phone_no)}
        {_renderStatus()}
      </Row>
      <div className="mt-3">
        {_renderTableProductImport()}
      </div>
    </Modal>
  )
}
