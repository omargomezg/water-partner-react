import {Drawer} from "antd";
import ClientForm from "../ClientForm";
import {useAppStore} from "../../store/useAppStore";

const ClientDrawerForm = () => {
    const openClientForm = useAppStore((state) => state.openClientForm);
    const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);
    return (<Drawer title='Editar cliente'
                    width={600}
                    open={openClientForm} onClose={setClientOpenForm}>
            <ClientForm></ClientForm>
        </Drawer>
    )
}

export default ClientDrawerForm
