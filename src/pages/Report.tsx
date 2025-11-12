import {FC} from "react";
import '../App.css'
import ContentLayout from "../components/Layout/ContentLayout";
import {Card, Flex, Typography} from "antd";
import CheckAuthentication from "../components/CheckAuthentication";

const ReportPage: FC = () => {
    return (
        <CheckAuthentication>
            <ContentLayout>
                <div style={{flex: 1}}>
                    <Flex vertical gap="2.3rem">
                        <Card style={{padding: '20px'}}>
                            <Flex vertical gap="30px">
                                <Flex vertical align="flex-start">
                                    <Typography.Title level={2}>Reportes</Typography.Title>
                                    <Typography.Text type="secondary" strong>
                                        COntenido en construcción...
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                </div>
            </ContentLayout>
        </CheckAuthentication>
    )
}

export default ReportPage