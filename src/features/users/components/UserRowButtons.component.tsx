import { EditOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type RowButtonsProps = {
	userId: string;
};

export const UserRowButtonsComponent: FC<RowButtonsProps> = ({ userId }) => {
	const navigate = useNavigate();

	return (
		<Space>
			<Button type="link" onClick={() => navigate(`/configurations/accounts/${userId}/edit`)}>
				<EditOutlined />
			</Button>
		</Space>
	);
};
