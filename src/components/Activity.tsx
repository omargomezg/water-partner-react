import {FC} from "react";
import {Avatar, Button, Flex, List, Typography} from "antd";

const data = [
    {
        name: 'Ak Loas h.',
        orderTime: 4
    },
    {
        name: 'San NNash ',
        orderTime: 2
    }, {
        name: 'Ma laura',
        orderTime: 10
    }, {
        name: 'Juan Perez',
        orderTime: 9
    }, {
        name: 'JOse J',
        orderTime: 4
    }
]

const Activity: FC = () => {
    return (
        <Flex vertical gap="small">
            <Flex align="center" justify="space-between" gap="large">
                <Typography.Title level={3} className="primary--color">
                    Recent Activity
                </Typography.Title>
                <Button type="link" className="gray--color">
                    View All
                </Button>
            </Flex>
            <List dataSource={data} renderItem={(user, index) => (
                <List.Item>
                    <List.Item.Meta avatar={<Avatar src={``}/>}
                                    title={<a href="/#">{user.name}</a>}
                                    description={"Ordered a new plant"}
                    ></List.Item.Meta>
                    <span className='gray--color'>
                        {user.orderTime} {user.orderTime === 1 ? 'day ago' : 'days ago'}
                    </span>
                </List.Item>
            )}>
            </List>
        </Flex>
    )
}

export default Activity