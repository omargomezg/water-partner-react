import {Form, Input, Modal} from "antd";
import {Content} from "./Content.model";

type Props = {
    open: boolean;
    initialValues: Content | null;
    onClose: () => void;
    onSubmit: (content: Content) => void;
}

const ContentForm = ({open, initialValues, onClose, onSubmit}: Props) => {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
            form.resetFields();
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal title={initialValues ? "Edit Content" : "Create Content"}
               open={open}
               onCancel={onClose}
               onOk={handleOk}
        >
            <Form form={form}
                  layout="vertical"
                  initialValues={initialValues ?? {title: '', description: ''}}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true, message: 'Please enter the title!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Please enter the description!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ContentForm;
