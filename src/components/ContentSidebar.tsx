import {FC} from "react";
import {Card, Flex, Image, Typography} from "antd";

const ContentSidebar: FC = () => {
    return (
        <div>
            <Card className="card">
                <Flex vertical gap="large">
                    <Typography.Title level={4}>
                        Today <br/> 5 orders
                    </Typography.Title>
                    <Typography.Title level={4}>
                        This month <br/> 240 orders
                    </Typography.Title>
                </Flex>
                <Image src="https://journals.openedition.org/nuevomundo/docannexe/image/70730/img-3.jpg"
                       alt="plat"
                       style={{
                           position: 'absolute',
                           bottom: -50,
                           left: 120,
                           height: '300px', width: 'auto'
                       }}/>
            </Card>
        </div>
    )
}

export default ContentSidebar