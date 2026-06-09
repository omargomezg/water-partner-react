import { Col, Form, Input, message, Row, Select, Space, Spin, Typography } from 'antd';
import RichEditor from '../../../components/RichEditor';
import { ButtonSummaryIA } from '../containers/FormArticle/components/ButtonSummaryIA';
import { HeaderButtons } from '../containers/FormArticle/components/HeaderButtons';
import { HeaderInfo } from '../containers/FormArticle/components/HeaderInfo';
import { InputFeatureImage } from '../containers/FormArticle/components/InputFeatureImage';
import { InputTags } from '../containers/FormArticle/components/InputTags';
import { Permalink } from '../containers/FormArticle/components/Permalink';
import { Content } from '../containers/FormArticle/type/type';
import { useFormArticle } from './useFormArticle';

const { Text } = Typography;

export const FormArticlePage = () => {
	const [form] = Form.useForm<Content>();
	const {
		content,
		loading,
		handleSubmit,
		categories,
		screens,
		handleChangeTags,
		handleSaveDraft,
		handleRemoveDraft,
	} = useFormArticle(form, {
		onSuccess: (msg) => message.success(msg),
		onError: (err) => message.error(err),
	});
	return (
		<Spin spinning={loading}>
			<Form
				form={form}
				layout="vertical"
				initialValues={content}
				onFinish={() => console.log('onFinish')}
			>
				<Space
					style={{ width: '100%', justifyContent: 'end' }}
					orientation={'horizontal'}
					size="small"
					wrap
				>
					<HeaderButtons
						isDraft={content.status === 'DRAFT'}
						onClickRemoveDraft={handleRemoveDraft}
						onClickPublish={handleSubmit}
						onClickSaveDraft={handleSaveDraft}
					/>
				</Space>
				<HeaderInfo
					status={content.status}
					createdAt={content.createdAt}
					updatedAt={content.updatedAt}
				/>
				{screens.xs && !screens.sm && (
					<InputFeatureImage
						articleId={content.id}
						featureImage={content.featureImage}
						width={screens.sm || screens.xs ? '100%' : '200px'}
					/>
				)}
				<Form.Item
					name="title"
					label="Título"
					rules={[{ required: true, message: 'Please enter the title!' }]}
					extra={<Permalink permalink={content.permalink} title={content.title} />}
				>
					<Input size="large" />
				</Form.Item>
				<Row justify="space-between" align="top" gutter={8}>
					<Col xs={24} md={18}>
						<Form.Item
							name="summary"
							label="Descripción"
							extra={
								<ButtonSummaryIA
									content={form.getFieldValue('content')}
									onChange={(value) => form.setFieldsValue({ summary: value })}
								/>
							}
							rules={[{ required: true, message: 'Please enter the description!' }]}
						>
							<Input.TextArea rows={5} />
						</Form.Item>
						<Form.Item
							name="content"
							label="Contenido"
							rules={[
								{
									required: true,
									message: 'La noticia o artículo no puede estar vacío',
								},
							]}
						>
							<RichEditor />
						</Form.Item>
					</Col>
					<Col xs={24} md={6}>
						<Form.Item>
							{screens.sm && (
								<div
									style={{
										borderRadius: '8px',
										border: '1px solid #d9d9d9', // Un gris más suave para que no compita con la imagen
										boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave y moderna
										padding: '1px 1x', // Espacio interno para que el borde no esté pegado al contenido
										backgroundColor: '#fff', // Fondo blanco para que la sombra resalte
										marginBottom: '16px',
										overflow: 'hidden',
									}}
								>
									<InputFeatureImage articleId={content.id} featureImage={content.featureImage} />
									{content.featureImage?.title && (
										<span
											style={{
												display: 'block',
												margin: '2px 0 2px 0',
												color: '#8c8c8c',
												textAlign: 'center',
											}}
										>
											{content.featureImage?.title}
										</span>
									)}
								</div>
							)}
						</Form.Item>
						<Form.Item
							label="Url externa"
							extra={
								<Text type="secondary">
									Es necesario cuando la noticia es una copia de otro sitio.
								</Text>
							}
							name="referringSite"
							rules={[
								{
									type: 'url',
								},
								{
									type: 'string',
									min: 6,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Categoría"
							name={['category']}
							labelCol={{ span: 9 }}
							rules={[
								{
									required: true,
									message: 'Por favor seleccione una categoría',
								},
							]}
						>
							<Select options={categories} />
						</Form.Item>
						<Form.Item label="Etiquetas" name={['tags']}>
							<InputTags onChange={handleChangeTags} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Spin>
	);
};
