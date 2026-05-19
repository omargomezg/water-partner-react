import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, TablePaginationConfig } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFilter } from "../../../components/CommonFilter";
import apiClient from "../../../services/apiClient";
import { PageResponse, WaterMeter } from "../../../types";
import { useMeter } from "./useMeter";
import { Filter } from "../../../types/Filter";

export const ListOfMetersContainer: FC = () => {
  const navigate = useNavigate();
  const { columns } = useMeter();
  const [loading, setLoading] = useState<boolean>(false);
  const [datasource, setDatasource] = useState<PageResponse<WaterMeter>>();
  const [filter, setFilter] = useState<Filter>({ sort: "createdAt,desc", page: 0, size: 5 } as Filter);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: datasource?.totalElements || 0,
  });

  const handleSetFilters = (filters: Filter) => {
    setFilter(filters);
    loadMeters({
      ...filters,
      page: 0,
      size: pagination.pageSize,
    });
  };

  const loadMeters = async (params: Filter) => {
    setLoading(true);
    try {
      const { data } = await apiClient.get<PageResponse<WaterMeter>>(
        `/api/meters`,
        {
          params,
        },
      );
      setDatasource(data);
      setPagination((prev) => ({
        ...prev,
        current: params.page + 1,
        pageSize: params.size,
        total: data.totalElements,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeters({
      ...filter,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }, []);

  const onPageChange = (newPagination: TablePaginationConfig) => {
    const p = newPagination.current || 1;
    const s = newPagination.pageSize || 10;
    loadMeters({
      ...filter,
      page: p - 1,
      size: s,
    });
  };

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Space>
          <CommonFilter onClose={handleSetFilters} type={0} />
        </Space>
      </Card>
      <Card
        title="Listado de medidores"
        extra={
          <Button
            type={"primary"}
            onClick={() => navigate("/configurations/meters/new")}
          >
            <PlusOutlined />
            Crear
          </Button>
        }
      >
        <Table<WaterMeter>
          style={{ width: "100%" }}
          rowKey="id"
          loading={loading}
          columns={columns}
          pagination={pagination}
          onChange={onPageChange}
          dataSource={datasource?.content}
        />
      </Card>
    </>
  );
};
