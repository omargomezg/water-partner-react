import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, TablePaginationConfig } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFilter, FilterTypes } from "../../../components/CommonFilter";
import apiClient from "../../../services/apiClient";
import { PageResponse, WaterMeter } from "../../../types";
import { Filter } from "../../../types/Filter";
import { useMeter } from "./useMeter";

export const ListOfMetersPage: FC = () => {
  const navigate = useNavigate();
  const { columns } = useMeter();

  const [loading, setLoading] = useState<boolean>(false);
  const [datasource, setDatasource] = useState<PageResponse<WaterMeter>>();

  const [filter, setFilter] = useState<Filter>({
    sort: "createdAt,desc",
    page: 0,
    size: 5,
  });

  const loadMeters = useCallback(async (currentFilter: Filter) => {
    setLoading(true);
    try {
      const { data } = await apiClient.get<PageResponse<WaterMeter>>(
        `/api/meters`,
        { params: currentFilter },
      );
      setDatasource(data);
    } catch (err) {
      console.error("Error loading water meters:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeters(filter);
  }, [filter, loadMeters]);

  const handleSetFilters = (newFilters: Filter) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilters,
      page: 0,
    }));
  };

  const handleTableChange = (paginationConfig: TablePaginationConfig) => {
    const p = paginationConfig.current ? paginationConfig.current - 1 : 0;
    const s = paginationConfig.pageSize || 5;

    setFilter((prev) => ({
      ...prev,
      page: p,
      size: s,
    }));
  };

  const antPaginationConfig: TablePaginationConfig = {
    current: filter.page + 1,
    pageSize: filter.size,
    total: datasource?.totalElements || 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    showTotal: (total) => (total > 5 ? `Hay ${total} medidores` : ""),
  };

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Space>
          <CommonFilter onClose={handleSetFilters} type={FilterTypes.Meter} />
        </Space>
      </Card>

      <Card
        title="Listado de medidores"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/configurations/meters/new")}
          >
            Crear
          </Button>
        }
      >
        <Table<WaterMeter>
          style={{ width: "100%" }}
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={datasource?.content}
          pagination={antPaginationConfig}
          onChange={handleTableChange}
        />
      </Card>
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
