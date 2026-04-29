import { Modal, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { CheckInvDetail } from '../../../dataType/checkInventory';

type Props = {
  onOk: () => void,
  onCancel: () => void,
  checkInvDetail: CheckInvDetail[]
}
export default function ModalCheckInvDetail(props: Props) {
  const { onCancel, onOk, checkInvDetail } = props
  const columns: ColumnsType<CheckInvDetail> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'product_id',
      key: 'product_id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount_old',
      key: 'amount_old',
      render: (text: string) => <div>{text}</div>,
      align: 'center',
    },
    {
      title: 'Số lượng thực',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <div>{text}</div>,
      align: 'center',
    },
  ];
  const handleOnRowTable = (record: CheckInvDetail) => {

  }
  const renderTableProductCheck = () => {
    return (
      <div className='list-category-container'>
        <Table
          rowKey={'table-category'}
          columns={columns}
          dataSource={checkInvDetail}
          loading={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { handleOnRowTable(record) },
            };
          }}
        />
      </div>
    )
  }
  return (
    <Modal
      visible={true}
      onCancel={onCancel}
      onOk={onOk}
      title="Chi tiết phiếu kiểm kho"
      width={800}
    >
      {renderTableProductCheck()}
    </Modal>
  )
}
