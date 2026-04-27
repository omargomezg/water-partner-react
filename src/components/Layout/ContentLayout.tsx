import React, { ReactNode, useState } from "react";
import { Button, Flex, Layout } from "antd";
import Sidebar from "../Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomHeader from "../Header";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "./ContentLayout.css";
import ModalSessionExpired from "../ModalSessionExpired";
import { Outlet } from "react-router-dom";
import CheckAuthentication from "../CheckAuthentication";

const ContentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <CheckAuthentication>
      <Flex gap="medium" wrap>
        <Layout style={{ minHeight: "100vh" }} hasSider>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider"
          >
            <Sidebar />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-btn"
            />
          </Sider>
          <Layout>
            <Header className="header">
              <CustomHeader />
            </Header>
            <Content className="content">
              <Outlet />
            </Content>
            <ModalSessionExpired />
          </Layout>
        </Layout>
      </Flex>
    </CheckAuthentication>
  );
};

export default ContentLayout;
