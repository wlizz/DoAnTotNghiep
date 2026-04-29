import { DollarCircleFilled, HddFilled, PropertySafetyFilled, SketchCircleFilled } from '@ant-design/icons'
import { Col, notification, Row } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import { MoneyFormat } from '../../../Ultils/MoneyFormat'
import { ReportTime } from "../../../dataType/report";
import api from '../../../api';

export default function ReportTimeComponent() {
  const [reportTime, setReportTime] = useState<ReportTime>()
  
  useEffect(() => {
    getReportTime()
  }, [])

  const getReportTime = async () => {
    try {
      const res = await api.report.getReportTime()
      setReportTime(res.data)
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Không thể lấy báo cáo'
      })
    }
  }
  const _renderReportTimeItem = (title: string, value: number | string, icon: ReactElement) => {
    return (
      <Col xs={24} md={12} xl={6} >
        <Row className='report-time-item'>
          <Col xs={20}>
            <p className="title-report">{title}</p>
            <p className="value-report">{value}</p>
          </Col>
          <Col xs={4}>
            {icon}
          </Col>
        </Row>
      </Col>
    )
  }
  return (
    <Row className="dashboard-report-time" gutter={[24, 12]}>
      {_renderReportTimeItem(
        'Doanh thu hôm nay',
        MoneyFormat(reportTime ? reportTime.total_date : 0),
        <DollarCircleFilled className="icon-report" />
      )}
      {_renderReportTimeItem(
        'Số đơn hôm nay',
        reportTime ? reportTime.total_order_date : 0,
        <HddFilled className="icon-report" />
      )}
      {_renderReportTimeItem(
        'Doanh thu tháng này',
        MoneyFormat(reportTime ? reportTime.total_month : 0),
        <PropertySafetyFilled className="icon-report" />
      )}
      {_renderReportTimeItem(
        'Số đơn trong tháng',
        reportTime ? reportTime.total_order_month : 0,
        <SketchCircleFilled className="icon-report"
        />)}
    </Row>
  )
}
