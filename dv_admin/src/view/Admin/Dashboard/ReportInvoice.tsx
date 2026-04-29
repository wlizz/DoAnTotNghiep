import { notification, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api'
import { InvoiceResponse } from '../../../dataType/invoice'
import { DateUtils } from '../../../Ultils/DateFormat'
import { MoneyFormat } from '../../../Ultils/MoneyFormat'
import { checkStatus } from '../../../Ultils/Status'

export default function ReportInvoice() {
  const [loadingTable, setloadingTable] = useState(false)
  const [listInvoice, setListInvoice] = useState<InvoiceResponse[]>([])

  useEffect(() => {
    getAllInvoice()
  }, [])

  const getAllInvoice = async () => {
    setloadingTable(true)
    try {
      const res = await api.invoice.getAllInvoice()
      setListInvoice(res.data.reverse().filter((item: InvoiceResponse) => item.status === 2))
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
      // 
      <h5>{record.user?.name || '—'}</h5>
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
      title: 'Thời gian',
      dataIndex: 'create_date',
      key: 'create_date',
      align: 'center',
      render: text => <a>{moment(text).format(DateUtils.DATE_TIME)}</a>,
    },
  ];
  return (
    <div className='report-invoice'>
      <div className='header-invoice'>
        <h4>{`${listInvoice.length} Hóa đơn chưa được duyệt`}</h4>
        <Link to="/invoice" className='link-action'>{'Xem tất cả >>'}</Link>
      </div>
      <Table
        rowKey={(record: InvoiceResponse) => `${record.id}`}
        columns={columns}
        dataSource={listInvoice}
        loading={loadingTable}
      />
    </div>
  )
}
