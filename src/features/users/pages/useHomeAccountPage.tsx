import { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';
import { PageResponse, User } from '../../../types';
import { UserRowButtonsComponent } from '../components/UserRowButtons.component';

export const useHomeAccountPage = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetchAccounts();
	}, []);

	const fetchAccounts = async () => {
		try {
			const response = await apiClient.get<PageResponse<User>>(`/user`);
			const { status, data } = response;
			setUsers(data.content);
		} catch (err) {
			return null;
		}
	};
	const columns: TableProps<User>['columns'] = [
		{
			title: 'Nombre',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'Correo electrónico',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Rol',
			dataIndex: 'roles',
			key: 'roles',
			render: (roles) => roles?.join(', '),
		},
		{
			title: 'Estado',
			dataIndex: 'active',
			key: 'active',
			render: (enabled) => (enabled ? 'Activo' : 'Inactivo'),
		},
		{
			title: 'Última actualización',
			key: 'updatedAt',
			dataIndex: 'updatedAt',
			render: (dateString) => {
				return dayjs(dateString).format('MMMM DD, YYYY');
			},
		},
		{
			title: 'Último acceso',
			key: 'lastLogin',
			dataIndex: 'lastLogin',
			render: (dateString) => {
				return dayjs(dateString).format('MMMM DD, YYYY');
			},
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: User) => record.id && <UserRowButtonsComponent userId={record.id} />,
		},
	];

	return {
		columns,
		users,
	};
};
