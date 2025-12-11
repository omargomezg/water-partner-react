import {Avatar, Button, Flex, Popover, Typography} from "antd"
import React, { FC } from "react"
import Search from "antd/es/input/Search";
import {MessageOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {useAppStore} from "../store/useAppStore";

const CustomHeader = () => {
    const fullName = useAppStore((state) => state.fullName)
    return <Flex align="center" justify="space-between">
        <Typography.Title level={3} type="secondary">
            Hola {fullName}
        </Typography.Title>
        <Flex align="center" gap="3rem">
            <Search placeholder="Search dashboard" allowClear/>
            <Flex align="center" gap="10px">
                <MessageOutlined className="header-icon"/>
                <NotificationOutlined className="header-icon"/>
                <Popover placement="bottomRight" content={<Options />}>
                    <Avatar icon={<UserOutlined/>} size="large" />
                </Popover>
            </Flex>
        </Flex>
    </Flex>
}

export default CustomHeader

const Options: FC = () => {
    const logout = useAppStore((state) => state.logout)
    return (
        <>
        Hola, <Button type="link" onClick={logout}>Cerrar sesión</Button>.
        </>
    )
}
