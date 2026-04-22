import {HomeOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import React from "react"
import styles from './Sidebar.module.css'
import VerticalMenu from "./VerticalMenu";
import {Link} from 'react-router-dom';


const Sidebar = () => {

    return (
        <>
            <Flex align="center" justify="center">
                <div className={styles.logo}>
                    <Link to="/" >
                        <HomeOutlined/>
                    </Link>
                </div>
            </Flex>
            <VerticalMenu></VerticalMenu>
        </>
    )
}

export default Sidebar