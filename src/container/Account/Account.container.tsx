import {Button, Card} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AccountTable from "./Account.table";

const AccountContainer = () => {
    return (
        <Card title="Todas las cuentas" extra={
            <Button type={'primary'}><PlusOutlined/>Crear</Button>
        }>
            <AccountTable/>
        </Card>
    )
}
export default AccountContainer
