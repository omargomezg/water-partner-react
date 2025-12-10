import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {useMeterStore} from "../../store/Meter.store";
import {EditOutlined} from "@ant-design/icons";
import { Account } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";


const columns: TableProps<Account>['columns'] = [
    {
        title: 'Nombre',
        dataIndex: 'fullName',
        key: 'fullName',
    }, {
        title: 'Correo electrónico',
        dataIndex: 'email',
        key: 'email',
    }, {
        title: 'Rol',
        dataIndex: 'roles',
        key: 'roles',
        render: (roles) => roles?.join(', '),
    }, {
        title: 'Estado',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (enabled) => enabled ? 'Activo' : 'Inactivo',
    }, {
        title: 'Última actualización',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    }, {
        title: 'Último acceso',
        key: 'lastLogin',
        dataIndex: 'lastLogin',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    }, {
        title: 'Action',
        key: 'action',
        render: (_, record: Account) => (
            <RowButtons tariff={record} />
        ),
    }
];

const AccountTable = () => {
    const getAccounts = useAppStore((state) => state.getAccounts);
    const accounts = useAppStore((state) => state.accounts);
    useEffect(() => {
        getAccounts();
    }, [getAccounts]);

    return <Table<Account> style={{width: '100%'}}
                            rowKey="dni"
                            columns={columns}
        dataSource={accounts?.content}/>
}
const RowButtons = ({tariff}: any) => {
    const {setOpenForm} = useMeterStore()
    return <Space>
        <Button type="link" onClick={setOpenForm}>
            <EditOutlined/>
        </Button>
    </Space>
}
export default AccountTable
