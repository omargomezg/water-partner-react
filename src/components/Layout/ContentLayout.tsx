import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import VerticalMenu from '../VerticalMenu';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sider Responsivo */}
      <Sider
        breakpoint="lg" // Punto donde se colapsa automáticamente
        collapsedWidth="0" // Se oculta totalmente en móviles
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          console.log('¿Es pantalla pequeña?:', broken);
          setCollapsed(broken);
        }}
      >
        <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
        <VerticalMenu />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'Artículos' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'Multimedia' },
            { key: '3', icon: <UploadOutlined />, label: 'Configuración' },
          ]}
        /> */}
      </Sider>

      <Layout>
        {/* Header con botón de colapso */}
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <h2 style={{ margin: 0, fontSize: '18px' }}>Voces Core CMS</h2>
        </Header>

        {/* Contenido Principal */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'initial'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;