import {Button, Drawer, Space} from "antd";
import ClientForm from "../ClientForm";
import {useAppStore} from "../../store/useAppStore";

type EditClientProps = {
    client?: {}
}

const ClientDrawerForm = ({client}: EditClientProps) => {
    const openForm = useAppStore((state) => state.openForm);
    const setOpenForm = useAppStore((state) => state.setOpenForm);
    return (<Drawer title='Editar cliente'
                    width={600}
                    extra={
                        <Space>
                            <Button onClick={setOpenForm}>Cancelar</Button>
                            <Button onClick={setOpenForm} type="primary">
                                Guardar
                            </Button>
                        </Space>
                    }
                    open={openForm} onClose={setOpenForm}>
            <ClientForm></ClientForm>
        </Drawer>
    )
}

export default ClientDrawerForm
