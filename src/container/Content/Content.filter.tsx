import {Button, Form, Input, Select} from "antd";

const ContentFilter = () => {
    const [form] = Form.useForm();
    return <Form layout="inline" form={form}>
        <Form.Item label="Texto de búsqueda">
            <Input placeholder="Ingresa alguna palabra clave"/>
        </Form.Item>
        <Form.Item label="Categoría">
            <Select placeholder="Selecciona una categoría" style={{width: 200}}>
                <Select.Option value="all">Todas</Select.Option>
                <Select.Option value="news">Noticias</Select.Option>
                <Select.Option value="blog">Blogs</Select.Option>
                <Select.Option value="tutorial">Tutoriales</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item label="Ordernar por">
            <Select placeholder="Selecciona un criterio" style={{width: 200}}>
                <Select.Option value="date">Fecha</Select.Option>
                <Select.Option value="title">Título</Select.Option>
                <Select.Option value="author">Autor</Select.Option>
            </Select>
        </Form.Item>
        <Button>Filtrar</Button>
    </Form>;
}

export default ContentFilter;
