import {Avatar, Button, Card, Divider, Flex, Tooltip, Typography} from "antd";
import {FC} from "react";

const SellerList: FC = () => {
    return (
        <Flex align="center" justify="space-between" gap="large">
            <Flex vertical gap="small" className='top-seller'>
                <Flex align="center" justify="space-between">
                    <Typography.Title level={5} className="primary--color">
                        Top Seller
                    </Typography.Title>
                    <Button type="link" className="gray--color">
                        View All
                    </Button>
                </Flex>
                <Card>
                    <Flex align="center" justify="space-evenly">
                        <Avatar.Group
                            maxCount={5} maxPopoverTrigger="click" size="large" maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: "progress"
                        }}>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                        </Avatar.Group>
                        <Divider type="vertical" className="divider"/>
                        <Flex vertical>
                            <Typography.Text type="secondary" strong>
                                1,200 plant sold
                            </Typography.Text>
                            <Typography.Text type="secondary" strong>
                                10 seller
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>

            <Flex vertical gap="small" className='featured-seller'>
                <Flex align="center" justify="space-between">
                    <Typography.Title level={5} className="primary--color">
                        Featured Seller
                    </Typography.Title>
                    <Button type="link" className="gray--color">
                        View All
                    </Button>
                </Flex>
                <Card>
                    <Flex align="center" justify="space-evenly">
                        <Avatar.Group
                            maxCount={5} maxPopoverTrigger="click" size="large" maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: "progress"
                        }}>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                            <Tooltip title="User 1" placement="top">
                                <Avatar
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                            </Tooltip>
                        </Avatar.Group>
                        <Divider type="vertical" className="divider"/>
                        <Flex vertical>
                            <Typography.Text type="secondary" strong>
                                1,530 plant sold
                            </Typography.Text>
                            <Typography.Text type="secondary" strong>
                                14 seller
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    )
}

export default SellerList