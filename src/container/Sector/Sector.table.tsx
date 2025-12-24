import {Table, TableProps} from "antd";
import dayjs from "dayjs";
import DiameterText from "../../components/DiameterText";

const SectorTable = () => {
    interface DataType {
        id: string,
        diameter: string,
        fixedCharge: number,
        amountPerM3: number,
        clientType: string,
        updatedAt: Date
    }
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Diametro',
            dataIndex: 'diameter',
            key: 'diameter',
            render: (diameter: string) => <DiameterText diameter={diameter} />,
        },{
            title: 'Cargo fijo',
            dataIndex: 'fixedCharge',
            key: 'fixedCharge',
        },{
            title: 'Valor m3',
            dataIndex: 'amountPerM3',
            key: 'amountPerM3',
        },{
            title: 'Tipo de cliente',
            dataIndex: 'clientType',
            key: 'clientType',
        },{
            title: 'Última actualización',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            render: (dateString) => {
                return dayjs(dateString).format('MMMM DD, YYYY');
            },
        }
    ]
    const data: DataType[] = [
        {
            id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
            diameter: '1/2 pulgadas',
            fixedCharge: 15.50,
            amountPerM3: 2.75,
            clientType: 'residencial',
            updatedAt: new Date('2023-10-26T10:00:00Z')
        },
        {
            id: 'b2c3d4e5-f6a7-8b9c-0d1e-f2g3h4i5j6k7',
            diameter: '3/4 pulgadas',
            fixedCharge: 25.00,
            amountPerM3: 3.20,
            clientType: 'comercial',
            updatedAt: new Date('2023-10-25T14:30:00Z')
        },
        {
            id: 'c3d4e5f6-a7b8-c9d0-e1f2-g3h4i5j6k7l8',
            diameter: '1 pulgada',
            fixedCharge: 45.75,
            amountPerM3: 4.10,
            clientType: 'industrial',
            updatedAt: new Date('2023-10-24T08:15:00Z')
        },
        {
            id: 'd4e5f6a7-b8c9-d0e1-f2g3-h4i5j6k7l8m9',
            diameter: '1 1/2 pulgadas',
            fixedCharge: 70.00,
            amountPerM3: 5.50,
            clientType: 'comercial',
            updatedAt: new Date('2023-10-23T16:45:00Z')
        },
        {
            id: 'e5f6a7b8-c9d0-e1f2-g3h4-i5j6k7l8m9n0',
            diameter: '2 pulgadas',
            fixedCharge: 95.25,
            amountPerM3: 6.80,
            clientType: 'industrial',
            updatedAt: new Date('2023-10-22T09:20:00Z')
        }
    ]
    return <Table<DataType> style={{width: '100%'}}
                            rowKey="id"
                            columns={columns}
                            dataSource={data}/>
}
export default SectorTable
