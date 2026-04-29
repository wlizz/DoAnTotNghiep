import { DeleteOutlined, DoubleLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row, Select, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../dataType/product";
import { MoneyFormat } from "../../../Ultils/MoneyFormat";
import ModalProviderDetail from "../Provider/ModalProviderDetail";
import './import-create-new.scss'

export default function ImportCreateNew() {
  const navigate = useNavigate()
  const [showModalAddProvider, setShowModalAddProvider] = useState(false)
  const handleDeleteProduct = (e: any, record: ProductType) => {
    e.stopPropagation()
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
  const _renderHeader = () => {
    return (
      <div className="import-create-header">
        <DoubleLeftOutlined onClick={() => navigate('/import')} />
        <h4> Tạo phiếu nhập kho mới </h4>
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
        <h5>Chọn sản phẩm: </h5>
        <Select style={{ width: '85%' }} />
      </div>
    )
  }
  const _renderProductSelect = () => {
    return (
      <Table
        columns={columns}
      />
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
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price_import',
      key: 'price_import',
      render: (text: ProductType[]) => <div>{text.length}</div>,
    },
    // {
    //   title: 'Đơn vị',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   render: (text: ProductType[]) => <div>{text.length}</div>,
    // },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: ProductType[]) => <div>{text.length}</div>,
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'category_cd',
      key: 'category_cd',
      render: (text: ProductType[]) => <div>{text.length}</div>,
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      key: 'delete',
      render: _renderButtonDelete,
    },

  ];
  const _rendeFormSelectProvider = () => {
    return (
      <div className="form-select-provider">
        <h5>Chọn nhà cung cấp: </h5>
        <div className="form-select-provider-add">
          <Select style={{ width: '100%' }} />
          <Tooltip placement="top" title='Thêm nhà cung cấp mới'>
            <Button className='button' onClick={() => setShowModalAddProvider(true)}>Thêm</Button>
          </Tooltip>
        </div>
      </div>
    )
  }
  const _renderFormPayMent = () => {
    return (
      <div className="form-payment-import">
        <h5>Thông tin thanh toán: </h5>
        {_renderFormPaymentItem('Tổng tiền')}
        {_renderFormPaymentItem('Giảm giá')}
        {_renderInfoPayment('Thành tiền', 1000000)}
        {_renderFormPaymentItem('Thanh toán')}
        {_renderInfoPayment('Còn nợ', 20000)}
      </div>
    )
  }
  const _renderInfoPayment = (title: string, value: number) => {
    return (
      <div className="info-payment-import-item">
        <p>{title}: </p>
        <p className="info-payment">{MoneyFormat(value)}</p>
      </div>
    )
  }
  const _renderFormPaymentItem = (title: string) => {
    return (
      <div className="form-payment-import-item">
        <p>{title}: </p>
        <InputNumber style={{ width: '100%' }} />
      </div>
    )
  }
  return (
    <div className="import-create-new-container">
      {_renderHeader()}
      <Row gutter={24}>
        <Col xs={24} md={18}>
          {_renderFormSelectProduct()}
          {_renderProductSelect()}
        </Col>
        <Col xs={24} md={6}>
          {_rendeFormSelectProvider()}
          {_renderFormPayMent()}
        </Col>
      </Row>
      {showModalAddProvider &&
        <ModalProviderDetail
          title='Thêm nhà cung cấp mới'
          handleCancel={() => setShowModalAddProvider(false)}
          handleOk={() => { }}
        />
      }
    </div>
  )
}
