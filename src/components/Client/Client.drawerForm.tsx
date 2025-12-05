import {Drawer} from "antd";
import ClientForm from "../ClientForm";
import {useAppStore} from "../../store/useAppStore";
import { Client } from "../../types";

const ClientDrawerForm = () => {
    const openClientForm = useAppStore((state) => state.openClientForm);
    const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);
    const client = useAppStore((state) => state.client);

    return (<Drawer title='Editar cliente'
                    width={600}
                    open={openClientForm} onClose={setClientOpenForm}>
            <ClientForm client={client as Client}></ClientForm>
        </Drawer>
    )
}

export default ClientDrawerForm
