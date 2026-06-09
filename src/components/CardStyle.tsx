import { Card, CardProps } from 'antd';
import { ReactNode } from 'react';

interface Props extends CardProps {
	children?: ReactNode;
	title?: ReactNode;
	extra?: ReactNode;
	style?: React.CSSProperties;
}

export const CardStyle: React.FC<Props> = ({ children, title, extra, style }) => {
	return (
		<Card
			title={title}
			extra={extra}
			style={{
				boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
				borderRadius: '8px',
				marginBottom: '20px',
				display: 'flex',
				flexDirection: 'column',
				...style,
			}}
			styles={{
				body: {
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					...(style?.height === '100%' ? { height: '100%' } : {}),
				},
			}}
		>
			{children}
		</Card>
	);
};
