
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from 'react';
import { LOGO } from "../assets";
import {
  BankOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  UserOutlined,
  ShopOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  CheckSquareOutlined,
  ControlOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
function Sidenav() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const _renderMenuItem = (key: string, link: string, pageDesign: string, icon: any, title: string) => {
    return (
      <Menu.Item key={key}>
        <NavLink to={link}>
          <span
            className="icon"
            style={{ background: page === pageDesign ? 'rgba(255, 81, 0, 0.868)' : "" }}
          >
            {icon}
          </span>
          <span className="label">{title}</span>
        </NavLink>
      </Menu.Item>
    )
  }
  return (
    <>
      <div className="brand">
        <img src={LOGO} alt="" />
        <span> Admin</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {_renderMenuItem('1', '/dashboard', "dashboard", <BankOutlined />, 'Tổng quan')}
        <Menu.Item className="menu-item-header" key="11">HÓA ĐƠN </Menu.Item>
        {_renderMenuItem('2', '/invoice', "invoice", <FileDoneOutlined />, 'Hóa đơn')}
        <Menu.Item className="menu-item-header" key="12">DANH MỤC</Menu.Item>
        {_renderMenuItem('3', '/category', "category", <ProfileOutlined />, 'Loại sản phẩm')}
        {_renderMenuItem('4', '/product', "product", <MenuUnfoldOutlined />, 'Sản phẩm')}
        <Menu.Item className="menu-item-header" key="13">ĐỐI TÁC </Menu.Item>
        {_renderMenuItem('5', '/customer', "customer", <UserOutlined />, 'Khách hàng')}
      </Menu>
    </>
  );
}
export default Sidenav;
