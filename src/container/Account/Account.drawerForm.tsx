import { Drawer } from "antd";
import { useAppStore } from "../../store/useAppStore";
import AccountForm from "./Account.form";

const AccountDrawerForm = () => {
    const openAccountForm = useAppStore((state) => state.openAccountForm);
    const setOpenAccountForm = useAppStore((state) => state.setOpenAccountForm);
    return <Drawer title='Editar/Crear Cuenta'
        open={openAccountForm} onClose={setOpenAccountForm}>
        <AccountForm></AccountForm>
    </Drawer>
}

export default AccountDrawerForm
