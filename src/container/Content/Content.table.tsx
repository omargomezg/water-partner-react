import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {useMeterStore} from "../../store/Meter.store";

interface DataType {
    id: string,
    title: string,
    summary: string,
    tags: string[],
    category: string,
    updatedAt: string
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Titulo',
        dataIndex: 'title',
        key: 'title',
        render: (_: any, record: DataType) => (
            TitleContent(record.title, record.summary)
        )
    },
    {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Etiquetas',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags: string[]) => (
            <>
                {tags.map(tag => (
                    <span key={tag} style={{
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        marginRight: '4px',
                        display: 'inline-block'
                    }}>
                        {tag}
                    </span>
                ))}
            </>
        )
    },
    {
        title: 'Última actualización',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record: DataType) => (
            <RowButtons tariff={record}/>
        ),
    },
];

const data: DataType[] = [
    {
        id: "1",
        title: "Introducción a React",
        summary: "Una guía básica para comenzar con React y comprender sus conceptos principales.",
        tags: ["react", "frontend", "javascript"],
        category: "Programación",
        updatedAt: "2025-08-25T10:15:00Z",
    },
    {
        id: "2",
        title: "Buenas prácticas con TypeScript",
        summary: "Consejos prácticos para mantener tu código TypeScript limpio y escalable.",
        tags: ["typescript", "buenas-practicas", "desarrollo"],
        category: "Programación",
        updatedAt: "2025-08-28T18:30:00Z",
    },
    {
        id: "3",
        title: "Patrones de diseño en JavaScript",
        summary: "Exploramos patrones de diseño comunes como Singleton, Observer y Factory.",
        tags: ["javascript", "design-patterns"],
        category: "Arquitectura de Software",
        updatedAt: "2025-07-10T09:45:00Z",
    },
    {
        id: "4",
        title: "Optimización de consultas en SQL",
        summary: "Cómo mejorar el rendimiento de tus bases de datos con índices y buenas prácticas de queries.",
        tags: ["sql", "database", "performance"],
        category: "Bases de Datos",
        updatedAt: "2025-08-05T14:20:00Z",
    },
    {
        id: "5",
        title: "Docker para principiantes",
        summary: "Aprende a crear, ejecutar y administrar contenedores Docker de forma sencilla.",
        tags: ["docker", "devops", "containers"],
        category: "Infraestructura",
        updatedAt: "2025-09-01T08:00:00Z",
    },
];

const ContentTable = () => {
    return (
        <Table<DataType> style={{width: '100%'}}
                         rowKey="id"
                         columns={columns}
                         dataSource={data}/>
    )
}

const RowButtons = ({tariff}: any) => {
    const {setOpenForm} = useMeterStore()
    return <Space>
        <Button type="link" onClick={setOpenForm}>
            <EditOutlined/>
        </Button>
    </Space>
}

const TitleContent = (title: string, summary: string) => {
    return <div>
        <b>{title}</b>
        <p style={{margin: 0, color: '#888'}}>{summary}</p>
    </div>
}

export default ContentTable;
