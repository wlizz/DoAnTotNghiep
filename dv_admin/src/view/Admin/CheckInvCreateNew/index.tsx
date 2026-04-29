import { DeleteOutlined, DoubleLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../dataType/product";
import '../ImportCreateNew/import-create-new.scss'

export default function ImportCreateNew() {
  const navigate = useNavigate()
  const data: ProductType[] = [
    {
      product_cd: 'S0001',
      product_name: 'Bua',
      category_cd: 'C0001',
      image: '',
      price: 200000,
      price_import: 180000,
      amount: 100,
      unit: 'Cai',
    },
    {
      product_cd: 'S0001',
      product_name: 'Bua',
      category_cd: 'C0001',
      image: '',
      price: 200000,
      price_import: 180000,
      amount: 100,
      unit: 'Cai',
    },
    {
      product_cd: 'S0001',
      product_name: 'Bua',
      category_cd: 'C0001',
      image: '',
      price: 200000,
      price_import: 180000,
      amount: 100,
      unit: 'Cai',
    }
  ]
  const _renderHeader = () => {
    return (
      <div className="import-create-header">
        <DoubleLeftOutlined onClick={() => navigate('/check')} />
        <h4> Tạo phiếu kiểm kho mới </h4>
        <Button className='button' onClick={() => { }}>
          <PlusCircleOutlined />
          Tạo phiếu
        </Button>
      </div>
    )
  }
  const _renderFormSelectProduct = () => {
    return (
      <div className="form-select-product">
        <h5 style={{ minWidth: '200px' }}>Chọn sản phẩm: </h5>
        <Select style={{ width: '100%' }} />
      </div>
    )
  }
  const renderFormInputNumber = (text: any, record: ProductType, index: number) => {
    return (
      <InputNumber
        style={{ width: '50%' }}
        defaultValue={text}
      >
      </InputNumber>
    )
  }
  const _renderProductSelect = () => {
    return (
      <Table
        columns={columns}
        dataSource={data}
      />
    )
  }
  const handleDeleteProduct = (text: any, record: ProductType) => {

  }
  const _renderButtonDelete = (text: any, record: ProductType, index: number) => {
    return (
      <Popconfirm
        title="Bạn có chắc chắn xóa sản phẩm?"
        onConfirm={(e) => handleDeleteProduct(e, record)}
        onCancel={(e: any) => e.stopPropagation()}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined onClick={(e) => e.stopPropagation()} />
      </Popconfirm>
    )
  }
  const columns: ColumnsType<ProductType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: ProductType, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'product_cd',
      key: 'product_cd',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số lượng thực tế',
      dataIndex: 'amount',
      key: 'amount',
      render: renderFormInputNumber
    },
    {
      title: 'Xóa',
      dataIndex: 'remove',
      key: 'remove',
      render: _renderButtonDelete
    },

  ];
  return (
    <div className="import-create-new-container">
      {_renderHeader()}
      <Row gutter={24}>
        <Col xs={24} md={24}>
          {_renderFormSelectProduct()}
          {_renderProductSelect()}
        </Col>
      </Row>
    </div>
  )
}
