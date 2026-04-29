import { Input, Modal, notification, Popconfirm, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import api from '../../../api';
import { CategoryResponse } from '../../../dataType/category';
import { useState } from 'react';
type Props = {
  listCate: CategoryResponse[]
  getListCategory: () => void
  loadingTable: boolean
}

export default function TableListCategory(props: Props) {
  const { listCate, getListCategory, loadingTable } = props
  const [showModal, setShowModal] = useState(false)
  const [categorySelect, setCategorySelect] = useState<CategoryResponse>()
  const [categoryName, setCategoryName] = useState('')

  const deleteCategory = async (record: CategoryResponse) => {
    try {
      await api.category.deleteCategory(record.id)
      notification.success({
        message: 'Thông báo',
        description: 'Xóa danh mục thành công',
      })
      getListCategory()
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Xóa danh mục thất bại',
      })
    }
  }

  const handleChangeCategory = async () => {
    try {
      categorySelect && await api.category.updateCategory(categorySelect.id, { name: categoryName })
      notification.success({
        message: 'Thông báo',
        description: 'Sửa danh mục thành công',
      })
      getListCategory()
      setShowModal(false)
      setCategorySelect(undefined)
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Sửa danh mục thất bại',
      })
    }
  }

  const handleDetail = (record: CategoryResponse) => {
    setCategoryName(record.name)
    setCategorySelect(record)
    setShowModal(true)
  }

  const renderDetail = (text: any, record: CategoryResponse, index: number) => {
    return (
      <FileSearchOutlined onClick={() => handleDetail(record)} />
    )
  }

  const renderStatus = (text: any, record: CategoryResponse, index: number) => {
    return (
      <Tag color={text ? 'green' : 'red'}>{text ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}</Tag>
    )
  }

  const renderRemove = (text: any, record: CategoryResponse, index: number) => {
    return (
      <Popconfirm
        placement="top"
        title={'Bạn có chắn chắn muốn xóa danh mục này không'}
        description={''}
        onConfirm={() => deleteCategory(record)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined color='red' />
      </Popconfirm>
    )
  }
  const columns: ColumnsType<CategoryResponse> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'countProduct',
      key: 'countProduct',
      render: (text, record, index) => <a>{record.products.length}</a>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: renderStatus
    },
    {
      title: 'Sửa',
      dataIndex: 'detail',
      key: 'detail',
      align: 'center',
      render: renderDetail
    },
    {
      title: 'Xóa',
      dataIndex: 'remove',
      key: 'remove',
      align: 'center',
      render: renderRemove
    },
  ];

  const onchangeName = (e: any) => {
    setCategoryName(e.target.value)
  }


  const _renderModalDetail = () => {
    return (
      <Modal
        visible={true}
        title={"Sửa danh mục"}
        onCancel={() => {
          setShowModal(false)
          setCategorySelect(undefined)
        }}
        onOk={handleChangeCategory}
      >
        <p>Tên danh mục:</p>
        <Input value={categoryName} onChange={onchangeName} />
      </Modal>
    )
  }
  return (
    <>
      <Table
        loading={loadingTable}
        columns={columns}
        dataSource={listCate}
        rowKey={(record: CategoryResponse) => `${record.id}`}
      />
      {showModal && categorySelect && _renderModalDetail()}
    </>
  )
}