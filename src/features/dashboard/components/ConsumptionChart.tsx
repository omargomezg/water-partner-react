import React from 'react';
import { Card, Typography } from 'antd';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const { Title } = Typography;

const data = [
    { name: 'Ene', Consumo: 15400 },
    { name: 'Feb', Consumo: 14500 },
    { name: 'Mar', Consumo: 13800 },
    { name: 'Abr', Consumo: 12000 },
    { name: 'May', Consumo: 11500 },
    { name: 'Jun', Consumo: 10800 },
    { name: 'Jul', Consumo: 9500 },
    { name: 'Ago', Consumo: 9800 },
    { name: 'Sep', Consumo: 11000 },
    { name: 'Oct', Consumo: 12500 },
    { name: 'Nov', Consumo: 13200 },
    { name: 'Dic', Consumo: 14000 },
];

const ConsumptionChart: React.FC = () => {
    return (
        <Card hoverable style={{ minHeight: '400px' }}>
            <Title level={4}>Consumo Total Últimos 12 Meses (m³)</Title>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value} m³`, 'Consumo Total']} />
                    <Legend />
                    <Bar dataKey="Consumo" fill="#4f6f52" name="Consumo Total" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default ConsumptionChart;
