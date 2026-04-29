import { Col, notification, Radio, RadioChangeEvent, Row, Spin } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import api from '../../../api'
import { ReportRenuave } from '../../../dataType/report'

export default function ReportRenuaveComponent() {
  const [loading, setLoading] = useState(false)
  const [listRenue, setListRenue] = useState<ReportRenuave[]>([])
  const [time, setTime] = useState('day')

  useEffect(() => {
    getRenue()
  }, [time])

  const getRenue = async () => {
    setLoading(true)
    try {
      const startDate = moment().startOf('month').format('YYYY-MM-DD')
      const endDate = moment().endOf('month').format('YYYY-MM-DD')
      const res = await api.report.getReportRevenue(time, startDate, endDate)
      setListRenue(res.data)
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Không thể lấy báo cáo'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const onChange = (e: RadioChangeEvent) => {
    setTime(e.target.value);
  };

  const _renderReportHeader = () => {
    return (
      <Row className='report-header'>
        <h4>Báo cáo doanh thu</h4>
        <Radio.Group value={time} onChange={onChange} className='group-radio'>
          <Radio.Button value="day">Ngày</Radio.Button>
          <Radio.Button value="month">Tháng</Radio.Button>
        </Radio.Group>
      </Row>
    )
  }

  const _renderChartMoney = () => {
    return (
      <Col xs={24} xl={12} className='report-chart' >
        <LineChart width={500} height={300} data={listRenue} style={{ margin: '5px auto' }}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="total" stroke="green" strokeWidth={2} dot={{ strokeWidth: 2 }} activeDot={{ r: 6 }} />
          <Tooltip labelStyle={{ color: '#333' }} />
          <Legend content={<h4 style={{ color: 'green' }}>Tổng doanh thu</h4>} />
        </LineChart>
      </Col>
    )
  }

  const _renderChartInvoice = () => {
    return (
      <Col xs={24} xl={12} className='report-chart'>
        <BarChart width={500} height={300} data={listRenue} style={{ margin: '5px auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_invoice" fill="green" />
          <Legend content={<h4 style={{ color: 'green' }}>Tổng đơn</h4>} />
        </BarChart>
      </Col>
    )
  }

  return (
    <div className="dashboard-report">
      {_renderReportHeader()}
      <Spin spinning={loading}>
        <Row gutter={[12, 12]}>
          {_renderChartMoney()}
          {_renderChartInvoice()}
        </Row>
      </Spin>
    </div >
  )
}
