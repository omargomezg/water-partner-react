import { SelectProps, TablePaginationConfig } from 'antd';
import { useState, useEffect } from 'react';
import { ApiResponse, Category, Content, Filter } from './types/types';
import { useListOfArticlesStore } from './store/useListOfArticlesStore';
import apiClient from '../../../../services/apiClient';
import { PageResponse } from '../../../../types';

export const useListOfArticles = () => {
	const content = useListOfArticlesStore((state) => state.articles);
	const setContent = useListOfArticlesStore((state) => state.setArticles);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<SelectProps[]>([]);
	const [filter, setFilter] = useState<Filter>({ sort: 'createdAt,desc' });
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	useEffect(() => {
		fetchData(pagination.current, pagination.pageSize);
		const fetchCategories = async () => {
			const { data } = await apiClient.get<PageResponse<Category>>(`/category`);
			const tempCategories: SelectProps[] = data.content.map((category: Category) => ({
				label: category.name,
				value: category.id,
			}));
			setCategories(tempCategories);
		};

		fetchCategories();
	}, []);

	const fetchData = async (
		page: number = 0,
		pageSize: number = 10,
		filter: Filter = { sort: 'createdAt,desc' },
	) => {
		try {
			setLoading(true);
			const { data } = await apiClient.get<ApiResponse<Content>>(`/api/auth/articles`, {
				params: {
					page: page - 1,
					size: pageSize,
					...filter,
				},
			});
			setContent(data);
			setPagination({
				...pagination,
				current: page,
				pageSize: pageSize,
				total: data.totalElements,
			});
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleTableChange = (newPagination: TablePaginationConfig) => {
		const p = newPagination.current || 1;
		const s = newPagination.pageSize || 10;
		fetchData(p, s, filter);
	};

	const handleApplyFilters = (filter: Filter) => {
		setFilter(filter);
		fetchData(1, pagination.pageSize, filter);
	};

	return {
		handleTableChange,
		handleApplyFilters,

		content,
		pagination,
		loading,
		categories,
	};
};
