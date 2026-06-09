import { Flex, Card, Typography, Table } from 'antd';
import { FC } from 'react';
import { CardStyle } from '../components/CardStyle';
import { CommonFilter, FilterTypes } from '../components/CommonFilter';

export const DebtorsReportPage: FC = () => {
	const columns = [{}];
	const handleApplyFilter = () => {};
	return (
		<>
			<div style={{ flex: 1 }}>
				<Flex vertical gap="2.3rem">
					<Card style={{ padding: '20px' }}>
						<Flex vertical gap="30px">
							<Flex vertical align="flex-start">
								<Typography.Title level={2}>Informe de deudas</Typography.Title>
								<CardStyle style={{ width: '100%' }}>
									<CommonFilter type={FilterTypes.Debts} onClose={handleApplyFilter} />
								</CardStyle>
								<Typography.Text type="secondary" strong>
									<Table columns={columns} dataSource={[]} pagination={false} />
								</Typography.Text>
							</Flex>
						</Flex>
					</Card>
				</Flex>
			</div>
		</>
	);
};
