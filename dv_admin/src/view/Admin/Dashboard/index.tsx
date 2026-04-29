import { Col, Row } from 'antd';
import './dashboard.scss';
import ReportInvoice from './ReportInvoice';
import ReportProduct from './ReportProduct';
import ReportRenuaveComponent from "./ReportRenuaveComponent";
import ReportTimeComponent from "./ReportTimeComponent";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <ReportTimeComponent />
      <ReportRenuaveComponent />
      <Row>
        <Col xs={24} md={24} xl={16} ><ReportInvoice /></Col>
        <Col xs={24} md={24} xl={8}><ReportProduct /></Col>
      </Row>
    </div>
  );
}

export default Dashboard;
