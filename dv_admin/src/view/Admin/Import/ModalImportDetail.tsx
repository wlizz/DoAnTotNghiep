import { Col, Modal, Row, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ImportType, ProductImport } from "../../../dataType/import";
import { MoneyFormat } from "../../../Ultils/MoneyFormat";
import './modal-import-detail.scss'
type Props = {
  onOk: () => void,
  onCancel: () => void
  importInfo: ImportType
}
export default function ModalImportDetail(props: Props) {
  const { onOk, onCancel, importInfo } = props
  const _renderImportInfoItem = (title: string, value: string) => {
    return (
      <Col xs={24} md={12}>
        <div className="import-detail-info-item">
          <p className="title-item">{title}: </p>
          <p className="value-item">{value}</p>
        </div>
      </Col>
    )
  }
  const _renderTotalMoney = (text: number, record: ProductImport, index: number) => {
    return (
      <>{MoneyFormat(record.price_import * record.quanlity)}</>
    )
  }
  const columns: ColumnsType<ProductImport> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: ProductImport, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'product_cd',
      key: 'product_cd',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price_import',
      key: 'price_import',
      align: 'right',
      render: text => <p>{MoneyFormat(text)}</p>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quanlity',
      key: 'quanlity',
      align: 'right',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_debt',
      key: 'total_debt',
      align: 'right',
      render: _renderTotalMoney,
    },
  ];
  const _renderImportInfoItemNumber = (title: string, value: number) => {
    return (
      <Col xs={24} md={12}>
        <div className="import-detail-info-item">
          <p className="title-item">{title}: </p>
          <p className="value-item">{MoneyFormat(value)}</p>
        </div>
      </Col>
    )
  }
  const _renderStatusImport = () => {
    return (
      <Col xs={24} md={12}>
        <div className="import-detail-info-item">
          <p className="title-item">Trạng thái: </p>
          <Tag color={importInfo.status ? 'green' : 'red'}>{importInfo.status ? 'Đã hoàn thành' : 'Đã hủy'}</Tag>
        </div>
      </Col>
    )
  }
  const handleOnRowTable = (record: ProductImport) => {

  }
  const _renderTableProductImport = () => {
    return (
      <Table
        rowKey={'table-category'}
        columns={columns}
        dataSource={importInfo.product}
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
      title='Chi tiết phiếu nhập kho'
      width={800}
    >
      <Row gutter={[16, 8]}>
        {_renderImportInfoItem('Mã phiếu nhập', importInfo.import_cd)}
        {_renderImportInfoItemNumber('Tổng nhập', importInfo.total_amount)}
        {_renderImportInfoItem('Mã nhà cung cấp', importInfo.provider_cd)}
        {_renderImportInfoItemNumber('Tổng trả', importInfo.total_paid)}
        {_renderStatusImport()}
        {_renderImportInfoItemNumber('Còn nợ', importInfo.total_debt)}
      </Row>
      <div className="mt-3">
        {_renderTableProductImport()}
      </div>
    </Modal>
  )
}
