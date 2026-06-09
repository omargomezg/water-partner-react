import { Flex, Input, Tag, theme } from 'antd';
import { Tags } from '../type/type';
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

type Props = {
	value?: Tags[];
	onChange?: (tags: Tags[]) => void;
};

export const InputTags: React.FC<Props> = ({ value, onChange }) => {
	const { token } = theme.useToken();
	const [inputVisible, setInputVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [localTags, setLocalTags] = useState<Tags[]>(value || []);
	const editInputRef = useRef<InputRef>(null);
	const tagPlusStyle: React.CSSProperties = {
		height: 22,
		background: token.colorBgContainer,
		borderStyle: 'dashed',
		cursor: 'pointer',
	};

	useEffect(() => {
		if (value) {
			setLocalTags(value);
		}
	}, [value]);

	useEffect(() => {
		if (inputVisible) {
			editInputRef.current?.focus();
		}
	}, [inputVisible]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handlePressEnter = () => {
		if (inputValue.trim()) {
			const newTags = [
				...localTags,
				{ name: inputValue.toLowerCase(), slug: cleanText(inputValue) },
			];
			setLocalTags(newTags);
			onChange?.(newTags);
		}
		setInputVisible(false);
		setInputValue('');
	};

	const cleanText = (text: string): string => {
		return text
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.trim()
			.replace(/\s+/g, '-')
			.toLowerCase();
	};

	const handleOnClose = (a: Tags) => {
		const newTags = localTags.filter((t) => t.name !== a.name);
		setLocalTags(newTags);
		onChange?.(newTags);
	};

	return (
		<Flex gap="small" wrap>
			{localTags?.map((t, i) => (
				<Tag
					color="navy"
					closable
					key={`${t.slug}-${i}`}
					variant="outlined"
					onClose={() => handleOnClose(t)}
				>
					{t.name}
				</Tag>
			))}
			{inputVisible ? (
				<Input
					type="text"
					ref={editInputRef}
					size="small"
					value={inputValue}
					onChange={handleInputChange}
					onPressEnter={handlePressEnter}
					onBlur={handlePressEnter}
				/>
			) : (
				<Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={() => setInputVisible(true)}>
					New Tag
				</Tag>
			)}
		</Flex>
	);
};
