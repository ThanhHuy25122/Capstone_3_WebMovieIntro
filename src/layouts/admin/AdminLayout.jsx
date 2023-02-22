import { Outlet, useNavigate } from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AdminLayoutItem } from "enums";

function getItem(label, key, icon, children, type, onClick) {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  };
}
export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { movieManagement, userManagament } = AdminLayoutItem;

  const handleItemClick = (key) => {
    const admin = "/admin/";
    // handle your logic here
    navigate(admin + key);
  };

  const items = [
    getItem(
      movieManagement[1],
      movieManagement[0],
      <PieChartOutlined />,
      null,
      null,
      () => handleItemClick(movieManagement[0])
    ),
    getItem(
      userManagament[1],
      userManagament[0],
      <DesktopOutlined />,
      null,
      null,
      () => handleItemClick(userManagament[0])
    ),
    getItem("Option 3", "3", <FileOutlined />, null, null, () =>
      handleItemClick("#")
    ),
    getItem(
      "Navigation One",
      "sub1",
      <UserOutlined />,
      [
        getItem("Option 5", "5", null, null, null, () => handleItemClick("#")),
        getItem("Option 6", "6", null, null, null, () => handleItemClick("#")),
        getItem("Option 7", "7", null, null, null, () => handleItemClick("#")),
        getItem("Option 8", "8", null, null, null, () => handleItemClick("#")),
      ],
      null,
      () => handleItemClick("ub1")
    ),
    getItem(
      "Navigation Two",
      "sub2",
      <TeamOutlined />,
      [
        getItem("Option 9", "9", null, null, null, () => handleItemClick("#")),
        getItem("Option 10", "10", null, null, null, () =>
          handleItemClick("#")
        ),
        getItem(
          "Submenu",
          "sub3",
          null,
          [
            getItem("Option 11", "11", null, null, null, () =>
              handleItemClick("#")
            ),
            getItem("Option 12", "12", null, null, null, () =>
              handleItemClick("#")
            ),
          ],
          null,
          () => handleItemClick("#")
        ),
      ],
      null,
      () => handleItemClick("#")
    ),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
          onClick={() => navigate("/")}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
