import ContentLayout from "../components/Layout/ContentLayout";
import {Button, Card, Form, Input, Select, Space, Table, TableProps, Typography} from "antd";
import {useClientStore} from "../store/Client.store";
import {FileExcelOutlined, FilterOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useMeterReadingStore} from "../store/MeterReading.store";
import MeterReadingDrawer from "../container/MeterReading/MeterReading.drawer";

interface DataType {
    key: string;
    code: string;
    client: string;
    diameter: string;
    createdAt: string | null;
    sector: string;
    address: string;
    lastValue: number;
    value: number | null;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Medidor',
        dataIndex: 'code',
        key: 'code'
    },
    {
        title: 'Cliente',
        dataIndex: 'client',
        key: 'client',
    },
    {
        title: 'Diametro',
        dataIndex: 'diameter',
        key: 'diameter',
    },
    {
        title: 'Sector',
        dataIndex: 'sector',
        key: 'sector',
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Lecturas',
        align: 'center',
        children: [
            {
                title: 'Anterior',
                dataIndex: 'lastValue',
                key: 'lastValue',
                align: 'center'
            },
            {
                title: 'Actual',
                key: 'value',
                dataIndex: 'value',
                align: 'center',
                render: (_, record) =>
                    <ReadingBox client={record}></ReadingBox>,
            }
        ]
    }
];

const data: DataType[] = [
    {
        key: '1',
        code: '1001-A',
        client: 'Juan Pérez Díaz',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-15T09:00:00Z',
        sector: 'El Roble',
        address: 'Av. Las Flores 123',
        lastValue: 300,
        value: 350,
    },
    {
        key: '2',
        code: '1002-B',
        client: 'María López Sotomayor',
        diameter: '25mm (3/4")',
        createdAt: null,
        sector: 'Las Lomas',
        address: 'Calle Los Sauces 456',
        lastValue: 750,
        value: null,
    },
    {
        key: '3',
        code: '1003-C',
        client: 'Carlos Gómez Torres',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-17T11:00:00Z',
        sector: 'Valle Verde',
        address: 'Pje. Los Pinos 789',
        lastValue: 100,
        value: 120,
    },
    {
        key: '4',
        code: '1004-D',
        client: 'Ana Fernández Rojas',
        diameter: '25mm (3/4")',
        createdAt: '2025-07-18T12:00:00Z',
        sector: 'Altos del Sol',
        address: 'Av. Principal 1011',
        lastValue: 600,
        value: 650,
    },
    {
        key: '5',
        code: '1005-E',
        client: 'Pedro Castillo Morales',
        diameter: '32mm (1")',
        createdAt: null,
        sector: 'Centro',
        address: 'Calle San Martín 202',
        lastValue: 1400,
        value: null,
    },
    {
        key: '6',
        code: '1006-F',
        client: 'Sofía Herrera Vidal',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-20T14:00:00Z',
        sector: 'El Roble',
        address: 'Av. Las Flores 145',
        lastValue: 390,
        value: 410,
    },
    {
        key: '7',
        code: '1007-G',
        client: 'Manuel Rodríguez Espinoza',
        diameter: '25mm (3/4")',
        createdAt: '2025-07-21T15:00:00Z',
        sector: 'Las Lomas',
        address: 'Calle Los Sauces 488',
        lastValue: 700,
        value: 725,
    },
    {
        key: '8',
        code: '1008-H',
        client: 'Elena Soto Cáceres',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-22T16:00:00Z',
        sector: 'Valle Verde',
        address: 'Pje. Los Pinos 790',
        lastValue: 200,
        value: 215,
    },
    {
        key: '9',
        code: '1009-I',
        client: 'Pablo Vargas Silva',
        diameter: '32mm (1")',
        createdAt: null,
        sector: 'Centro',
        address: 'Calle San Martín 205',
        lastValue: 1700,
        value: null,
    },
    {
        key: '10',
        code: '1010-J',
        client: 'Camila Reyes Castro',
        diameter: '25mm (3/4")',
        createdAt: '2025-07-24T18:00:00Z',
        sector: 'Altos del Sol',
        address: 'Av. Principal 1020',
        lastValue: 900,
        value: 930,
    },
    {
        key: '11',
        code: '1011-K',
        client: 'Ricardo Morales Pinto',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-25T19:00:00Z',
        sector: 'El Roble',
        address: 'Av. Las Flores 150',
        lastValue: 350,
        value: 380,
    },
    {
        key: '12',
        code: '1012-L',
        client: 'Daniela Olivares Fuentes',
        diameter: '25mm (3/4")',
        createdAt: null,
        sector: 'Las Lomas',
        address: 'Calle Los Sauces 500',
        lastValue: 650,
        value: null,
    },
    {
        key: '13',
        code: '1013-M',
        client: 'Francisco Muñoz Araya',
        diameter: '32mm (1")',
        createdAt: '2025-07-27T21:00:00Z',
        sector: 'Valle Verde',
        address: 'Pje. Los Pinos 810',
        lastValue: 1400,
        value: 1420,
    },
    {
        key: '14',
        code: '1014-N',
        client: 'Valeria Rojas Medina',
        diameter: '20mm (1/2")',
        createdAt: '2025-07-28T22:00:00Z',
        sector: 'Altos del Sol',
        address: 'Av. Principal 1035',
        lastValue: 270,
        value: 290,
    },
    {
        key: '15',
        code: '1015-O',
        client: 'Andrés Castro Rivas',
        diameter: '25mm (3/4")',
        createdAt: '2025-07-29T23:00:00Z',
        sector: 'Centro',
        address: 'Calle San Martín 210',
        lastValue: 700,
        value: 750,
    },
];

