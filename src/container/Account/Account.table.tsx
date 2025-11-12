import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {useMeterStore} from "../../store/Meter.store";
import {EditOutlined} from "@ant-design/icons";

const AccountTable = () => {
    interface DataType {
        id: string,
        fullName: string,
        email: string,
        alias: string,
        principalSite: string,
        role: string,
        status: string,
        updatedAt: Date
    }
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'fullName',
            key: 'fullName',
        },{
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
        },{
            title: 'Sitio principal',
            dataIndex: 'principalSite',
            key: 'principalSite',
        },{
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
        },{
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },{
            title: 'Última actualización',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            render: (dateString) => {
                return dayjs(dateString).format('MMMM DD, YYYY');
            },
        }, {
            title: 'Action',
            key: 'action',
            render: (_, record: DataType) => (
                <RowButtons tariff={record}/>
            ),
        }
    ]
    const data: DataType[] = [
        {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fullName: "Omar Gómez",
            email: "ogomez@lavozdepuertovaras.cl",
            alias: "o.gomez",
            principalSite: "https://www.lavozdepuertovaras.cl",
            role: "Editor",
            status: "Active",
            updatedAt: new Date("2025-09-01T16:28:00.000Z")
        }
    ]
    return <Table<DataType> style={{width: '100%'}}
                            rowKey="id"
                            columns={columns}
                            dataSource={data}/>
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
