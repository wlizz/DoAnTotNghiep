import { useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Tooltip,
} from "antd";

import { NavLink, Link, useNavigation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reduce";
import { LogOut } from "../redux/action/auth";
import { ExportOutlined } from "@ant-design/icons";

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

type Props = {
  placement?: any,
  name: string,
  subName: string,
  onPress: Function,
  handleSidenavColor: Function,
  handleSidenavType: Function,
  handleFixedNavbar: Function,
}

function Header(props: Props) {
  const { subName } = props
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => window.scrollTo(0, 0));

  const logOut = () => {
    dispatch(LogOut())
    navigate('/sign-in')
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", " --> ")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <div style={{ padding: '10px', borderRadius: '5px', boxShadow: '2px 2px 2px' }} onClick={logOut}>
            <h5 className="d-flex align-items-center"  >
              {auth.name && profile}
              {auth.name ? auth.name : 'Đăng nhập'}
              <Tooltip placement="top" title={auth.name ? 'Đăng xuất' : 'Đăng nhập'}>
                <ExportOutlined style={{ marginLeft: 10 }} />
              </Tooltip>
            </h5>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Header;
