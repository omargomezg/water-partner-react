import React, { useState } from 'react';
import { Input, Tag } from 'antd';

interface Props {
	value?: string[];
	onChange?: (value: string[]) => void;
}

export const TagManager: React.FC<Props> = ({ value = [], onChange }) => {
	const [currentTag, setCurrentTag] = useState('');

	const renderTags = () => {
		return value?.map((tag, index) => (
			<Tag
				closable
				onClose={(e) => {
					e.preventDefault();
					handleRemoveTag(tag);
				}}
				key={index}
				color="blue"
			>
				{tag}
			</Tag>
		));
	};

	const handleRemoveTag = (tag: string) => {
		const newTags = value.filter((t) => t !== tag);
		onChange?.(newTags);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTag(e.target.value);
	};
	const handleAddTag = () => {
		if (currentTag.trim() !== '') {
			if (value.includes(currentTag.trim())) {
				setCurrentTag('');
				return;
			}
			const newTags = [...value, currentTag.trim()];
			onChange?.(newTags);
			setCurrentTag('');
		}
	};
	const handleInputKeyDown = (e: { key: string; preventDefault: () => void }) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddTag();
		}
	};
	return (
		<>
			<Input
				placeholder="Etiqueta"
				value={currentTag}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				onBlur={handleAddTag}
			/>
			<div style={{ paddingTop: '5px' }}></div>
			{renderTags()}
		</>
	);
};
