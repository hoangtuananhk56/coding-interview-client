import {Outlet, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import './login.scss';
import logo from '../../../assets/images/logo.png'
import homeright from '../../../assets/images/homeright.jpg'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
    navigate("/")
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  console.log(process.env.REACT_APP_API_ENDPOINT, 111);
  return (
    <>
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <img src={logo} />
          </div>
          <div className="login-title">
            WELCOME TO BAST VIETNAM
          </div>
          <div className="input-form">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 500,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button htmlType="submit" style={{marginRight: 10, backgroundColor: '#4caf50', color:'white'}}>
                  Submit
                </Button>
                <Button style={{backgroundColor:'#2196f3', color:'white'}} onClick={() => navigate("/auth/register")}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="right-home">
          <img src={homeright} />
        </div>
      </div>
    </>
  )
};

export default Login;