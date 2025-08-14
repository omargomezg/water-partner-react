import {Button, Drawer, Form, Input, Space} from "antd";
import {useClientStore} from "../../store/Client.store";

const ClientReadingRecordForm = () => {
    const {setOpenReadingRecordForm, openReadingRecordForm} = useClientStore();
    return (
        <Drawer title='Editar cliente'
                width={600}
                extra={
                    <Space>
                        <Button onClick={setOpenReadingRecordForm}>Cancelar</Button>
                        <Button onClick={setOpenReadingRecordForm} type="primary">
                            Guardar
                        </Button>
                    </Space>
                }
                open={openReadingRecordForm} onClose={setOpenReadingRecordForm}>
            <Form layout={'vertical'}>
                <Form.Item name="nombre" label="Periodo" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="fullName" label="Lectura anterior" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="fullName" label="Lectura actual" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
export default ClientReadingRecordForm