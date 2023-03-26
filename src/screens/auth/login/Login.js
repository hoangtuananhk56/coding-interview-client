import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import './login.scss';
import logo from '../../../assets/images/logo.png'
import homeright from '../../../assets/images/homeright.jpg'
import authApi from '../../../http/authAPI'
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState();
  const onLogin = async (values) => {
    await authApi.userLogin(values)
    .then(res => {
        //Save localstorage accessToken
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('name', res.name)
        navigate("/")
    }).catch(err => {
      setMessage(err.response.data.message)
    })
  };
  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <img src={logo} alt="logo"/>
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
              onFinish={onLogin}
              onFinishFailed={onLoginFailed}
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
                 <p style={{marginLeft: 170, color:'red'}}>{message}</p>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button htmlType="submit" style={{ marginRight: 10, backgroundColor: '#4caf50', color: 'white' }}>
                  Submit
                </Button>
                <Button style={{ backgroundColor: '#2196f3', color: 'white' }} onClick={() => navigate("/auth/register")}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="right-home">
          <img src={homeright} alt="home right" />
        </div>
      </div>
    </>
  )
};

export default Login;