import { Flex, Card, Typography } from 'antd';
import { FC } from 'react';

export const DebtorsReportContainer: FC = () => {
	return (
		<>
			<div style={{ flex: 1 }}>
				<Flex vertical gap="2.3rem">
					<Card style={{ padding: '20px' }}>
						<Flex vertical gap="30px">
							<Flex vertical align="flex-start">
								<Typography.Title level={2}>Reportes</Typography.Title>
								<Typography.Text type="secondary" strong>
									COntenido en construcción... Mostraremos un Dashboard
								</Typography.Text>
							</Flex>
						</Flex>
					</Card>
				</Flex>
			</div>
		</>
	);
};
