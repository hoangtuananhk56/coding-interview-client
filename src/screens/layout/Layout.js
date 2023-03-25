import { Outlet, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  ContainerOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Select } from 'antd';
import React from "react";
import './Layout.scss'
import logo from '../../assets/images/logo.png'
function getItem(label, key, icon, tolink, children) {
  return {
    label,
    key,
    icon,
    tolink,
    children,
  };
}
const items = [
  getItem('Candidates', 0, <PieChartOutlined />, '/'),
  getItem('Challenges', 1, <DesktopOutlined />, '/challenge'),
  getItem('Testings', 2, <ContainerOutlined />, '/test',)
];

const Layout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name")
  const onChange = (value) => {
    // console.log(value)
    localStorage.clear();
    navigate('/auth/login')
  }
  return (
    <div className="home-page">
      <div className="home-page-header">
        <img src={logo} alt="logo"/>
      </div>
      <div className="home-page-body">
        <div className="menu-bar">
          <Menu
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={false}
            items={items}
            onClick={(e) => {
              navigate(items[e.key].tolink)
            }
            }
          >
          </Menu>
          <Select
          className="nav-user-select"
          showArrow={false}
          placeholder={
            <React.Fragment>
              <div className="row" style={{height: 40}}>
                <UserOutlined style={{marginRight: 10}}/>
                {name}
              </div>
            </React.Fragment>
          }
          bordered={false}
          labelInValue
          dropdownStyle={{
            borderRadius: 0,
          }}
          onChange={onChange}
          options={[
            // {
            //   value: 'profile',
            //   label: (
            //     <div className="flex items-center border-gray1 border-b border-solid border-0 pb-3">
            //       Profile
            //     </div>
            //   ),
            // },
            {
              value: 'logout',
              label: (
                <div className="flex items-center border-b-stone-400">
                  Logout
                </div>
              ),
            },
          ]}
        />
        </div>
        <div className="layout-home">
          <Outlet />
        </div>

      </div>
    </div>
  )
};

export default Layout;
