import { HomeOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import VerticalMenu from './VerticalMenu';

const Sidebar = () => {
	return (
		<>
			<Flex align="center" justify="center">
				<div className={styles.logo}>
					<Link to="/">
						<HomeOutlined />
					</Link>
				</div>
			</Flex>
			<VerticalMenu />
		</>
	);
};

export default Sidebar;
