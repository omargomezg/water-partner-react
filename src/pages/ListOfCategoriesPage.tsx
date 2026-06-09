import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, TablePaginationConfig, Tag, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../components/Filter';
import apiClient from '../services/apiClient';

const { Title, Text } = Typography;

export const ListOfCategoriesPage: FC = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	useEffect(() => {
		fetchCategories(pagination.current, pagination.pageSize);
	}, []);

	const fetchCategories = async (
		page: number = 0,
		pageSize: number = 10,
		filter: any = { sort: 'createdAt,desc' },
	) => {
		try {
			setLoading(true);
			const { data } = await apiClient.get<any>('/category', {
				params: {
					page: page - 1,
					size: pageSize,
					onlyParents: true,
					totalArticles: true,
					...filter,
				},
			});
			setCategories(data.content);
			setPagination({
				...pagination,
				current: page,
				pageSize: pageSize,
				total: data?.totalElements || 200,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const openDrawer = (category: any) => {
		navigate(`/configurations/category/${category.id}/edit`);
	};

	const handleTableChange = (newPagination: TablePaginationConfig) => {
		const p = newPagination.current || 1;
		const s = newPagination.pageSize || 10;
		fetchCategories(p, s, { sort: 'createdAt,desc' });
	};

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Slug',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Palabras clave',
			dataIndex: 'keywords',
			key: 'keywords',
			render: (keywords: any[]) =>
				keywords?.map((keyword, index) => (
					<Tag key={index} color="blue">
						{keyword}
					</Tag>
				)),
		},
		{
			title: 'Subcategorías',
			key: 'subcategories',
			render: (_: any, record: any) =>
				categories
					.filter((c) => c.parent === record.id)
					.map((child) => (
						<Button type="link" onClick={() => openDrawer(child)} key={child.id}>
							{child.name}
						</Button>
					)),
		},
		{
			title: 'Total de artículos',
			dataIndex: 'totalArticles',
			key: 'totalArticles',
			render: (total: number) => (
				<Typography.Text>{new Intl.NumberFormat('es-CL').format(total)}</Typography.Text>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_: any, record: any) => (
				<Space size="middle">
					<Button
						onClick={() => openDrawer(record)}
						type="primary"
						shape="circle"
						icon={<EditOutlined />}
					></Button>
				</Space>
			),
		},
	];
	return (
		<>
			<Row gutter={16}>
				<Col span={20}>
					<Title level={2}>Categorías</Title>
				</Col>
				<Col span={4} style={{ textAlign: 'right' }}>
					<Filter
						onChange={(filter: any) => {
							console.log('Los filtros: ', filter);
						}}
					/>
				</Col>
			</Row>
			<Text>
				Las categorías son divisiones o grupos que se establecen para clasificar y organizar
				elementos, ya sean objetos, ideas, palabras o conceptos, facilitando su búsqueda y
				comprensión. Se usan en diversos campos como la filosofía (para clasificar la realidad), la
				gramática (para agrupar palabras), la administración (para organizar tareas) o el comercio
				electrónico (para agrupar productos).
			</Text>
			<Table
				columns={columns}
				dataSource={categories}
				rowKey="id"
				loading={loading}
				pagination={pagination}
				onChange={handleTableChange}
			/>
		</>
	);
};
