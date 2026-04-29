import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImportType } from '../../../dataType/import';
import { MoneyFormat } from '../../../Ultils/MoneyFormat';
import ModalImportDetail from './ModalImportDetail';
export default function Import() {
  const navigate = useNavigate()
  const [loadingTable, setloadingTable] = useState(false)
  const [importCd, setImportCd] = useState('')
  const [modalDetailImport, setModalDetailImport] = useState(false)
  const [importInfoDetail, setImportInfoDetail] = useState<ImportType>()
  const listImport: ImportType[] = [
    {
      import_cd: 'IP00001',
      provider_cd: 'PV00001',
      total_amount: 1000000,
      total_paid: 800000,
      total_debt: 200000,
      status: 1,
      product: [
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        }
      ]
    },
    {
      import_cd: 'IP00002',
      provider_cd: 'PV00002',
      total_amount: 5000000,
      total_paid: 5000000,
      total_debt: 0,
      status: 1,
      product: [
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        },
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        },
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        }, {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        },{
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        }
        ,{
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        },
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        },{
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        }
      ]
    },
    {
      import_cd: 'IP00003',
      provider_cd: 'PV00003',
      total_amount: 400000,
      total_paid: 400000,
      total_debt: 0,
      status: 0,
      product: [
        {
          product_cd: 'SP0001',
          product_name: 'San pham 1',
          price_import: 100000,
          quanlity: 3
        },
        {
          product_cd: 'SP0002',
          product_name: 'San pham 2',
          price_import: 40000,
          quanlity: 3
        }
      ]
    }
  ]
  const _renderStatusImport = (text: number, record: ImportType, index: number) => {
    return (
      <Tag color={text ? 'green' : 'red'}>{text ? 'Đã hoàn thành' : 'Đã hủy'}</Tag>
    )
  }
  const columns: ColumnsType<ImportType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
      render: (text: any, record: ImportType, index: number) => <a>{index + 1}</a>,
    },
    {
      title: 'Mã phiếu nhập',
      dataIndex: 'import_cd',
      key: 'import_cd',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã nhà cung cấp',
      dataIndex: 'provider_cd',
      key: 'provider_cd',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tổng nhập',
      dataIndex: 'total_amount',
      key: 'total_amount',
      align: 'right',
      render: text => <a>{MoneyFormat(text)}</a>,
    },
    {
      title: 'Tổng trả',
      dataIndex: 'total_paid',
      key: 'total_paid',
      align: 'right',
      render: text => <a>{MoneyFormat(text)}</a>,
    },
    {
      title: 'Tổng nợ',
      dataIndex: 'total_debt',
      key: 'total_debt',
      align: 'right',
      render: text => <a>{MoneyFormat(text)}</a>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: _renderStatusImport,
    },
  ];
  const handleOnRowTable = (record: ImportType) => {
    setImportInfoDetail(record)
    setModalDetailImport(true)
  }
  const onchangeNameSearch = (e: any) => {
    setImportCd(e.target.value)
    console.log(e.target.value, 'name')
  }
  const gotoCreateImport = () => {
    navigate('/import/new')
  }
  const _renderHeaderImport = () => {
    return (
      <div className='header-category'>
        <div className='title-category'>
          <h4>Nhập kho</h4>
          <Button className='button' onClick={gotoCreateImport}>
            <PlusCircleOutlined />
            Thêm mới
          </Button>
        </div>
        <Input
          className="header-search"
          placeholder="Nhập mã nhập kho..."
          value={importCd}
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
          dataSource={listImport}
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
      {_renderHeaderImport()}
      {_renderHistoryImport()}
      {modalDetailImport && importInfoDetail &&
        <ModalImportDetail
          onCancel={() => setModalDetailImport(false)}
          onOk={() => { }}
          importInfo={importInfoDetail}
        />}
    </div>
  )
}