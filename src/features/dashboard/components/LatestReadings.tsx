import React from 'react';
import { Table, Tag, Typography, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppStore } from '../../../store/useAppStore';
import { Reading } from '../../../store/dashboardSlice';


const columns: ColumnsType<Reading> = [
    {
        title: 'Fecha',
        dataIndex: 'readingDate',
        key: 'readingDate',
        render: (date) => new Date(date).toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
    },
    {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
    },
    {
        title: 'Lectura',
        dataIndex: 'readingValue',
        key: 'readingValue',
        render: (value) => `${new Intl.NumberFormat('es-CL').format(value)} m³`,
    },
    {
        title: 'Estado',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
            <Tag color={status === 'completed' ? 'green' : 'geekblue'} key={status}>
                {status.toUpperCase()}
            </Tag>
        ),
    },

];

const LatestReadings: React.FC = () => {

        const { dashboardData} = useAppStore();
    return (
        <Card title={<Typography.Title level={4}>Últimas Lecturas Ingresadas</Typography.Title>} bordered={false}>
            <Table<Reading>
                columns={columns}
                dataSource={dashboardData?.lastReadings}
                pagination={false}
                rowKey="id"
                size="small"
            />
        </Card>
    );
};

export default LatestReadings;
