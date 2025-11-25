import {Drawer} from "antd";
import ClientForm from "../ClientForm";
import {useAppStore} from "../../store/useAppStore";

const ClientDrawerForm = () => {
    const openForm = useAppStore((state) => state.openForm);
    const setOpenForm = useAppStore((state) => state.setOpenForm);
    return (<Drawer title='Editar cliente'
                    width={600}
                    open={openForm} onClose={setOpenForm}>
            <ClientForm></ClientForm>
        </Drawer>
    )
}

export default ClientDrawerForm
