import { Flex, Input, InputRef, Tag, theme } from "antd";
import { ListOfTags } from "../type/type";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  tags?: ListOfTags[];
  onChange?: (tags: ListOfTags[]) => void;
};

export const InputTags = ({ tags, ...args }: Props) => {
  console.log(args);
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
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

  const showInput = () => {
    console.log("showInput");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePressEnter = () => {
    coonst
    console.log("handlePressEnter");
    console.log(inputValue);
  };



  return (
    <Flex gap="small" wrap>
      {tags?.map((t) => (
        <Tag color="blue">{t.name}</Tag>
      ))}
      {inputVisible ? (
        <Input
          type="text"
          ref={editInputRef}
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handlePressEnter}
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
