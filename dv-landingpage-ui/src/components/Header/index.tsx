
import { Badge, Col, Menu, MenuProps, Row } from 'antd';
import { useState } from 'react';
import {
  ShopOutlined,
  HddOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

export default function Header() {
  const [current, setCurrent] = useState('dashboard');
  const navigator = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigator(`/${e.key}`);
  };

  const itemsDashboard: MenuProps['items'] = [
    {
      label: 'Trang chủ',
      key: 'dashboard',
      icon: <HomeOutlined />,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: 'Sản phẩm',
      key: 'category',
      icon: <AppstoreAddOutlined />,
    },
    {
      label: 'Đơn hàng',
      key: 'order',
      icon: <HddOutlined />,
    },
    {
      label: 'Giỏ hàng',
      key: 'cart',
      icon: (
        <Badge
          count={cart.productIds ? cart.productIds.length : 0}
          status="success"
        >
          <ShopOutlined />
        </Badge>
      ),
    },
    {
      label: 'Tài khoản',
      key: 'user',
      icon: <UserOutlined />,
    },
  ];

  return (
    <Row gutter={12} className="header-container">
      <Col xs={8} md={4}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={itemsDashboard}
          className="header-container-menu"
        />
      </Col>

      <Col xs={16} md={20}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="header-container-menu"
        />
      </Col>
    </Row>
  );
}