const MeterReadingPage = () => {
    return <ContentLayout>
        <Card style={{marginBottom: '10px'}}>
            <Form layout="inline">
                <Form.Item name="telefono"
                           label="Medidor">
                    <Input placeholder="Número del medidor"/>
                </Form.Item>
                <Form.Item name="telefono" label="Rut">
                    <Input/>
                </Form.Item>
                <Form.Item label="Periodo">
                    <Select placeholder="Seleccione un periodo"
                            style={{width: 200}}
                            options={[
                                {value: 1, label: "Enero"},
                                {value: 2, label: "Febrero"},
                                {value: 3, label: "Marzo"},
                                {value: 4, label: "Abril"},
                                {value: 5, label: "Mayo"},
                                {value: 6, label: "Junio"},
                                {value: 7, label: "Julio"},
                                {value: 8, label: "Agosto"},
                                {value: 9, label: "Septiembre"},
                                {value: 10, label: "Octubre"},
                                {value: 11, label: "Noviembre"},
                                {value: 12, label: "Diciembre"}
                            ]}/>
                </Form.Item>
                <Form.Item label="Sector">
                    <Select style={{width: 180}} defaultValue={1}
                            options={data
                                .map(d => d.sector)
                                .filter((sector, index, array) => array.indexOf(sector) === index)
                                .map(sector => ({value: sector, label: sector}))
                            }
                    />
                </Form.Item>
                <Form.Item label="Estado">
                    <Select style={{width: 180}} defaultValue={1}
                            options={[
                                {value: 1, label: "Todos"},
                                {value: 2, label: "Pendiente"},
                                {value: 3, label: "Lectura ingresada"}
                            ]}/>
                </Form.Item>
                <Button type="primary"><FilterOutlined/> Filtar</Button>
            </Form>
        </Card>
        <Card title="Listado de lecturas"
              extra={
                  <Space>
                      <Button type="default"><FileExcelOutlined />Exportar</Button>
                  </Space>
              }>
            <Table<DataType> style={{width: '100%'}}
                             rowKey="key"
                             size="small"
                             columns={columns}
                             dataSource={data}/>
        </Card>
        <MeterReadingDrawer></MeterReadingDrawer>
    </ContentLayout>
}

const ReadingBox = ({client}: any) => {
    const {setOpenForm} = useMeterReadingStore()
    if (client.value) {
        return (<Space direction="vertical" size={0}>
                <Typography.Text type="secondary">
                    {client.value}
                </Typography.Text>
                <Typography.Text type="secondary">
                    <small>{dayjs(client.createdAt).format('MMMM DD, YYYY')}</small>
                </Typography.Text>
            </Space>
        )
    }
    return <Button onClick={setOpenForm} block type="default"><PlusOutlined/> Agregar</Button>
}

export default MeterReadingPage