import {Table, TableProps} from "antd";
import dayjs from "dayjs";
import DiameterText from "../../components/DiameterText";
import { Sector } from "../../types";
import useApp from "antd/es/app/useApp";
import { useEffect } from "react";
import { data } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";

const columns: TableProps<Sector>['columns'] = [
    {
        title: 'Descripción',
        dataIndex: 'name',
        key: 'name'
    },
]

const SectorTable = () => {
    const fetchSectors = useAppStore(state => state.fetchSectors);
    const data = useAppStore(state => state.sectors);
    
    useEffect(() => {
        fetchSectors();
    }, []);

    return <Table<Sector> style={{width: '100%'}}
                            rowKey="id"
                            columns={columns}
                            dataSource={data}/>
}
export default SectorTable
