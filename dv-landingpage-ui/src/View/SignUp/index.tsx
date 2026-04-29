import { Avatar, Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './sign-up.scss'
import { UserOutlined } from '@ant-design/icons';
import { RegisterParam } from '../../dataType/user';
import api from '../../api';
import { useState } from 'react';

function SignUp() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onFinish = async (values: RegisterParam) => {
    setLoading(true)
    try {
     const res = await api.auth.register(values)
     console.log(res, 'keytest')
     notification.success({
      message: 'Thông báo',
      description: "Đăng ký tài khoản thành công!",
     })
     navigate('/dashboard')
    }catch(err) {
      notification.error({
        message: 'Thông báo',
        description: "Đăng ký tài khoản thất bại!",
       })
    }finally {
      setLoading(false)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='sign-up-container'>
      <div className='right'>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          style={{minWidth: '500px'}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='form-input-login'
        >
          <h5 className='mt-5'> <Avatar style={{ backgroundColor: 'black' }} icon={<UserOutlined />} /> Gundam & Figure</h5>
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[{ required: true, message: 'Nhập tên người dùng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Nhập email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <p>Bạn đã có tài khoản. <Link to='/sign-in'>Đăng nhập</Link></p>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SignUp