import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckInvDetail, CheckInveType } from '../../../dataType/checkInventory';
import ModalCheckInvDetail from './ModalCheckInvDetail';
export default function Import() {
  const navigate = useNavigate()
  const [loadingTable, setloadingTable] = useState(false)
  const [checkInvId, setCheckInvId] = useState('')
  const [modalDetaiCheckInv, setModalDetaiCheckInv] = useState(false)
  const [checkInvDetail, setCheckInvDetail] = useState<CheckInvDetail[]>()
  const handleOnRowTable = (record: CheckInveType) => {
    setCheckInvDetail(record.products)
    setModalDetaiCheckInv(true)
  }
  const columns: ColumnsType<CheckInveType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: CheckInveType, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã kiểm kho',
      dataIndex: 'check_inv_id',
      key: 'check_inv_id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ngày kiểm kho',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Người kiểm kho',
      dataIndex: 'user',
      key: 'user',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (text: CheckInvDetail[]) => <div>{text.length}</div>,
    },
  ];
  const data: CheckInveType[] = [
    {
      check_inv_id: 0,
      date: '1/1/2023',
      user: 'Tuan',
      products: [
        {
          product_name: 'Kim 1',
          product_id: 5,
          amount_old: 300,
          amount: 200,
        },
        {
          product_name: 'Bua 2',
          product_id: 3,
          amount_old: 300,
          amount: 200,
        },
        {
          product_name: 'Bua 2',
          product_id: 4,
          amount_old: 300,
          amount: 200,
        }
      ]
    },
    {
      check_inv_id: 0,
      date: '1/1/2023',
      user: 'Tuan',
      products: [
        {
          product_name: 'Bua 1',
          product_id: 1,
          amount_old: 300,
          amount: 200,
        },
        {
          product_name: 'Bua 2',
          product_id: 3,
          amount_old: 300,
          amount: 200,
        },
      ]
    },
    {
      check_inv_id: 0,
      date: '1/1/2023',
      user: 'Tuan',
      products: [
        {
          product_name: 'Bua 1',
          product_id: 1,
          amount_old: 300,
          amount: 200
        }
      ]
    }
  ]
  const onchangeNameSearch = (e: any) => {
    setloadingTable(e.target.value)
    console.log(e.target.value, 'name')
  }
  const gotoCreateCheckInv = () => {
    navigate('/check/new')
  }
  const _renderHeaderCheckInventory = () => {
    return (
      <div className='header-category'>
        <div className='title-category'>
          <h4>Kiểm kho</h4>
          <Button className='button' onClick={gotoCreateCheckInv}>
            <PlusCircleOutlined />
            Thêm mới
          </Button>
        </div>
        <Input
          className="header-search"
          placeholder="Nhập mã kiểm kho..."
          value={checkInvId}
          onChange={onchangeNameSearch}
          prefix={<SearchOutlined />}
          style={{ width: '300px' }}
        />
      </div>
    )
  }
  const _renderHistoryImport = () => {
    return (
      <div className='list-category-container'>
        <Table
          rowKey={'table-category'}
          columns={columns}
          dataSource={data}
          loading={loadingTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { handleOnRowTable(record) },
            };
          }}
        />
      </div>
    )
  }
  return (
    <div className='category-container'>
      {_renderHeaderCheckInventory()}
      {_renderHistoryImport()}
      {modalDetaiCheckInv && checkInvDetail &&
        <ModalCheckInvDetail
          onCancel={() => setModalDetaiCheckInv(false)}
          onOk={() => { }}
          checkInvDetail={checkInvDetail}
        />
      }
    </div>
  )
}