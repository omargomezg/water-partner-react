import { Card, Col, Form, Input, Row, Select, Space, Spin, Typography } from "antd";
import RichEditor from "../../../../components/RichEditor";
import { ContentFormButtons } from "./Content.formButtons";
import useCategoryStore from "../../store/useCategoryStore";
import useContentFormManager from "./useContentFormManager";
import { Content } from "../../types/types";

const { Text } = Typography;


const ContentForm = () => {
  const [form] = Form.useForm<Content>();
  const categories = useCategoryStore((state) => state.categoryForSelect);
  const {content, loading, handleSubmit, isValid} = useContentFormManager({ form });

  return (
    <Spin spinning={loading}>
    <Card>
      <Form
        form={form}
        layout="vertical"
        initialValues={content}
        onFinish={handleSubmit}
      >
        <Space style={{ width: "100%", justifyContent: "end" }} direction={"horizontal"} size="small" wrap>
          <ContentFormButtons isValid={isValid} />
        </Space>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Row justify="space-between" align="top" gutter={8}>
          <Col xs={24} md={18}>
            <Form.Item
              name="summary"
              label="Descripción"
              rules={[
                { required: true, message: "Please enter the description!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="content"
              label="Contenido"
              rules={[{ required: true, message: "Please enter the content!" }]}
            >
              <RichEditor />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} >
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
                  type: "url",
                },
                {
                  type: "string",
                  min: 6,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Categoría"
              name={["category", "id"]}
              labelCol={{ span: 9 }}
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione una categoría",
                },
              ]}
            >
              <Select options={categories} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
    </Spin>
  );
};

export default ContentForm;
