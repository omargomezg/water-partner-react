import React, { useEffect } from 'react';
import { Card, Col, Row, Statistic, Spin, Alert } from 'antd';
import { UserOutlined, WarningOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, onClick }) => (
    <Card
        hoverable
        style={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
    >
        <Statistic
            title={title}
            value={value}
            valueStyle={{ color: color }}
            prefix={icon}
        />
    </Card>
);

const DashboardStats: React.FC = () => {
    const navigate = useNavigate();
    const { dashboardData, isLoadingDashboard, dashboardError, fetchDashboardData } = useAppStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    if (isLoadingDashboard) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" tip="Cargando datos del dashboard..." />
            </div>
        );
    }

    if (dashboardError) {
        return (
            <Alert
                message="Error"
                description={dashboardError}
                type="error"
                showIcon
            />
        );
    }

    const stats = [
        {
            title: 'Total Clientes',
            value: dashboardData?.totalClients ?? 0,
            icon: <UserOutlined />,
            color: '#3f8600',
            onClick: () => navigate('/client')
        },
        {
            title: 'Servicios para Corte',
            value: dashboardData?.servicesForCut ?? 0,
            icon: <WarningOutlined />,
            color: '#cf1322'
        },
        {
            title: 'Lecturas Pendientes',
            value: dashboardData?.pendingReadings ?? 0,
            icon: <FileTextOutlined />,
            color: '#faad14'
        },
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
