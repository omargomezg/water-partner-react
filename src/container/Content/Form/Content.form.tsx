import { Card, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import { Content } from "../types/types";
import RichEditor from "../../../components/RichEditor";
import useCategoryStore from "../store/CategoryStore";
import { ContentFormButtons } from "./Content.formButtons";

const { Text } = Typography;

type Props = {
  open: boolean;
  initialValues: Content;
  onClose: () => void;
  onSubmit: (content: Content) => void;
};

const ContentForm = ({ open, initialValues, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm();
  const categories = useCategoryStore((state) => state.categoryForSelect);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues ?? { title: "", description: "" }}
      >
        <Space style={{ width: "100%", justifyContent: "end" }} direction={"horizontal"} size="small" wrap>
          <ContentFormButtons />
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
              name="description"
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
  );
};

export default ContentForm;
