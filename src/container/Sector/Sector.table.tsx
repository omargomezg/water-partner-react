import { Table, TableProps } from "antd";
import { Sector } from "../../types";
import { useEffect } from "react";
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
    }, [fetchSectors]);

    return <Table<Sector> style={{ width: '100%' }}
        rowKey="id"
        columns={columns}
        dataSource={data} />
}
export default SectorTable
