import { FC, useEffect, useState } from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const ListOfCategoriesPage: FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);


    const fetchCategories = async () => {
        const {data} = await apiClient.get<any[]>("/category?onlyParents=true&totalArticles=true");
        setCategories(data);
    }

    const openDrawer = (category: any) => {
        navigate(`/configurations/category/${category.id}/edit`);
    }

    const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Palabras clave",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords: any[]) =>
        keywords?.map((keyword, index) => (
          <Tag key={index} color="blue">
            {keyword}
          </Tag>
        )),
    },
    {
      title: "Subcategorías",
      key: "subcategories",
      render: (_: any, record: any) =>
        categories
          .filter((c) => c.parent === record.id)
          .map((child) => (
            <Button type="link" onClick={() => openDrawer(child)} key={child.id}>
              {child.name}
            </Button>
          )),
    },
    {
      title: "Total de artículos",
      dataIndex: "totalArticles",
      key: "totalArticles",
      render: (total: number) => <Typography.Text>{new Intl.NumberFormat("es-CL").format(total)}</Typography.Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => openDrawer(record)} type="primary" shape="circle" icon={<EditOutlined />}></Button>
        </Space>
      ),
    },
  ];
    return (
    <>
    <Title level={2}>Categorías</Title>
    <Text>Las categorías son divisiones o grupos que se establecen para clasificar y organizar elementos, ya sean objetos,
        ideas, palabras o conceptos, facilitando su búsqueda y comprensión. Se usan en diversos campos como la filosofía
        (para clasificar la realidad), la gramática (para agrupar palabras), la administración (para organizar tareas) o
        el comercio electrónico (para agrupar productos).</Text>
    <Table columns={columns} dataSource={categories} rowKey="id" loading={categories.length === 0} />
    </>
    );
}