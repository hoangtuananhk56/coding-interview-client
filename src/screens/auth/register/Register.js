import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import homeright from "../../../assets/images/homeright.jpg";
import logo from "../../../assets/images/logo3x.png";
import authApi from "../../../http/authAPI";
const onFinish = (values) => {
  authApi.userRegister(values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="register">
        <div className="register-form">
          <div className="register-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="register-title">WELCOME TO BAST VIETNAM</div>
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
                    message: "Please input your username!",
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
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Re-Password"
                name="re-password"
                rules={[
                  {
                    required: true,
                    message: "Please input your re-password!",
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
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                <Button
                  type="default"
                  style={{ marginLeft: 10 }}
                  onClick={() => navigate("/auth/login")}
                >
                  Cancle
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="right-home">
          <img src={homeright} alt="home-rght" />
        </div>
      </div>
    </>
  );
};

export default Register;
