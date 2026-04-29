import { SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react"
import FormInput from "../../../components/FormInput"
import FormRangerPicker from "../../../components/FormRangerPicker"
import { RevenueType } from "../../../dataType/revenue"
import { MoneyFormat } from "../../../Ultils/MoneyFormat"

export default function Revenue() {
  const [loadingTable, setLoadingTable] = useState(false)
  const _renderHeader = () => {
    return (
      <h4> Báo cáo doanh thu</h4>
    )
  }
  const handleSearch = () => {

  }
  const data: RevenueType[] = [
    {
      date: '01/20/2021',
      total_invoice: 2,
      revenue: 450000,
      total_discount: 10000,
      total_debt: 20000,
      capital: 300000,
      benefit: 120000,
    },
    {
      date: '01/20/2021',
      total_invoice: 2,
      revenue: 450000,
      total_discount: 10000,
      total_debt: 20000,
      capital: 300000,
      benefit: 120000,
    },
    {
      date: '01/20/2021',
      total_invoice: 2,
      revenue: 450000,
      total_discount: 10000,
      total_debt: 20000,
      capital: 300000,
      benefit: 120000,
    }
  ]
  const columns: ColumnsType<RevenueType> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'total_invoice',
      key: 'total_invoice',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Thu nhập',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Tổng giảm',
      dataIndex: 'total_discount',
      key: 'total_discount',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Tổng nợ',
      dataIndex: 'total_debt',
      key: 'total_debt',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Tiền vốn',
      dataIndex: 'capital',
      key: 'capital',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'benefit',
      key: 'benefit',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
  ];
  const _renderFromFilter = () => {
    return (
      <Form layout="horizontal" style={{ marginTop: '10px' }} >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <FormInput
              label="Tên sản phẩm"
              name="product_name"
            />
          </Col>
          <Col xs={24} md={10}>
            <FormRangerPicker
              label="Thời gian"
              name="date"
              style={{ width: '100%', height: '40px' }}
            />
          </Col>
          <Col xs={24} md={4}>
            <div className='d-flex justify-content-end'>
              <Button className="button" onClick={handleSearch}> Tìm kiếm
                <SearchOutlined style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </Col>
        </Row>
      </Form >
    )
  }
  const _renderTableReportProduct = () => {
    return (
      <Table
        rowKey={'table-category'}
        columns={columns}
        dataSource={data}
        loading={loadingTable}
      />
    )
  }
  return (
    <div className="category-container">
      {_renderHeader()}
      {_renderFromFilter()}
      {_renderTableReportProduct()}
    </div>
  )
}
