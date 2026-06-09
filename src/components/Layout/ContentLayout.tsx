import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VerticalMenu from '../VerticalMenu';
import CheckAuthentication from '../CheckAuthentication';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<CheckAuthentication>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					breakpoint="lg" // Punto donde se colapsa automáticamente
					collapsedWidth="0" // Se oculta totalmente en móviles
					trigger={null}
					collapsible
					collapsed={collapsed}
					onBreakpoint={(broken) => {
						setCollapsed(broken);
					}}
				>
					<div
						className="demo-logo-vertical"
						style={{
							height: 32,
							margin: 16,
							background: 'rgba(255,255,255,0.2)',
						}}
					/>
					<VerticalMenu />
				</Sider>
				<Layout>
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{ fontSize: '16px', width: 64, height: 64 }}
						/>
						<h2 style={{ margin: 0, fontSize: '18px' }}>Voces Core CMS</h2>
					</Header>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							overflow: 'initial',
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</CheckAuthentication>
	);
};

export default AppLayout;
