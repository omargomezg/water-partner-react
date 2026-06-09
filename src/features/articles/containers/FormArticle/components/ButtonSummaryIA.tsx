import { OpenAIFilled } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { useState } from 'react';
import apiClient from '../../../../../services/apiClient';
import { AiRequest, AiResponse } from '../type/type';

type Props = {
	content: string;
	onChange: (text: string) => void;
};

export const ButtonSummaryIA: React.FC<Props> = ({ content, onChange }) => {
	const [loadingSummaryIA, setLoadingSummaryIA] = useState(false);
	const handleSummaryIA = async () => {
		try {
			setLoadingSummaryIA(true);
			const body = { content } as AiRequest;
			const { data } = await apiClient.post<AiResponse>(`/api/auth/articles/summary/ai`, body);
			if (data.text) {
				onChange(data.text);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingSummaryIA(false);
		}
	};
	if (content?.length < 200) return null;
	return (
		<Tooltip title="Generar automáticamente con IA">
			<Button
				loading={loadingSummaryIA}
				type="link"
				icon={<OpenAIFilled />}
				onClick={handleSummaryIA}
				size="small"
			>
				Autogenerar
			</Button>
		</Tooltip>
	);
};
