import { Space, Typography } from "antd";

const { Text } = Typography;

type Props = {
  createdAt?: Date;
  updatedAt?: Date;
};
export const HeaderInfo = ({ createdAt, updatedAt }: Props) => {
  const format: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <Space
      style={{ width: "100%", justifyContent: "end" }}
      orientation={"horizontal"}
      size="small"
      wrap
    >
      {createdAt && (
        <Text type="secondary">
          Cración: {Intl.DateTimeFormat("es-CL", format).format(createdAt)}
        </Text>
      )}
      {updatedAt && (
        <Text type="secondary">
          Actualización:{" "}
          {Intl.DateTimeFormat("es-CL", format).format(updatedAt)}
        </Text>
      )}
    </Space>
  );
};
