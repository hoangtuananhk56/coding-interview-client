import { Outlet, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  ContainerOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
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
        </div>
        <div className="layout-home">
          <Outlet />
        </div>

      </div>
    </div>
  )
};

export default Layout;
