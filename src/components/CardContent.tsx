import {PropsWithChildren} from "react";
import {Card, Flex, Typography} from "antd";

type Props = {
    title?: string
    vertical?: boolean
}

const CardContent = ({children, title, vertical = true}: PropsWithChildren<Props>) => {

    return (
        <Card style={{padding: '20px', marginBottom: '10px'}}>
            <Flex vertical={vertical} gap="30px">
                <Flex vertical align="flex-start">
                    {title && <Typography.Title level={2}>{title}</Typography.Title>}
                    {children}
                </Flex>
            </Flex>
        </Card>
    )
}

export default CardContent