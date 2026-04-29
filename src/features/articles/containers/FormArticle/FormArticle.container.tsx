import { Form, Space, Input, Row, Col, Typography, Select, Spin } from "antd";
import RichEditor from "../../../../components/RichEditor";
import { useFormArticle } from "./useFormArticle";
import { Content } from "./type/type";
import { HeaderButtons } from "./components/HeaderButtons";
import { HeaderInfo } from "./components/HeaderInfo";
import { Permalink } from "./components/Permalink";
import { InputFeatureImage } from "./components/InputFeatureImage";
import { InputTags } from "./components/InputTags";
import { ButtonSummaryIA } from "./components/ButtonSummaryIA";

const { Text } = Typography;

export const FormArticleContainer = () => {
  const [form] = Form.useForm<Content>();
  const {
    content,
    loading,
    handleSubmit,
    categories,
    screens,
    handleChangeTags,
  } = useFormArticle({ form });
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        initialValues={content}
        onFinish={() => console.log("onFinish")}
      >
        <Space
          style={{ width: "100%", justifyContent: "end" }}
          direction={"horizontal"}
          size="small"
          wrap
        >
          <HeaderButtons onClickPublish={handleSubmit} />
        </Space>
        <HeaderInfo
          createdAt={content.createdAt}
          updatedAt={content.updatedAt}
        />
        {screens.xs && !screens.sm && (
          <InputFeatureImage
            featureImage={content.featureImage}
            width={screens.sm || screens.xs ? "100%" : "200px"}
          />
        )}
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Please enter the title!" }]}
          extra={
            <Permalink permalink={content.permalink} title={content.title} />
          }
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
                  id={content.id}
                  permalink={content.permalink}
                  onChange={(value) => form.setFieldsValue({ summary: value })}
                />
              }
              rules={[
                { required: true, message: "Please enter the description!" },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item
              name="content"
              label="Contenido"
              rules={[
                {
                  required: true,
                  message: "La noticia o artículo no puede estar vacío",
                },
              ]}
            >
              <RichEditor />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
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
              name={["categoryId"]}
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
            <Form.Item label="Etiquetas">
              <InputTags
                tags={content.listOfTags}
                onChange={handleChangeTags}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
