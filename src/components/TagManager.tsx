import React, { useState } from "react";
import { Input, Tag } from "antd";

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const TagManager: React.FC<Props> = ({ value = [], onChange }) => {
  const [tags, setTags] = useState(value);
  const [currentTag, setCurrentTag] = useState("");

  const renderTags = () => {
    return tags?.map((tag, index) => (
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
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };
  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCurrentTag(e.target.value);
  };
  const handleAddTag = () => {
    if (currentTag.trim() !== "") {
      if (tags.includes(currentTag.trim())) {
        setCurrentTag("");
        return;
      }
      const newTags = [...tags, currentTag.trim()];
      setTags(newTags);
      onChange?.(newTags);
      setCurrentTag("");
    }
  };
  const handleInputKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Enter") {
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
      <div style={{ paddingTop: "5px" }}></div>
      {renderTags()}
    </>
  );
};
