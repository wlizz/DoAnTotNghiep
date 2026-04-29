import { DeleteOutlined, PlusCircleOutlined, SearchOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Input, notification, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { CustomerResponse } from '../../../dataType/custormer';
import { DateUtils } from '../../../Ultils/DateFormat';
import ModalCustomerDetail from './ModalCustomerDetail';
export default function Product() {
  const [loadingTable, setloadingTable] = useState(false)
  // const [customerName, setCustomerName] = useState('')
  const [showModalDetailCustomer, setShowModalDetailCustomer] = useState(false)
  const [listCustomer, setListCustomer] = useState<CustomerResponse[]>([])
  const [detailCustomer, setDetailCustomer] = useState<CustomerResponse>()

  useEffect(() => {
    getAllCustomer()
  }, [])

  const getAllCustomer = async () => {
    setloadingTable(true)
    try {
      const res = await api.customer.getAllCustomer()
      setListCustomer(res.data)
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: "Không thể lấy danh sách khách hàng"
      })
    }
    finally {
      setloadingTable(false)
    }
  }

  const handleRemoveCustomer = async (e: any, record: CustomerResponse) => {
    try {
      await api.customer.deleteCustomer(record.id)
      notification.success({
        message: "Thông báo",
        description: "Xóa thành công khách hàng"
      })
      getAllCustomer()
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: "Xóa thất bại"
      })
    }
  }

  const _renderButtonDelete = (text: any, record: CustomerResponse, index: number) => {
    return (
      <Popconfirm
        title="Bạn có chắc chắn xóa khách hàng?"
        onConfirm={(e) => handleRemoveCustomer(e, record)}
        onCancel={(e: any) => e.stopPropagation()}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined onClick={(e) => e.stopPropagation()} />
      </Popconfirm>
    )
  }

  const _renderDetail = (text: any, record: CustomerResponse, index: number) => {
    return (
      <FileSearchOutlined onClick={() => handleOnRowTable(record)} />
    )
  }

  const columns: ColumnsType<CustomerResponse> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: CustomerResponse, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_no',
      key: 'phone_no',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'create_date',
      key: 'create_date',
      render: text => <a>{moment(text).format(DateUtils.DATE_TIME)}</a>,
    },
    {
      title: 'Sửa',
      dataIndex: 'edit',
      key: 'edit',
      align: 'center',
      render: _renderDetail,
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
      render: _renderButtonDelete,
    },

  ];

  const handleOnRowTable = (record: CustomerResponse) => {
    setShowModalDetailCustomer(true)
    setDetailCustomer(record)
  }

  const _renderHeaderCustomer = () => {
    return (
      <div className='header-category'>
        <div className='title-category'>
          <h4>Khách hàng</h4>
        </div>
      </div>
    )
  }

  const _renderTableCustomer = () => {
    return (
      <div className='list-category-container'>
        <Table
          rowKey={(record: CustomerResponse) => `${record.id}`}
          columns={columns}
          dataSource={listCustomer}
          loading={loadingTable}
        />
      </div>
    )
  }
  return (
    <div className='category-container'>
      {_renderHeaderCustomer()}
      {_renderTableCustomer()}
      {showModalDetailCustomer && detailCustomer &&
        <ModalCustomerDetail
          title='Chi tiết khách hàng'
          handleCancel={() => setShowModalDetailCustomer(false)}
          handleOk={() => { }}
          customerInfo={detailCustomer}
          getAllCustomer={getAllCustomer}
        />
      }
    </div>
  )
}