import { Card, Typography } from 'antd';
import { FeatureImageContainer } from '../features/articles/containers/FeatureImage/FeatureImage.container';

const { Title } = Typography;

const FeatureImagePage: React.FC = () => {
	return (
		<Card>
			<Title level={2}>Imagen de portada</Title>
			<FeatureImageContainer />
		</Card>
	);
};

export default FeatureImagePage;
