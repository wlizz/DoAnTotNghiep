import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Popconfirm, Tag, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { ProductResponse } from '../../dataType/product';
import api from '../../api';
import './table-product.scss'
import { MoneyFormat } from '../../Ultils/MoneyFormat';
type Props = {
  loadingTable: boolean;
  listProduct: ProductResponse[],
  getListProduct: () => void
  detailProduct: (data: ProductResponse) => void
}
export default function TableListProduct(props: Props) {
  const { loadingTable, listProduct, getListProduct, detailProduct } = props
  const handleDeleteProduct = async (e: any, record: ProductResponse) => {
    e.stopPropagation()
    try {
      await api.product.deleteProduct(record.id)
      notification.success({
        message: 'Thông báo',
        description: 'Xóa sản phẩm thành công!'
      })
      getListProduct()
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Xóa sản phẩm thất bại!'
      })
    }
  }
  const _renderButtonDelete = (text: any, record: ProductResponse, index: number) => {
    return (
      <Popconfirm
        title="Bạn có chắc chắn xóa sản phẩm?"
        onConfirm={(e) => handleDeleteProduct(e, record)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined />
      </Popconfirm>
    )
  }

  const handleDetailProduct = (record: ProductResponse) => {
    detailProduct(record)
  }

  const _renderButtonDetail = (text: any, record: ProductResponse, index: number) => {
    return (
      <FileSearchOutlined onClick={(e) => handleDetailProduct(record)} />
    )
  }

  const renderStatus = (text: any, record: ProductResponse, index: number) => {
    return (
      <Tag color={text ? 'green' : 'red'}>{text ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}</Tag>
    )
  }

  const renderCategory = (text: any, record: ProductResponse, index: number) => {
    return (
      <h5>{record.category.name}</h5>
    )
  }

  const renderImage = (text: any, record: ProductResponse, index: number) => {
    return (
      <div className='image-container'>
        <img src={text} alt='image' />
      </div>
    )
  }

  const columns: ColumnsType<ProductResponse> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: ProductResponse, index: number) => <a>{index + 1}</a>,
      width: 5,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'name',
      width: 15,
      render: renderImage
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 70,
    },
    // {
    //   title: 'Đơn vị tile',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   width: 20,
    // },
    {
      title: 'Khối lượng',
      dataIndex: 'weight',
      key: 'weight',
      width: 20,
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'name',
      width: 20,
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
      render: renderCategory,
      width: 20,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: renderStatus,
      width: 20,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      align: "right",
      render: (text) => <div>{MoneyFormat(text)}</div>,
      width: 20,
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      key: 'detai;',
      align: "center",
      render: _renderButtonDetail,
      width: 20,
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      key: 'delete',
      render: _renderButtonDelete,
      width: 10,
    },

  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={listProduct}
        loading={loadingTable}
        scroll={{ x: 900 }}
        pagination={false}
        rowKey={(record: ProductResponse) => `${record.id}`}
      />
    </>
  )
}
