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
        key: '/meter-reading',
        icon: <FileDoneOutlined />,
        label: <Link to="/meter-reading">Lecturas</Link>,
    },
    {
        key: '/articles',
        icon: <FileDoneOutlined />,
        label: <Link to="/articles">Contenidos</Link>,
    },
    {
        key: '/client',
        icon: <UserOutlined/>,
        label: <Link to="/client">Clientes</Link>,
    },
    {
        key: '/report',
        icon: <FilePdfOutlined/>,
        label: <Link to="/report">Reportes</Link>,
    },
    {
        key: '/configuration',
        icon: <ControlOutlined/>,
        label: <Link to="/configuration">Configuración</Link>,
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
