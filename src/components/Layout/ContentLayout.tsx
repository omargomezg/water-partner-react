import React, { ReactNode, useState } from "react";
import { Button, Layout } from "antd";
import Sidebar from "../Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomHeader from "../Header";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import './ContentLayout.css'
import ModalSessionExpired from "../ModalSessionExpired";

interface ContentLayoutProps {
    children: ReactNode
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout style={{ minHeight: '100vh' }} hasSider>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">
                <Sidebar />
                <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
            </Sider>
            <Layout>
                <Header className="header">
                    <CustomHeader />
                </Header>
                <Content className="content">
                    {children}
                </Content>
                <ModalSessionExpired />
            </Layout>
        </Layout>
    )
}

export default ContentLayout
