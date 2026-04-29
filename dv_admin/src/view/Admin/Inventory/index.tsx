import { SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react"
import FormInput from "../../../components/FormInput"
import FormRangerPicker from "../../../components/FormRangerPicker"
import { ReportProductType } from "../../../dataType/report"
import { MoneyFormat } from "../../../Ultils/MoneyFormat"

export default function Inventory() {
  const [loadingTable, setLoadingTable] = useState(false)
  const _renderHeader = () => {
    return (
      <h4> Báo cáo xuất nhập tồn </h4>
    )
  }
  const handleSearch = () => {

  }
  const data: ReportProductType[] = [
    {
      product_cd: 'S0011',
      product_name: 'Bua 1',
      total_import: 100,
      amount_import: 3000000,
      total_export: 60,
      amount_export: 8000000,
      total_remain: 40,
      unit: 'Cai',
    },
    {
      product_cd: 'S0012',
      product_name: 'Kim 1',
      total_import: 50,
      amount_import: 500000,
      total_export: 10,
      amount_export: 80000,
      total_remain: 40,
      unit: 'Chiec',
    },
    {
      product_cd: 'S0013',
      product_name: 'Tovit 1',
      total_import: 40,
      amount_import: 500000,
      total_export: 20,
      amount_export: 500000,
      total_remain: 20,
      unit: 'Hop',
    }
  ]
  const columns: ColumnsType<ReportProductType> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'product_cd',
      key: 'product_cd',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Tổng nhập',
      dataIndex: 'total_import',
      key: 'total_import',
      render: (text: string) => <div>{text}</div>,
      align: 'right',
    },
    {
      title: 'Giá trị nhập',
      dataIndex: 'amount_import',
      key: 'amount_import',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Tổng xuất',
      dataIndex: 'total_export',
      key: 'total_export',
      render: (text: string) => <div>{text}</div>,
      align: 'right',
    },
    {
      title: 'Giá trị xuất',
      dataIndex: 'amount_export',
      key: 'amount_export',
      render: (text: string) => <div>{MoneyFormat(text)}</div>,
      align: 'right',
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'total_remain',
      key: 'total_remain',
      render: (text: string) => <div>{text}</div>,
      align: 'right',
    },
    // {
    //   title: 'Đơn vị',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   render: (text: string) => <div>{text}</div>,
    // },
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
