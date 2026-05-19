import { TableProps } from "antd";
import { WaterMeter } from "../../../types";
import dayjs from "dayjs";
import DiameterText from "../../../components/DiameterText";
import { RowButtons } from "./Meter.table";

export const useMeter = () => {
const columns: TableProps<WaterMeter>['columns'] = [
    {
        title: 'Número de Serie',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
    },
    {
        title: 'Marca',
        dataIndex: 'trademark',
        key: 'trademark',
    },
    {
        title: 'Tamaño',
        dataIndex: 'diameter',
        key: 'diameter',
        render: (diameter: string) => <DiameterText diameter={diameter} />,
    },
    {
        title: 'Última actualización',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (_, record: WaterMeter) => (
            <RowButtons meter={record} onSelect={handleOnSelectMeter}/>
        ),
    },
];

const handleOnSelectMeter = (meter: WaterMeter) => {
    console.log('Selected meter:', meter);
}

    return {columns}
}