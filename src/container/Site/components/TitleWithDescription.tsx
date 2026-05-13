import { Space, Button, Typography } from "antd";
import React from "react";

const { Text } = Typography;


type Props = {
    name?: string;
    description?: string;
    url?: string;
    googleTagID?: string;
}

export const TitleWithDescription: React.FC<Props> = ({name, description, url, googleTagID}) => {
    return (
    <Space orientation="vertical" size={0}>
          <Text strong>{name}</Text>
          <Text type="secondary">{description}</Text>
          <Space>
            <Button type="link" size="small" href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Button>
            <Text code>Google Tag ID: {googleTagID}</Text>
          </Space>
        </Space>
        );
}