import {ControlOutlined, DashOutlined, FileDoneOutlined, FilePdfOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {Menu} from "antd";

const menuItems = [
    {
        key: '/dashboard',
        icon: <DashOutlined/>,
        label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
        key: '/meter-readings',
        icon: <FileDoneOutlined />,
        label: <Link to="/meter-readings">Lecturas</Link>,
    },
    {
        key: '/articles',
        icon: <FileDoneOutlined />,
        label: <Link to="/articles">Contenidos</Link>,
    },
    {
        key: '/clients',
        icon: <UserOutlined/>,
        label: <Link to="/clients">Clientes</Link>,
    },
    {
        key: '/reports',
        icon: <FilePdfOutlined/>,
        label: <Link to="/reports">Reportes</Link>,
    },
    {
        key: '/configurations',
        icon: <ControlOutlined/>,
        label: "Configuración",
        children: [
            {key: '/configurations/tariffs', label: <Link to="/configurations">Configuración</Link>},
            {key: '/configurations/sites', label: <Link to="/configurations/sites">Sitios</Link>},
            {key: '/configurations/category/list', label: <Link to="/configurations/category/list">Categorías</Link>}
        ],
    },
];

const VerticalMenu = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return <Menu theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        className="menu-bar"
        items={menuItems}
    />
}

export default VerticalMenu;
