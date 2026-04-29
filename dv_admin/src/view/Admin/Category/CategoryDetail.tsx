import { DoubleLeftOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TableListProduct from "../../../components/TableListProduct"
import { CategoryType } from "../../../dataType/category"
import { ProductResponse } from "../../../dataType/product"
import api from "../../../api"
import { LIMIT, PAGE_DEFAULT } from "../../../constants"

export default function CategoryDetail() {
  // const navagate = useNavigate()
  // const param = useParams()
  // const location = useLocation()
  // const categoryInfo: CategoryType = location.state as CategoryType
  // const [edit, setEdit] = useState(false)
  // const [listProduct, setListProduct] = useState<ProductResponse[]>([])
  // const [loading, setLoading] = useState(false)
  // const [page, setPage] = useState(PAGE_DEFAULT)
  // const [size, setSize] = useState(LIMIT)

  // const updateCategory = async () => {
  //   try {

  //   } catch (err) {

  //   }
  //   finally {
  //     setEdit(false)
  //   }
  // }

  // useEffect(() => {
  //   getAllProduct()
  // }, [page, size])

  // const getAllProduct = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await api.product.getAllProduct(page, size)
  //     const listpProduct = res.data.filter((item: ProductResponse) => item.category.id === Number(param.id))
  //     setListProduct(listpProduct)
  //   } catch (err) { }
  //   finally {
  //     setLoading(false)
  //   }
  // }

  // const handleEdit = () => {
  //   if (edit === false) {
  //     setEdit(true)
  //   } else {
  //     console.log('Dang cap nhat ten danh muc')
  //     updateCategory()
  //   }
  // }
  // const _renderCategoryItem = (label: string, name: string, message: string, disable: boolean, property: string) => {
  //   return (
  //     <Form.Item
  //       label={label}
  //       name={name}
  //       rules={[{ required: true, message: message }]}
  //       style={{ height: '50px' }}
  //     >
  //       <Input disabled={disable} defaultValue={property} />
  //     </Form.Item>
  //   )
  // }
  // const _renderCategoryInfo = () => {
  //   return (
  //     <div className="category-info">
  //       <Form>
  //         <Row gutter={24}>
  //           <Col xs={24} md={11} lg={10} style={{ height: '50px' }} >
  //             {_renderCategoryItem('Mã danh mục', 'category_cd', 'Nhập mã danh mục', true, categoryInfo.category_cd)}
  //           </Col>
  //           <Col xs={24} md={11} lg={10} style={{ height: '50px' }}>
  //             {_renderCategoryItem('Tên danh mục', 'category_name', 'Nhập tên danh mục', !edit, categoryInfo.category_name)}
  //           </Col>
  //           <Col xs={24} md={24} lg={3} className='button-edit-container'>
  //             <Button className="button" onClick={handleEdit}>{edit ? 'Lưu' : 'Chỉnh sửa'}</Button>
  //           </Col>
  //         </Row>
  //       </Form>
  //     </div>
  //   )
  // }
  // const _renderListProduct = () => {
  //   return (
  //     <div className="category-info">
  //       <h5>Danh sách sản phẩm trong danh mục</h5>
  //       <div className="mt-2">
  //         <TableListProduct
  //           loadingTable={loading}
  //           listProduct={listProduct}
  //           getListProduct={getAllProduct}
  //         />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="category-detail-container">
      {/* <div className="category_header">
        <h4 className="mb-2">
          <DoubleLeftOutlined onClick={() => navagate('/category')} />
          Chi tiết danh mục
        </h4>
      </div>
      {_renderCategoryInfo()}
      {_renderListProduct()} */}
    </div>
  )
}
