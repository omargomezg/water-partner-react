import {FC} from "react";
import '../App.css'
import ContentLayout from "../components/Layout/ContentLayout";
import {Tabs, TabsProps} from "antd";
import TariffContainer from "../container/tariff/Tariff.container";
import {MeterContainer} from "../container/meter/Meter.container";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tarifas',
        children: <TariffContainer />,
    },
    {
        key: '2',
        label: 'Medidores',
        children: <MeterContainer />,
    },
    {
        key: '3',
        label: 'Sectores',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Periodos',
        children: 'Content of Tab Pane 4',
    },
];

const ConfigurationPage: FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <ContentLayout>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </ContentLayout>
    )
}

export default ConfigurationPage