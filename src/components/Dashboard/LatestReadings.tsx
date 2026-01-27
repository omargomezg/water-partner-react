import React from 'react';
import { Table, Tag, Typography, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    date: string;
    client: string;
    reading: number;
    status: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
    },
    {
        title: 'Lectura',
        dataIndex: 'reading',
        key: 'reading',
    },
    {
        title: 'Estado',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Tag color={status === 'Validada' ? 'green' : 'geekblue'} key={status}>
                {status.toUpperCase()}
            </Tag>
        ),
    },

];

const data: DataType[] = [
    {
        key: '1',
        date: '2023-10-25',
        client: 'Juan Perez',
        reading: 12050,
        status: 'Validada',
    },
    {
        key: '2',
        date: '2023-10-25',
        client: 'Maria Gonzalez',
        reading: 11980,
        status: 'Validada',
    },
    {
        key: '3',
        date: '2023-10-24',
        client: 'Carlos Lopez',
        reading: 13400,
        status: 'Ingresada',
    },
    {
        key: '4',
        date: '2023-10-24',
        client: 'Ana Martinez',
        reading: 10500,
        status: 'Ingresada',
    },
    {
        key: '5',
        date: '2023-10-23',
        client: 'Pedro Sanchez',
        reading: 9800,
        status: 'Validada',
    },
];

const LatestReadings: React.FC = () => {
    return (
        <Card title={<Typography.Title level={4}>Últimas Lecturas Ingresadas</Typography.Title>} bordered={false}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
            />
        </Card>
    );
};

export default LatestReadings;
