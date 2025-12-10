import { Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AccountTable from "./Account.table";
import { useAppStore } from "../../store/useAppStore";
import AccountDrawerForm from "./Account.drawerForm";

const AccountContainer = () => {
    const setOpenAccountForm = useAppStore((state) => state.setOpenAccountForm);
    return (<>
        <Card title="Todas las cuentas" extra={
            <Button type={'primary'} onClick={setOpenAccountForm}><PlusOutlined />Crear</Button>
        }>
            <AccountTable />
        </Card>
        <AccountDrawerForm />
    </>
    )
}
export default AccountContainer
