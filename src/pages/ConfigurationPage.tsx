import {FC} from "react";
import '../App.css'
import ContentLayout from "../components/Layout/ContentLayout";
import {Tabs, TabsProps} from "antd";
import TariffContainer from "../container/tariff/Tariff.container";
import {MeterContainer} from "../container/meter/Meter.container";
import CheckAuthentication from "../components/CheckAuthentication";
import SectorContainer from "../container/Sector/Sector.container";
import PeriodContainer from "../container/Period/Period.container";
import AccountContainer from "../container/Account/Account.container";
import ClientTypeContainer from "../container/ClientType/ClientType.container";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tarifas',
        children: <TariffContainer/>,
    },
    {
        key: '2',
        label: 'Medidores',
        children: <MeterContainer/>,
    },
    {
        key: '3',
        label: 'Sectores',
        children: <SectorContainer/>,
    },
    {
        key: '4',
        label: 'Periodos',
        children: <PeriodContainer />,
    },
    {
        key: '5',
        label: 'Cuentas',
        children: <AccountContainer />,
    }, {
        key: '6',
        label: 'Tipo de Clientes',
        children: <ClientTypeContainer/>,
    },
];

const ConfigurationPage: FC = () => {
    return (
        <CheckAuthentication>
            <ContentLayout>
                <Tabs defaultActiveKey="1" items={items}/>
            </ContentLayout>
        </CheckAuthentication>
    )
}

export default ConfigurationPage
