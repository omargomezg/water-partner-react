import {FC} from "react";
import {Flex} from "antd";
import ContentSidebar from "./ContentSidebar";
import Activity from "./Activity";

const SideContent: FC = () => {
    return (
        <Flex vertical gap="2.3rem" style={{width: 350}}>
            <ContentSidebar/>
            <Activity/>
        </Flex>
    )
}

export default SideContent;