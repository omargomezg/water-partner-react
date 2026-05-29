import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { useFormSite } from "../useFormSite";
import { MinusCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { CardStyle } from "../../../components/CardStyle";
import { TagManager } from "../../../components/TagManager";

const { Title } = Typography;

const rrss = [
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  {
    value: "X",
    label: "X",
  },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "YouTube", label: "YouTube" },
];

const templates = [
  { value: "index", label: "Estándar" },
  { value: "index-classic", label: "Clásica" },
];

export const FormSitePage: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, site, categories, otherSites, handleCancel, handleSubmit } = useFormSite(form, {
    onSuccess: (msg) => message.success(msg),
    onError: (err) => message.error(err),
  });


  return (
    <Spin spinning={loading}>
      <Row>
      <Col span={22} offset={1}>
        <Form onFinish={handleSubmit} autoComplete="off" form={form} layout="vertical">
          <Title level={2} title={site?.name}></Title>
          <CardStyle title="Configuración general">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="URL"
                  name="url"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "url",
                      warningOnly: true,
                    },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Plantilla de inicio" name="homeTemplate">
                  <Select options={templates} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Descripción" name="description" rules={[{ required: true }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
                <Form.Item label="Google Tag ID" name="googleTagID">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Logo" name="logo" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Icono favicon" name="favicon" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </CardStyle>
          <CardStyle title="Identidad">
            <Divider orientation="vertical">Misión y visión</Divider>
            <Form.Item
              label="Misión"
              name="mission"
              rules={[{ required: true, message: "Por favor ingrese la misión" }]}
            >
              <TextArea rows={8} />
            </Form.Item>
            <Form.Item
              label="Visión"
              name="vision"
              rules={[{ required: true, message: "Por favor ingrese la visión" }]}
            >
              <TextArea rows={8} />
            </Form.Item>
          </CardStyle>
          <CardStyle title="Redes sociales">
            <Form.List name="socialNetworks">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
                      >
                        <Select options={rrss} style={{ width: "200px" }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "url"]}
                        rules={[
                          {
                            type: "url",
                            warningOnly: true,
                            message: "URL inválida",
                          },
                          {
                            type: "string",
                            min: 6,
                            message: "URL demasiado corta",
                          },
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="URL" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Añadir Red Social
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
          </CardStyle>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <CardStyle title="Integración con otros contenidos">
                <Form.Item label="Permite mostrar contenidos de los siguientes sitios" name="relatedSites">
                  <Select mode="multiple" style={{ width: "100%" }} options={otherSites} placeholder="Selecciona sitios" />
                </Form.Item>
              </CardStyle>
            </Col>
            <Col span={12}>
              <CardStyle title="Mostrar las siguientes categorías">
                <Row gutter={[16, 24]}>
                  <Col span={12}>
                    <Form.Item label="Categorías" name="categories">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        options={categories}
                        placeholder="Selecciona categorías"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Palabras claves" name="keywords">
                      <TagManager />
                    </Form.Item>
                  </Col>
                </Row>
              </CardStyle>
            </Col>
          </Row>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Space>
              <Button type="text" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="primary" htmlType={"submit"}>
                Guardar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </Spin>
  );
};
