import { Button, Drawer, Flex, Form, Input } from 'antd';
import { useAppStore } from '../../store/useAppStore';

const DrawerForm = () => {
    const open = useAppStore((state) => state.openSectorDrawerForm);
    const setOpen = useAppStore((state) => state.setOpenSectorDrawerForm);
    const create = useAppStore((state) => state.createSector);
    const onFinish = async (values: any) => {
        await create(values);
    }
    return (
        <Drawer open={open} onClose={setOpen} >
            { open &&
            <Form layout="vertical" onFinish={onFinish} initialValues={{name: ''}}>
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Flex gap="middle" justify="flex-end">
                    <Button onClick={setOpen}>Cancelar</Button>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Flex>
            </Form>}
        </Drawer>
    );
};

export default DrawerForm;
