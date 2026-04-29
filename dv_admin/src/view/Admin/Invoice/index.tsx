import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Input, notification, Popconfirm, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { InvoiceResponse } from '../../../dataType/invoice';
import { DateUtils } from '../../../Ultils/DateFormat';
import { MoneyFormat } from '../../../Ultils/MoneyFormat';
import ModalInvoiceDetail from './ModalInvoiceDetail';
import { DeleteOutlined } from '@ant-design/icons';
import { checkStatus } from '../../../Ultils/Status';
export default function Invoice() {
  const [loadingTable, setloadingTable] = useState(false)
  const [modalDetailInvoice, setModalDetailInvoice] = useState(false)
  const [invoiceInfoDetail, setInvoiceInfoDetail] = useState<InvoiceResponse>()

  const [listInvoice, setListInvoice] = useState<InvoiceResponse[]>([])
  useEffect(() => {
    getAllInvoice()
  }, [])

  const getAllInvoice = async () => {
    setloadingTable(true)
    try {
      const res = await api.invoice.getAllInvoice()
      setListInvoice(res.data.reverse())
    }
    catch (err) {
      notification.error({
        message: "Thông báo",
        description: 'Không thể lấy danh sách hóa đơn'
      })
    }
    finally {
      setloadingTable(false)
    }
  }

  const _renderStatus = (text: number, record: InvoiceResponse, index: number) => {
    const status = checkStatus(text)
    return (
      <Tag color={status.color}>{status.name}</Tag>
    )
  }

  const _renderNameCustomer = (text: number, record: InvoiceResponse, index: number) => {
    return (
      <h5>{record.user.name}</h5>
    )
  }

  const confirm = async (id: number) => {
    try {
      await api.invoice.deleteInvoice(id)
      notification.success({
        message: "Thông báo",
        description: 'Xóa hóa đơn thành công!'
      })
      getAllInvoice()
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: 'Xóa hóa đơn thất bại!'
      })
    }
  }

  const _renderRemove = (text: number, record: InvoiceResponse, index: number) => {
    return (
      <Popconfirm
        placement="top"
        title={'Bạn có chắc chắn xóa hóa đơn!'}
        description={''}
        onConfirm={() => confirm(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined />
      </Popconfirm>
    )
  }

  const _renderDetail = (text: number, record: InvoiceResponse, index: number) => {
    return (
      <FileSearchOutlined onClick={() => handleOnRowTable(record)} />
    )
  }

  const _renderIDCustomer = (text: number, record: InvoiceResponse, index: number) => {
    return (
      <h5>{record.user.id}</h5>
    )
  }

  const columns: ColumnsType<InvoiceResponse> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: InvoiceResponse, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: _renderIDCustomer,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: _renderNameCustomer,
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      render: text => <a>{MoneyFormat(text)}</a>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: _renderStatus,
    },
    {
      title: 'Ngày bán',
      dataIndex: 'create_date',
      key: 'create_date',
      align: 'center',
      render: text => <a>{moment(text).format(DateUtils.DATE_TIME)}</a>,
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      key: 'detail',
      align: 'center',
      render: _renderDetail,
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
      render: _renderRemove,
    },
  ];
  const handleOnRowTable = (record: InvoiceResponse) => {
    setInvoiceInfoDetail(record)
    setModalDetailInvoice(true)
  }

  const _renderHeaderInvoice = () => {
    return (
      <div className='header-category'>
        <div className='title-category'>
          <h4>Hóa đơn</h4>
        </div>
      </div>
    )
  }
  const _renderHistoryImport = () => {
    return (
      <div className='list-category-container'>
        <Table
          rowKey={(record: InvoiceResponse) => `${record.id}`}
          columns={columns}
          dataSource={listInvoice}
          loading={loadingTable}
        />
      </div>
    )
  }
  return (
    <div className='category-container'>
      {_renderHeaderInvoice()}
      {_renderHistoryImport()}
      {modalDetailInvoice && invoiceInfoDetail &&
        <ModalInvoiceDetail
          onCancel={() => setModalDetailInvoice(false)}
          onOk={() => { }}
          invoiceInfo={invoiceInfoDetail}
          getListOrder= {getAllInvoice}
        />
      }
    </div>
  )
}