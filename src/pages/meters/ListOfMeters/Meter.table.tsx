import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Space, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import { PageResponse, WaterMeter } from "../../../types";
import { constants } from "../../../utils/Utils";
import { Filter } from "../../../types/Filter";

type MeterTableProps = {
  columns?: TableProps<WaterMeter>["columns"];
  datasource?: PageResponse<WaterMeter>;
  onPageChange?: (pageNumber: number) => void;
  filter?: Filter;
};

const MeterTable: FC<MeterTableProps> = ({
  columns,
  datasource,
  onPageChange,
  filter = { page: 0, size: 5 },
}) => {
  const loadingMeters = useAppStore((state) => state.loadingWaterMeters);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: constants.PAGE_SIZE,
    total: datasource?.totalElements || 0,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      pageSize: constants.PAGE_SIZE,
      total: datasource?.totalElements || 0,
    });
  }, [datasource]);

  return (
    <>
      <Table<WaterMeter>
        style={{ width: "100%" }}
        rowKey="id"
        loading={loadingMeters}
        columns={columns}
        pagination={pagination}
        onChange={(p) => onPageChange && onPageChange(p.current || 0)}
        dataSource={datasource?.content}
      />
    </>
  );
};

type PropsRowButtons = {
  meter: WaterMeter;
  onSelect: (meter: WaterMeter) => void;
};

export const RowButtons: FC<PropsRowButtons> = ({ meter, onSelect }) => {
  const navigate = useNavigate();

  return (
    <Space>
      <Button
        type="link"
        onClick={() => navigate(`/configurations/meters/${meter.id}/edit`)}
      >
        <EditOutlined />
      </Button>
    </Space>
  );
};

export default MeterTable;
