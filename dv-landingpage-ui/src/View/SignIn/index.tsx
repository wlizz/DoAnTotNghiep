import { Avatar, Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './sign-in.scss'
import { UserOutlined } from '@ant-design/icons';
import { LoginParam } from '../../dataType/user';
import { useState } from 'react';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { SaveToken, saveInfoUser } from '../../redux/action/auth';
import { saveOrder } from '../../redux/action/order';
import { updateUser } from '../../redux/action/cart';

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginParam) => {
    setLoading(true)
    try {
      const res = await api.auth.login(values)
      dispatch(SaveToken(res.data.access_token))
      dispatch(saveInfoUser(res.data.user))
      dispatch(updateUser(res.data.user.id))
      navigate('/dashboard')
    } catch (err) {
      notification.error({
        message: 'Thông báo',
        description: 'Thông tin đăng nhập chưa chính xác',
      })
    }
    finally {
      setLoading(false)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    // <div className='sign-in-container'>
    //   <div className='right'>
    //     <Form
    //       name="basic"
    //       labelCol={{ span: 8 }}
    //       initialValues={{ remember: true }}
    //       onFinish={onFinish}
    //       style={{ minWidth: '500px' }}
    //       onFinishFailed={onFinishFailed}
    //       autoComplete="off"
    //       className='form-input-login'
    //     >
    //       <h5 className='mt-5'> <Avatar style={{ backgroundColor: 'black' }} icon={<UserOutlined />} />  Chào bạn đến với Gundam & Figure</h5>
    //       <Form.Item
    //         label="Email"
    //         name="email"
    //         rules={[{ required: true, message: 'Nhập email!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item
    //         label="Mật khẩu"
    //         name="password"
    //         rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //       <p>Bạn chưa có tài khoản. <Link to='/sign-up'>Đăng ký</Link></p>
    //       <Form.Item>
    //         <Button type="primary" htmlType="submit" loading={loading}>
    //           Đăng nhập
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </div>
    <div className='sign-in-container'>
  <div className='right'>
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='form-input-login'
    >
      <h3 className='title'>
        <Avatar style={{ backgroundColor: 'black' }} icon={<UserOutlined />} />
        <span> Chào bạn đến với Gundam & Figure</span>
      </h3>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Nhập email!' }]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <p className='register-text'>
        Bạn chưa có tài khoản? <Link to='/sign-up'>Đăng ký</Link>
      </p>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  </div>
</div>
  )
}

export default SignIn
