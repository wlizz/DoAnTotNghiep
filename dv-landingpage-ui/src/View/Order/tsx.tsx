import { Button, Table, Tabs, TabsProps, Tag, notification } from "antd";
import './order.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import api from "../../api";
import { useEffect, useState } from "react";
import { OrderRespose, UpdateOrderDto } from "../../dataType/order";
import { ColumnsType } from "antd/es/table";
import { MoneyFormat } from "../../Untils/money";
import moment from "moment";
import { DateUtils } from "../../Untils/DateUtils";
import { checkStatus } from "../../Untils/status";
import { FileSearchOutlined } from '@ant-design/icons'
import ModalOrderDetail from "./ModalOrderDetail";
export function Order() {
  const useInfo = useSelector((state: RootState) => state.auth)
  const [listInvoice, setListInvoice] = useState<OrderRespose[]>([])
  const [loadingTable, setloadingTable] = useState(false)
  const [modalDetailInvoice, setModalDetailInvoice] = useState(false)
  const [invoiceInfoDetail, setInvoiceInfoDetail] = useState<OrderRespose>()
  useEffect(() => {
    useInfo.name && getAllOrder()
  }, [])

  const getAllOrder = async () => {
    setloadingTable(true)
    try {
      const res = await api.order.getAllOrderByUser(useInfo.id)
      setListInvoice(res.data.reverse())
    } catch (err) {
    } finally {
      setloadingTable(false)
    }
  }

  const _renderStatus = (text: number, record: OrderRespose, index: number) => {
    const status = checkStatus(text)
    return (
      <Tag color={status.color}>{status.name}</Tag>
    )
  }

  const handleOnRowTable = (record: OrderRespose) => {
    setInvoiceInfoDetail(record)
    setModalDetailInvoice(true)
  }

  const _renderDetail = (text: number, record: OrderRespose, index: number) => {
    return (
      <FileSearchOutlined onClick={() => handleOnRowTable(record)} />
    )
  }

  const _renderActionCancel = (text: number, record: OrderRespose, index: number) => {
    return (
      <Button danger disabled={record.status !== 2} onClick={() => handleCancel(record)}>Hủy đơn</Button>
    )
  }

  const handleCancel = async (record: OrderRespose) => {
    try {
      const id = record.id
      const data: UpdateOrderDto = {
        status: 0
      }
      await api.order.upadteOrder(id, data)
      notification.success({
        message: "Thông báo",
        description: "Hủy đơn hàng thành công",
      })
      getAllOrder()
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: "Hủy đơn hàng thất bại"
      })
    }

  }

  const columns: ColumnsType<OrderRespose> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: OrderRespose, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
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
      title: 'Ngày tạo',
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
      title: "Hành động",
      dataIndex: 'cancel',
      key: 'cancel',
      align: 'center',
      render: _renderActionCancel,
    },
  ];

  const _renderorderActive = (status: number) => {
    const listOrder = listInvoice.filter(item => item.status === status)
    return (
      <Table
        rowKey={'table-category'}
        columns={columns}
        dataSource={listOrder}
        loading={loadingTable}
      />
    )
  }

  const items: TabsProps['items'] = [
    {
      key: '2',
      label: `Chờ duyệt`,
      children: _renderorderActive(2),
    },
    {
      key: '1',
      label: `Đã được duyệt`,
      children: _renderorderActive(1),
    },
    {
      key: '3',
      label: `Đã hủy`,
      children: _renderorderActive(0),
    },
  ];

  const onChange = () => { }
  return (
    <div className="order-container">
      <h4>Danh sách đơn hàng</h4>
      <Tabs
        onChange={onChange}
        type="card"
        items={items}
        color="black"
      />

      {modalDetailInvoice && invoiceInfoDetail &&
        <ModalOrderDetail
          onCancel={() => setModalDetailInvoice(false)}
          onOk={() => setModalDetailInvoice(false)}
          invoiceInfo={invoiceInfoDetail}
          getListOrder={getAllOrder}
        />
      }
    </div>
  )
}