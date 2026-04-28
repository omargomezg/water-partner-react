import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Grid } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import CheckAuthentication from "../CheckAuthentication";
import CustomHeader from "../Header";
import ModalSessionExpired from "../ModalSessionExpired";
import Sidebar from "../Sidebar";
import "./ContentLayout.css";

const { useBreakpoint } = Grid;

const ContentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.lg;

  return (
    <CheckAuthentication>
      <Layout style={{ minHeight: "100vh" }} hasSider>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth={isMobile ? 0 : 80}
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
          className="sider"
          style={{
            overflow: "auto",
            height: "100vh",
            position: isMobile ? "fixed" : "sticky",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1001,
          }}
        >
          <Sidebar />
          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-btn"
              style={{ width: '100%', borderRadius: 0 }}
            />
          )}
        </Sider>

        <Layout 
          style={{ 
            transition: "all 0.2s",
            marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) 
          }}
        >
          <Header 
            className="header" 
            style={{ 
              padding: 0, 
              background: "#fff", 
              display: "flex", 
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 1000,
              width: "100%"
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <div style={{ flex: 1 }}>
              <CustomHeader />
            </div>
          </Header>

          <Content 
            style={{ 
              margin: isMobile ? "12px 8px" : "24px 16px",
              padding: isMobile ? 12 : 24,
              minHeight: 280 ,
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <Outlet />
          </Content>
          
          <ModalSessionExpired />
        </Layout>

        {isMobile && !collapsed && (
          <div 
            onClick={() => setCollapsed(true)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 1000,
            }}
          />
        )}
      </Layout>
    </CheckAuthentication>
  );
};

export default ContentLayout;