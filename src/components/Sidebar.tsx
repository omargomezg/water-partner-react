import {HomeOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import React from "react"
import styles from './Sidebar.module.css'
import VerticalMenu from "./VerticalMenu";


const Sidebar = () => {

    return (
        <>
            <Flex align="center" justify="center">
                <div className={styles.logo}>
                    <HomeOutlined/>
                </div>
            </Flex>
            <VerticalMenu></VerticalMenu>
        </>
    )
}

export default Sidebar