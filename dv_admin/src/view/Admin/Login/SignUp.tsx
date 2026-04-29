import { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import { SIGNUP, SINGIN, TEMPLATE } from "../../../elements";
const { Title } = Typography;
const { Header, Content } = Layout;
export default class SignUp extends Component {
  render() {
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const _renderFormItem = (name: string, message: string, placeholder: string) => {
      return (
        <Form.Item
          name={name}
          rules={[
            { required: true, message: message },
          ]}
        >
          <Input placeholder={placeholder} />
        </Form.Item>
      )
    }
    const _renderFormCheckYesCondition = () => {
      return (
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            Tôi đồng ý với điều khoản sử dụng
          </Checkbox>
        </Form.Item>
      )
    }
    const _renderButtonSignUp = () => {
      return (
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
          >
            Đăng kí
          </Button>
        </Form.Item>
      )
    }
    const _renderFormSignUp = () => {
      return (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="row-col"
        >
          {_renderFormItem('name', 'Nhập tên người dùng!', 'Tên người dùng')}
          {_renderFormItem('account', 'Nhập tên tài khoản!', 'Tên tài khoản')}
          {_renderFormItem('password', 'Nhập mật khẩu!', 'Mật khẩu')}
          {_renderFormCheckYesCondition()}
          {_renderButtonSignUp()}
        </Form>
      )
    }
    const _renderLinkToSignIn = () => {
      return (
        <p className="font-semibold text-muted text-center">
          Bạn đã có tài khoản?{" "}
          <Link to="/sign-in" className="font-bold text-dark">
            Đăng nhập
          </Link>
        </p>
      )
    }
    const _renderTitleSignUp = () => {
      return (
        <div className="sign-up-header">
          <div className="content">
            <Title>Đăng kí</Title>
            <p className="text-lg">
              Đăng kí tài khoản để sử dụng phần mềm miễn phí.
            </p>
          </div>
        </div>
      )
    }
    const _renderContent = () => {
      return (
        <Content className="p-0">
          {_renderTitleSignUp()}
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Đăng kí tài khoản</h5>}
            bordered={false}
          >
            {_renderFormSignUp()}
            {_renderLinkToSignIn()}
          </Card>
        </Content>
      )
    }
    const _renderMenuItem = (key: string, link: string, icon: any, title: string) => {
      return (
        <Menu.Item key={key}>
          <Link to={link}>
            {icon}
            <span>{title}</span>
          </Link>
        </Menu.Item>
      )
    }
    const _renderHeader = () => {
      return (
        <Header>
          <div className="header-col header-brand">
            <h5>Admin</h5>
          </div>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              {_renderMenuItem('1', '/rivew-page', TEMPLATE, 'Tổng quan')}
              {/* {_renderMenuItem('2', '/sign-up', SIGNUP, 'Đăng kí')} */}
              {_renderMenuItem('3', '/sign-in', SINGIN, 'Đăng nhập')}
            </Menu>
          </div>
        </Header>
      )
    }
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up">
          {_renderHeader()}
          {_renderContent()}
        </div>
      </>
    );
  }
}
