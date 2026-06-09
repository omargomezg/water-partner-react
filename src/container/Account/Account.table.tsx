import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import { User } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const columns: TableProps<User>['columns'] = [
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
        dataIndex: 'active',
        key: 'active',
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
        render: (_, record: User) => (
            <RowButtons user={record} />
        ),
    }
];

const AccountTable = () => {
    const getAccounts = useAppStore((state) => state.getAccounts);
    const accounts = useAppStore((state) => state.accounts);
    useEffect(() => {
        getAccounts();
    }, [getAccounts]);

    return <Table<User> style={{width: '100%'}}
                            rowKey="id"
                            columns={columns}
        dataSource={accounts?.content}/>
}
const RowButtons = ({user}: any) => {
    const navigate = useNavigate();

    return <Space>
        <Button type="link" onClick={() => navigate(`/clients/${user.id}/edit`)}>
            <EditOutlined/>
        </Button>
    </Space>
}
export default AccountTable
