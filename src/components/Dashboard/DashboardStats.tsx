import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, WarningOutlined, FileTextOutlined } from '@ant-design/icons';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <Card hoverable style={{ height: '100%' }}>
        <Statistic
            title={title}
            value={value}
            valueStyle={{ color: color }}
            prefix={icon}
        />
    </Card>
);

const DashboardStats: React.FC = () => {
    // Mock data
    const stats = [
        { title: 'Total Clientes', value: 1250, icon: <UserOutlined />, color: '#3f8600' },
        { title: 'Servicios para Corte', value: 15, icon: <WarningOutlined />, color: '#cf1322' }, // Red for warning
        { title: 'Lecturas Pendientes', value: 45, icon: <FileTextOutlined />, color: '#faad14' }, // Orange for pending
    ];

    return (
        <Row gutter={16}>
            {stats.map((stat, index) => (
                <Col span={8} key={index}>
                    <StatCard {...stat} />
                </Col>
            ))}
        </Row>
    );
};

export default DashboardStats;
