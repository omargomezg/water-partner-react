import { useNavigate, useParams } from 'react-router-dom';
import { Category, Content, Tags } from '../containers/FormArticle/type/type';
import { useState, useEffect } from 'react';
import { Form, FormInstance, Grid, SelectProps } from 'antd';
import apiClient from '../../../services/apiClient';
import axios from 'axios';
import { PageResponse } from '../../../types';
const { useBreakpoint } = Grid;

interface FormArticleOptions {
	onSuccess: (message: string) => void;
	onError: (message: string) => void;
}

export const useFormArticle = (
	form: FormInstance<Content>,
	{ onSuccess, onError }: FormArticleOptions,
) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [content, setContent] = useState<Content>({} as Content);
	const [categories, setCategories] = useState([] as SelectProps[]);
	const [loading, setLoading] = useState(false);
	const values = Form.useWatch([], form);
	const screens = useBreakpoint();

	useEffect(() => {
		if (id) {
			fetchContent();
		}
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const { data } = await apiClient.get<PageResponse<Category>>(`/category`);
			setCategories(
				data.content?.map((category: Category) => ({
					label: category.name,
					value: category.id,
				})),
			);
		};

		fetchCategories();
	}, []);

	const fetchContent = async () => {
		setLoading(true);
		const { data } = await apiClient.get<Content>(`/api/auth/articles/${id}`);
		setContent(data);
		form.setFieldsValue(data);
		setLoading(false);
	};

	const handleSubmit = async () => {
		try {
			await form.validateFields({ validateOnly: true });
			const tContent = { ...content };
			tContent.category = values.category;
			tContent.title = values.title;
			tContent.summary = values.summary;
			tContent.content = values.content;
			tContent.referringSite = values.referringSite;
			setContent(tContent);
			if (content.id) {
				await apiClient.put<Content>(`/api/auth/articles/${content.id}`, tContent);
			} else {
				await apiClient.post<Content>(`/api/auth/articles`, tContent);
			}
			navigate(`/articles`);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				onError(err.response?.data.message);
			}
		}
	};

	const handleChangeTags = (tags: Tags[]) => {
		const tempContent = { ...content };
		tempContent.tags = tags;
		setContent(tempContent);
		form.setFieldsValue(tempContent);
	};

	const setTitle = (title: string) => {
		if (!content?.id) {
			const permalink = title
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-z0-9\s]/g, '')
				.replace(/\s+/g, '-')
				.trim();
			form.setFieldsValue({ permalink: permalink });
		}
	};

	const handleSaveDraft = async () => {
		const draft = {
			title: form.getFieldValue('title'),
			contentId: content.id,
			permalink: content.permalink,
			createdAt: content.createdAt,
			summary: form.getFieldValue('summary'),
			content: form.getFieldValue('content'),
			referringSite: form.getFieldValue('referringSite'),
			categoryId: form.getFieldValue('category'),
			tags: form.getFieldValue('tags'),
		};
		await apiClient.post<Content>(`/api/auth/articles/${content.id}/draft`, draft);
		setContent((prev) => ({
			...prev,
			status: 'DRAFT',
		}));
		onSuccess('Borrador guardado');
	};

	const handleRemoveDraft = async () => {
		await apiClient.delete<Content>(`/api/auth/articles/${content.id}/draft`);
		fetchContent();
		onSuccess('Borrador eliminado');
	};

	return {
		content,
		categories,
		loading,
		screens,

		handleSubmit,
		handleChangeTags,
		handleSaveDraft,
		handleRemoveDraft,
		setTitle,
	};
};
