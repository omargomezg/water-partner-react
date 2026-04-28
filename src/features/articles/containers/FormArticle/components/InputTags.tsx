import { Flex, Input, InputRef, Tag, theme } from "antd";
import { ListOfTags } from "../type/type";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  tags?: ListOfTags[];
  onChange?: (tags: ListOfTags[]) => void;
};

export const InputTags = ({ tags, ...args }: Props) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [localTags, setLocalTags] = useState<ListOfTags[]>(tags || []);
  const editInputRef = useRef<InputRef>(null);
  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
    cursor: "pointer",
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputRef]);

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
      args.onChange?.(newTags);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const cleanText = (text: string): string => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const handleOnClose = (a: ListOfTags) => {
    const newTags = localTags.filter((t) => t.name !== a.name);
    setLocalTags(newTags);
    args.onChange?.(newTags);
  };

  return (
    <Flex gap="small" wrap>
      {localTags?.map((t, i) => (
        <Tag color="blue" closable key={i} onClose={() => handleOnClose(t)}>
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
        <Tag
          style={tagPlusStyle}
          icon={<PlusOutlined />}
          onClick={() => setInputVisible(true)}
        >
          New Tag
        </Tag>
      )}
    </Flex>
  );
};
