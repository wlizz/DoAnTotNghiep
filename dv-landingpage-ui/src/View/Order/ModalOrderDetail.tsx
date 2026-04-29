import { Modal, Table } from 'antd'
import { OrderRespose } from '../../dataType/order'
import { ColumnsType } from 'antd/es/table'
import { MoneyFormat } from '../../Untils/money'

type Props = {
  onOk: () => void,
  onCancel: () => void
  invoiceInfo: OrderRespose
  getListOrder: () => void
}

export default function ModalOrderDetail(props: Props) {
  const { onOk, onCancel, invoiceInfo, getListOrder } = props

  const listDetailInvoice = invoiceInfo.orderDetails

  const _renderQuantityProduct = (text: number, record: any, index: number) => {
    const product = listDetailInvoice.find(item => item.productId = record.id)
    return (
      <p>{product ? product.quantity : 0}</p>
    )
  }

  const _renderTotalMoney = (text: number, record: any, index: number) => {
    const product = listDetailInvoice.find(item => item.productId = record.id)
    return (
      <>{product ? MoneyFormat(record.price * product.quantity) : 0}</>
    )
  }

  const renderImage = (text: any, record: OrderRespose, index: number) => {
    return (
      <div className='image-container'>
        <img src={text} alt='image' style={{height: '50px'}} />
      </div>
    )
  }

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: OrderRespose, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'name',
      render: renderImage
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

  const handleOnRowTable = (record: OrderRespose) => {

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
    >
      <div className="mt-3">
        {_renderTableProductImport()}
        <p>Tổng hóa đơn : 
          <span style={{color:'red', fontWeight: 600}}>{MoneyFormat(invoiceInfo.totalAmount)} </span>
        </p>
      </div>
    </Modal>
  )
}
