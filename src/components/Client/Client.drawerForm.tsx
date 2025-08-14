import {Button, Drawer, Space} from "antd";
import {useClientStore} from "../../store/Client.store";
import ClientForm from "../ClientForm";

type EditClientProps = {
    client?: {}
}

const ClientDrawerForm = ({client}: EditClientProps) => {
    const {openForm, setOpenForm} = useClientStore();
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
