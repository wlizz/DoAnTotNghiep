import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reduce";
const { Header: AntHeader, Footer, Sider, Content } = Layout;
function Main() {
  const [visible, setVisible] = useState(false)
  const [sidenavType, setSidenavType] = useState("transparent");
  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type: any) => setSidenavType(type);
  const handleSidenavColor = (color: any) => { }
  const handleFixedNavbar = (type: any) => { };
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <Layout className="layout-dashboard">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ${sidenavType === "#fff" ? "active-route" : ""
          }`}
        style={{ background: sidenavType }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <Affix>
          <AntHeader className={"ant-header-fixed"}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        </Affix>
        <Content>
          {auth.token ?
            <Outlet></Outlet>
            : <p className="text-center" style={{marginTop: '200px'}}>Đăng nhập để sử dụng phần mềm</p>
          }
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          @Copyright by KIT - Phần mềm quản lý cửa hàng kim khí Duc Viet - Version 1.0.0
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Main;
