import { Card, Form, Input } from "antd";
import { Content } from "./types/types";

type Props = {
  open: boolean;
  initialValues: Content | null;
  onClose: () => void;
  onSubmit: (content: Content) => void;
};

const ContentForm = ({ open, initialValues, onClose, onSubmit }: Props) => {
  const [form] = Form.useForm();
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
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Breve descripción"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ContentForm;
