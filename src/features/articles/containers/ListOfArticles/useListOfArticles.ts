import { TablePaginationConfig } from "antd";
import { useState, useEffect } from "react";
import { ApiResponse, Content } from "./types/types";

export const useListOfArticles = () => {
  const [content, setContent] = useState<ApiResponse<Content>>();
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
      const response = await fetch(
        `http://localhost:8080/article?page=${page - 1}&size=${pageSize}`,
      );
      const data: ApiResponse<Content> = await response.json();
      setContent(data);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: data.totalElements,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (pagination.pageSize !== newPagination.pageSize) {
      fetchData(Number(1), Number(newPagination.pageSize));
    } else {
      fetchData(Number(newPagination.current), Number(newPagination.pageSize));
    }
  };
  return { handleTableChange, content, pagination };
};