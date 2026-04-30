import { TablePaginationConfig } from "antd";
import { useState, useEffect } from "react";
import { ApiResponse, Content } from "./types/types";
import { useListOfArticlesStore } from "./store/useListOfArticlesStore";
import apiClient from "../../../../services/apiClient";

export const useListOfArticles = () => {
  const content = useListOfArticlesStore((state) => state.articles);
  const setContent = useListOfArticlesStore((state) => state.setArticles);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const fetchData = async (page: number = 0, pageSize: number = 10) => {
    try {
      setLoading(true);
      const { data } = await apiClient.get<ApiResponse<Content>>(
        `/api/auth/articles?page=${page - 1}&size=${pageSize}&sort=createdAt,desc`,
      );
      setContent(data);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: data.totalElements,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (pagination.pageSize !== newPagination.pageSize) {
      fetchData(Number(1), Number(newPagination.pageSize));
    } else {
      fetchData(Number(newPagination.current), Number(newPagination.pageSize));
    }
  };
  return { handleTableChange, content, pagination, loading };
};
