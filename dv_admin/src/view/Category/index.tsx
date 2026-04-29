import { DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table';
// import { CategoryType } from '../../../dataType/category';
// import { ProductType } from '../../../dataType/product';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import TableListProduct from '../../../components/TableListProduct';
// import ModalProductDetail from './ModalProductDetail';
export default function Customer() {
  const navigate = useNavigate()
  const [loadingTable, setloadingTable] = useState(false)
  const [productName, setProductName] = useState('')
  const [showModalAddProduct, setShowModalAddProduct] = useState(false)
  const [showModalDetailProduct, setShowModalDetailProduct] = useState(false)
  const handleRemoveProduct = (e: any, record: any) => {
    e.stopPropagation()
    console.log(record, 'keytest')
  }
  const _renderButtonDelete = (text: any, record: any, index: number) => {
    return (
      <Popconfirm
        title="Bạn có chắc chắn xóa sản phẩm?"
        onConfirm={(e) => handleRemoveProduct(e, record)}
        onCancel={(e: any) => e.stopPropagation()}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined onClick={(e) => e.stopPropagation()} />
      </Popconfirm>
    )
  }
  const handleOnRowTable = (record: any) => {
    navigate(`/category/${record.category_cd}`, { state: record })
  }
  const onchangeNameSearch = (e: any) => {
    setProductName(e.target.value)
    console.log(e.target.value, 'name')
  }
  const handleAddCustomer = () => {
    console.log('Add san pham moi')
  }
  const _renderHeaderProduct = () => {
    return (
      <div className='header-category'>
        <div className='title-category'>
          <h4>Sản phẩm</h4>
          <Button className='button' onClick={() => setShowModalAddProduct(true)}>
            <PlusCircleOutlined />
            Thêm mới
          </Button>
        </div>
        <Input
          className="header-search"
          placeholder="Nhập tên sản phẩm..."
          value={productName}
          onChange={onchangeNameSearch}
          prefix={<SearchOutlined />}
          style={{ width: '300px' }}
        />
      </div>
    )
  }
  const _renderTableProduct = () => {
    return (
      <div className='list-category-container'>
        {/* <TableListProduct
          listProduct={[]}
          loadingTable={false}
          onrowTable={() => { }}
        /> */}
      </div>
    )
  }
  return (
    <div className='category-container'>
      {_renderHeaderProduct()}
      {_renderTableProduct()}
      {/* {showModalAddProduct &&
        // <ModalProductDetail
        //   title='Thêm sản phẩm mới'
        //   handleCancel={() => setShowModalAddProduct(false)}
        //   handleOk={() => { }}
        // />
      } */}
      {/* {showModalDetailProduct &&
        <ModalProductDetail
          title='Chi tiết sản phẩm'
          handleCancel={() => setShowModalDetailProduct(false)}
          handleOk={() => { }}
        />
      } */}
    </div>
  )
}