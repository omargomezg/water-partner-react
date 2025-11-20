import {Avatar, Flex, Typography} from "antd"
import React from "react"
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
                <Avatar icon={<UserOutlined/>} size="large" />
            </Flex>
        </Flex>
    </Flex>
}

export default CustomHeader
